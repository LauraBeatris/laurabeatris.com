import { Resend } from "resend";
import {
  CONTACT_EMAIL,
  MAX_MESSAGE_LENGTH,
  MAX_SUBJECT_LENGTH,
  isEmailAddress,
} from "@/lib/contact";
import { createRateLimit } from "@/lib/rate-limit";

// The endpoint is public and every request can become an email in the inbox,
// so the body, each field and how often one address can write are all bounded.
const MAX_BODY_LENGTH = 20_000;
const SENDER = "laurabeatris.com <site@laurabeatris.com>";
const DEFAULT_SUBJECT = "A message from laurabeatris.com";

const recordRequest = createRateLimit({
  windowMs: 10 * 60 * 1000,
  maxRequests: 5,
});

function reply(error: string, status: number, headers?: HeadersInit) {
  return Response.json({ error }, { status, headers });
}

function readField(payload: Record<string, unknown>, name: string) {
  const value = payload[name];
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  const body = await request.text();

  if (body.length > MAX_BODY_LENGTH) {
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

  if (!message) {
    return reply("Write a message first.", 400);
  }

  if (message.length > MAX_MESSAGE_LENGTH || subject.length > MAX_SUBJECT_LENGTH) {
    return reply("That message is too long.", 400);
  }

  const address =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";
  const retryAfter = recordRequest(address);

  if (retryAfter > 0) {
    return reply("That's a lot of emails. Try again in a few minutes.", 429, {
      "Retry-After": String(retryAfter),
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
    subject: subject || DEFAULT_SUBJECT,
    text: `${message}\n\n--\n${from}, through the email form on laurabeatris.com`,
  });

  if (error) {
    console.error("Resend rejected the email form's message:", error);
    return reply("The email didn't go through.", 502);
  }

  return Response.json({ ok: true });
}
