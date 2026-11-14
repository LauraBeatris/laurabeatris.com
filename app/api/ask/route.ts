import {
  createAgentUIStreamResponse,
  safeValidateUIMessages,
  smoothStream,
} from "ai";
import { askLauraAgent, type AskLauraUIMessage } from "@/lib/ask/agent";
import { recordRequest } from "@/lib/ask/rate-limit";
import { MAX_QUESTION_LENGTH, toTranscript } from "@/lib/ask/transcript";

export const maxDuration = 30;

// The endpoint is public, so everything a request can make the model read is
// bounded: the body here, then the transcript's length and contents.
const MAX_BODY_LENGTH = 60_000;

export async function POST(request: Request) {
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const retryAfter = recordRequest(address);

  if (retryAfter > 0) {
    return new Response("Too many questions. Give me a few minutes.", {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
  }

  const body = await request.text();

  if (body.length > MAX_BODY_LENGTH) {
    return new Response("That conversation is too long.", { status: 413 });
  }

  let payload: { messages?: unknown };

  try {
    payload = JSON.parse(body);
  } catch {
    return new Response("Expected JSON.", { status: 400 });
  }

  const validation = await safeValidateUIMessages<AskLauraUIMessage>({
    messages: payload?.messages,
    tools: askLauraAgent.tools,
  });

  if (!validation.success) {
    return new Response("Those messages don't look right.", { status: 400 });
  }

  const transcript = toTranscript(validation.data);
  const isTooLong = transcript.some(
    (message) =>
      message.role === "user" &&
      message.parts[0].text.length > MAX_QUESTION_LENGTH,
  );

  if (transcript.at(-1)?.role !== "user" || isTooLong) {
    return new Response("Ask one short question at a time.", { status: 400 });
  }

  return createAgentUIStreamResponse({
    agent: askLauraAgent,
    uiMessages: transcript,
    abortSignal: request.signal,
    // Release the answer a word at a time, at a pace the page can write out
    experimental_transform: smoothStream({ delayInMs: 22 }),
  });
}
