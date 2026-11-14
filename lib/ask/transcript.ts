import type { AskLauraUIMessage } from "@/lib/ask/agent";

/** Shared by the composer and the route, so the page never sends what the API rejects. */
export const MAX_QUESTION_LENGTH = 400;

// Four exchanges of context is plenty for short answers about one person, and
// every message kept is paid for again on each later question
const MAX_MESSAGES = 8;
const MAX_ANSWER_LENGTH = 1500;

/**
 * The recent back-and-forth, as words only. The page uses it to keep requests
 * small; the route uses it because the history comes from the browser, where
 * anyone can write it. Cards are left out, so a made-up "tool result" never
 * reaches the model as something the agent looked up, and answers are cut
 * short, so nobody can pad a request with pages of invented history.
 */
export function toTranscript(messages: AskLauraUIMessage[]) {
  const transcript = messages.flatMap((message) => {
    if (message.role === "system") return [];

    const text = message.parts
      .map((part) => (part.type === "text" ? part.text : ""))
      .join("\n\n")
      .trim();

    if (!text) return [];

    return [
      {
        id: message.id,
        role: message.role,
        parts: [
          {
            type: "text" as const,
            text:
              message.role === "assistant"
                ? text.slice(0, MAX_ANSWER_LENGTH)
                : text,
          },
        ],
      },
    ];
  });

  const recent = transcript.slice(-MAX_MESSAGES);

  // A window can open on an answer whose question was cut off
  while (recent.length > 0 && recent[0].role !== "user") recent.shift();

  return recent;
}
