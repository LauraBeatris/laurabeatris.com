"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { FaceMood } from "@/components/ask/agent-face";
import { Composer } from "@/components/ask/composer";
import { InkText } from "@/components/ask/ink-text";
import { TOOL_LABELS, ToolCard, isToolPart } from "@/components/ask/tool-cards";
import type { AskLauraUIMessage } from "@/lib/ask/agent";
import { toTranscript } from "@/lib/ask/transcript";

const transport = new DefaultChatTransport<AskLauraUIMessage>({
  api: "/api/ask",
  // Send the recent words only, so a long conversation never outgrows the API
  prepareSendMessagesRequest: ({ messages, trigger, messageId }) => ({
    body: { messages: toTranscript(messages), trigger, messageId },
  }),
});

const SUGGESTIONS = [
  "What are you building at Resend?",
  "Show me your talks",
  "How do you think about taste?",
  "What have you been hacking on lately?",
  "Where can I find you?",
];

type Exchange = {
  question: AskLauraUIMessage;
  answers: AskLauraUIMessage[];
};

/** A question and everything said back to it, so each pair can be laid out as one piece. */
function toExchanges(messages: AskLauraUIMessage[]) {
  const exchanges: Exchange[] = [];

  for (const message of messages) {
    if (message.role === "user") {
      exchanges.push({ question: message, answers: [] });
    } else {
      exchanges.at(-1)?.answers.push(message);
    }
  }

  return exchanges;
}

/** What to say under the question while there's nothing to read yet. */
function getWaitingLabel(messages: AskLauraUIMessage[], isBusy: boolean) {
  if (!isBusy) return null;

  const last = messages.at(-1);
  if (last?.role !== "assistant") return "Thinking";

  const part = last.parts.at(-1);
  if (part?.type === "text" && part.text) return null;
  if (part && isToolPart(part) && part.state !== "output-available") {
    return TOOL_LABELS[part.type];
  }

  return "Thinking";
}

const ROUTE_REPLY_STATUSES = [400, 413, 429];

function getErrorMessage(error: Error) {
  // The route's own replies (too many questions, too long) are written to be read
  const isFromRoute =
    "statusCode" in error &&
    typeof error.statusCode === "number" &&
    ROUTE_REPLY_STATUSES.includes(error.statusCode);

  if (isFromRoute && error.message) return error.message;

  return "I lost my train of thought.";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AskLaura() {
  const { messages, sendMessage, status, stop, error, regenerate } =
    useChat<AskLauraUIMessage>({ transport, throttle: 50 });
  const [suggestionsPhase, setSuggestionsPhase] = useState<
    "shown" | "leaving" | "gone"
  >("shown");

  const exchanges = toExchanges(messages);
  const hasMessages = messages.length > 0;
  const isBusy = status === "submitted" || status === "streaming";
  const waitingLabel = getWaitingLabel(messages, isBusy);
  const mood: FaceMood = waitingLabel ? "thinking" : isBusy ? "writing" : "idle";

  const dock = useRef<HTMLDivElement>(null);
  const dockTopBeforeAsking = useRef<number | null>(null);
  const latestQuestion = useRef<HTMLHeadingElement>(null);

  function ask(question: string) {
    if (!hasMessages) {
      dockTopBeforeAsking.current =
        dock.current?.getBoundingClientRect().top ?? null;
      setSuggestionsPhase("leaving");
    }
    sendMessage({ text: question });
  }

  // The first question sends the composer to the foot of the page. It's the
  // same element in a new place, so it travels there instead of jumping.
  useLayoutEffect(() => {
    const from = dockTopBeforeAsking.current;
    const element = dock.current;
    dockTopBeforeAsking.current = null;

    if (from === null || !element || !hasMessages) return;
    if (prefersReducedMotion()) return;

    const distance = from - element.getBoundingClientRect().top;

    element.animate(
      [{ transform: `translateY(${distance}px)` }, { transform: "none" }],
      { duration: 500, easing: "cubic-bezier(0.32, 0.72, 0, 1)" },
    );
  }, [hasMessages]);

  // Each new question moves to the top of the page, once, and its answer fills
  // in below it. The page never chases the text, so nothing moves while reading.
  // The first question is already under the intro and stays put.
  useEffect(() => {
    if (exchanges.length < 2) return;

    latestQuestion.current?.scrollIntoView({
      block: "start",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [exchanges.length]);

  return (
    <main className="flex flex-1 flex-col pt-8">
      <div>
        <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
          Ask me anything
        </h1>
        <p className="mt-4 text-pretty text-lg text-muted">
          An agent that has read my notes answers for me. It knows my work,
          my talks and my writing, and tells you when it doesn&apos;t know.
        </p>
      </div>

      <div
        role="log"
        aria-label="Conversation"
        aria-busy={isBusy}
        className={`relative pt-10 ${hasMessages ? "flex-1 pb-10" : ""}`}
      >
        {/* Suggested questions sit where the asked ones will go */}
        {suggestionsPhase !== "gone" && (
          <ul
            data-leaving={suggestionsPhase === "leaving" || undefined}
            onAnimationEnd={(event) => {
              if (event.target === event.currentTarget) {
                setSuggestionsPhase("gone");
              }
            }}
            className="ask-suggestions flex flex-wrap gap-2"
          >
            {SUGGESTIONS.map((suggestion, index) => (
              <li
                key={suggestion}
                className="ask-rise"
                style={{ "--item": index } as CSSProperties}
              >
                <button
                  type="button"
                  onClick={() => ask(suggestion)}
                  className="rounded-full border border-border px-3.5 py-1.5 text-sm text-muted transition-[color,border-color,transform] duration-[160ms] ease-[var(--ease-out)] hover:border-accent hover:text-foreground active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  {suggestion}
                </button>
              </li>
            ))}
          </ul>
        )}

        {exchanges.map(({ question, answers }, index) => {
          const isLatest = index === exchanges.length - 1;

          return (
            <section
              key={question.id}
              // Room for the latest question to reach the top of the page
              className={`mt-10 border-t border-border pt-10 first-of-type:mt-0 first-of-type:border-t-0 first-of-type:pt-0 ${
                isLatest && index > 0 ? "ask-latest-exchange" : ""
              }`}
            >
              <h2
                ref={isLatest ? latestQuestion : undefined}
                className="ask-rise scroll-mt-10 text-pretty text-xl font-semibold tracking-tight"
              >
                {question.parts.map((part) =>
                  part.type === "text" ? part.text : null,
                )}
              </h2>

              {answers.map((answer) => (
                <div key={answer.id} className="mt-4">
                  {answer.parts.map((part, partIndex) => {
                    if (part.type === "text") {
                      return (
                        <div key={partIndex} className="mt-5 first:mt-0">
                          <InkText
                            text={part.text}
                            isStreaming={part.state === "streaming"}
                          />
                        </div>
                      );
                    }

                    if (isToolPart(part)) {
                      return <ToolCard key={part.toolCallId} part={part} />;
                    }

                    return null;
                  })}
                </div>
              ))}

              {isLatest && waitingLabel && (
                <p className="mt-4 font-mono text-sm text-muted">
                  <span key={waitingLabel} className="ask-rise inline-block">
                    {waitingLabel}
                  </span>
                  <span aria-hidden className="ask-dots">
                    <span>.</span>
                    <span>.</span>
                    <span>.</span>
                  </span>
                </p>
              )}

              {isLatest && error && !isBusy && (
                <p role="alert" className="ask-rise mt-4 text-lg text-muted">
                  {getErrorMessage(error)}{" "}
                  <button
                    type="button"
                    onClick={() => regenerate()}
                    className="font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
                  >
                    Try again
                  </button>
                </p>
              )}
            </section>
          );
        })}
      </div>

      <div
        ref={dock}
        className={
          hasMessages
            ? "ask-composer-dock sticky bottom-0 bg-background pb-5"
            : "mt-8 pb-12"
        }
      >
        <Composer mood={mood} isBusy={isBusy} onAsk={ask} onStop={stop} />
        <p className="mt-3 font-mono text-xs text-muted">
          AI answers from my notes. It can be wrong.
        </p>
      </div>
    </main>
  );
}
