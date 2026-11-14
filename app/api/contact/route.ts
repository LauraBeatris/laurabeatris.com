import { Resend } from "resend";
import {
  CONTACT_EMAIL,
  MAX_MESSAGE_LENGTH,
  MAX_SUBJECT_LENGTH,
  hasText,
  isEmailAddress,
} from "@/lib/contact";
import { createRateLimit, networkOf } from "@/lib/rate-limit";

// The endpoint is public and every request it accepts becomes an email in the
// inbox and a line on Resend's bill. So it only listens to this site's own
// pages, and the body, each field, how often one visitor can write and how
// many emails go out in total are all bounded.
export const maxDuration = 10;

const MAX_BODY_BYTES = 20_000;
const SENDER = "laurabeatris.com <site@laurabeatris.com>";

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

const recordVisitor = createRateLimit({ windowMs: 10 * MINUTE, maxRequests: 5 });
// However many visitors or addresses there are, the inbox only takes this many.
// Like the limit above these are per instance: a ceiling on what one warm
// function can send, not on what the whole deployment can.
const recordHour = createRateLimit({ windowMs: HOUR, maxRequests: 10 });
const recordDay = createRateLimit({ windowMs: 24 * HOUR, maxRequests: 40 });

function reply(error: string, status: number, headers?: HeadersInit) {
  return Response.json({ error }, { status, headers });
}

/**
 * Browsers say where a request came from. Another site's page could post here
 * through its own visitors, each arriving from a different address, so only
 * this site's pages are let in. Anything that isn't a browser sends neither
 * header and is left to the limits.
 */
function isFromAnotherSite(request: Request) {
  const site = request.headers.get("sec-fetch-site");
  if (site) return site !== "same-origin";

  const origin = request.headers.get("origin");
  if (!origin) return false;

  const host =
    request.headers.get("x-forwarded-host") ?? request.headers.get("host");

  try {
    return new URL(origin).host !== host;
  } catch {
    return true;
  }
}

/** Reads the body up to a limit, and stops listening the moment it's passed. */
async function readBody(request: Request, limit: number) {
  if (Number(request.headers.get("content-length")) > limit) return null;

  const reader = request.body?.getReader();
  if (!reader) return "";

  const decoder = new TextDecoder();
  let text = "";
  let size = 0;

  for (;;) {
    const { done, value } = await reader.read();
    if (done) return text + decoder.decode();

    size += value.byteLength;
    if (size > limit) {
      await reader.cancel();
      return null;
    }

    text += decoder.decode(value, { stream: true });
  }
}

function readField(payload: Record<string, unknown>, name: string) {
  const value = payload[name];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  if (isFromAnotherSite(request)) {
    return reply("This form only works from laurabeatris.com.", 403);
  }

  // A page on another site can post plain text or a form without asking first.
  // JSON it has to ask for, and nothing here says yes.
  const type = request.headers.get("content-type")?.split(";")[0].trim();

  if (type?.toLowerCase() !== "application/json") {
    return reply("Expected JSON.", 415);
  }

  const body = await readBody(request, MAX_BODY_BYTES);

  if (body === null) {
    return reply("That message is too long.", 413);
  }

  let payload: Record<string, unknown>;

  try {
    payload = JSON.parse(body);
  } catch {
    return reply("Expected JSON.", 400);
  }

  if (typeof payload !== "object" || payload === null) {
    return reply("Expected JSON.", 400);
  }

  // A field people never see. Whatever fills it in gets a thank-you and no email.
  if (readField(payload, "fax")) {
    return Response.json({ ok: true });
  }

  const from = readField(payload, "from");
  // Headers are one line each
  const subject = readField(payload, "subject").replace(/\s+/g, " ");
  const message = readField(payload, "message");

  if (!isEmailAddress(from)) {
    return reply("That email address doesn't look right.", 400);
  }

  if (!hasText(message)) {
    return reply("Write a message first.", 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH || subject.length > MAX_SUBJECT_LENGTH) {
    return reply("That message is too long.", 400);
  }

  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const visitorWait = recordVisitor(networkOf(address.slice(0, 45)));

  if (visitorWait > 0) {
    return reply("That's a lot of emails. Try again in a few minutes.", 429, {
      "Retry-After": String(visitorWait),
    });
  }

  const everyoneWait = recordHour("everyone") || recordDay("everyone");

  if (everyoneWait > 0) {
    console.error("The email form reached its ceiling and is turning emails away.");
    return reply("The inbox is full for now.", 503, {
      "Retry-After": String(everyoneWait),
    });
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    console.error("RESEND_API_KEY is not set, so the email form can't send.");
    return reply("Email isn't set up here yet.", 503);
  }

  const { error } = await new Resend(apiKey).emails.send({
    from: SENDER,
    to: CONTACT_EMAIL,
    // Replying from the inbox answers the person who wrote
    replyTo: from,
    // Whatever the visitor wrote, the inbox can tell it came through the form:
    // the subject says so first, and so does the body before any of their words
    subject: `[laurabeatris.com] ${subject || "New message"}`,
    text: [
      "Sent through the email form on laurabeatris.com.",
      `The sender typed their own address and nothing checked it: ${from}`,
      "",
      message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend rejected the email form's message:", error);
    return reply("The email didn't go through.", 502);
  }

  return Response.json({ ok: true });
}
