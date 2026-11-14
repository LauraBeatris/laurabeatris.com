import {
  createAgentUIStreamResponse,
  safeValidateUIMessages,
  smoothStream,
} from "ai";
import { askLauraAgent, type AskLauraUIMessage } from "@/lib/ask/agent";
import { MAX_QUESTION_LENGTH } from "@/lib/ask/limits";
import { secondsUntilAllowed } from "@/lib/ask/rate-limit";

export const maxDuration = 30;

// The agent only needs the recent back-and-forth, and the endpoint is public,
// so everything a request can make the model read is bounded.
const MAX_BODY_LENGTH = 60_000;
const MAX_MESSAGES = 16;

export async function POST(request: Request) {
  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const retryAfter = secondsUntilAllowed(address);

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

  const messages = validation.data.slice(-MAX_MESSAGES);

  // A window can open on an answer whose question was cut off
  while (messages.length > 0 && messages[0].role !== "user") messages.shift();

  const question = messages.at(-1);
  const isTooLong = messages.some(
    (message) =>
      message.role === "user" &&
      message.parts.some(
        (part) => part.type === "text" && part.text.length > MAX_QUESTION_LENGTH,
      ),
  );

  if (question?.role !== "user" || isTooLong) {
    return new Response("Ask one short question at a time.", { status: 400 });
  }

  return createAgentUIStreamResponse({
    agent: askLauraAgent,
    uiMessages: messages,
    abortSignal: request.signal,
    // Release the answer a word at a time, at a pace the page can write out
    experimental_transform: smoothStream({ delayInMs: 22 }),
  });
}
