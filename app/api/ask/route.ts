import {
  createAgentUIStreamResponse,
  safeValidateUIMessages,
  smoothStream,
} from "ai";
import { askLauraAgent, type AskLauraUIMessage } from "@/lib/ask/agent";
import { MAX_QUESTION_LENGTH, toTranscript } from "@/lib/ask/transcript";
import { createRateLimit, networkOf } from "@/lib/rate-limit";

export const maxDuration = 30;

// The endpoint is public and every answer costs money, so everything a request
// can make the model read is bounded: the body here, then the transcript's
// length and contents.
const MAX_BODY_LENGTH = 20_000;

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

const recordVisitor = createRateLimit({ windowMs: 10 * MINUTE, maxRequests: 20 });
// However many visitors or addresses there are, the model only answers this
// many. Like the limit above these are per instance: a ceiling on what one warm
// function can spend, not on what the whole deployment can. The firewall rule
// on this path and the gateway's credit balance are the limits that hold.
const recordHour = createRateLimit({ windowMs: HOUR, maxRequests: 300 });
const recordDay = createRateLimit({ windowMs: 24 * HOUR, maxRequests: 1500 });

export async function POST(request: Request) {
  // Only this site's own pages may ask. Without this, any other website could
  // make its visitors' browsers send questions here, from thousands of
  // addresses the rate limit has never seen.
  if (request.headers.get("origin") !== new URL(request.url).origin) {
    return new Response("Ask from laurabeatris.com.", { status: 403 });
  }

  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const retryAfter =
    recordVisitor(networkOf(address.slice(0, 45))) ||
    recordHour("everyone") ||
    recordDay("everyone");

  if (retryAfter > 0) {
    return new Response("Too many questions. Give me a few minutes.", {
      status: 429,
      headers: { "Retry-After": String(retryAfter) },
    });
  }

  // Turn away an oversized body by its label, before reading any of it
  if (Number(request.headers.get("content-length")) > MAX_BODY_LENGTH) {
    return new Response("That conversation is too long.", { status: 413 });
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
