"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { FaceMood } from "@/components/ask/agent-face";
import { Answer, getSources, type Timing } from "@/components/ask/answer";
import { Composer } from "@/components/ask/composer";
import { TOOL_SOURCES, isToolPart } from "@/components/ask/tool-cards";
import type { AskLauraUIMessage } from "@/lib/ask/agent";
import {
  playSound,
  readSoundPreference,
  saveSoundPreference,
  type Sound,
} from "@/lib/ask/sounds";
import { toTranscript } from "@/lib/ask/transcript";

const transport = new DefaultChatTransport<AskLauraUIMessage>({
  api: "/api/ask",
  // Send the recent words only, so a long conversation never outgrows the API
  prepareSendMessagesRequest: ({ messages, trigger, messageId }) => ({
    body: { messages: toTranscript(messages), trigger, messageId },
  }),
});

/** One for each kind of thing the agent can show, so the range is clear at a glance. */
const STARTERS = [
  "What are you building at Resend?",
  "Show me your talks",
  "What have you written?",
  "What have you been hacking on lately?",
  "Where can I find you?",
];

const MAX_FOLLOW_UPS = 3;

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

function getText(message: AskLauraUIMessage) {
  return message.parts
    .map((part) => (part.type === "text" ? part.text : ""))
    .join("");
}

/**
 * Before the first question: starters. After an answer: questions that follow
 * from what it just drew on, most specific source first, minus anything
 * already asked.
 */
function getSuggestions(exchanges: Exchange[], isBusy: boolean) {
  if (exchanges.length === 0) return STARTERS;

  // An answer still being written hasn't shown what it will draw on yet
  const answered = isBusy ? exchanges.slice(0, -1) : exchanges;
  const latest = answered.at(-1);
  if (!latest) return [];

  const asked = new Set(exchanges.map(({ question }) => getText(question)));
  const followUps = getSources(latest.answers)
    .reverse()
    .flatMap((source) => source.followUps);

  return [...new Set(followUps)]
    .filter((question) => !asked.has(question))
    .slice(0, MAX_FOLLOW_UPS);
}

/** What the agent is doing while there's nothing new to read yet. */
function getStatus(messages: AskLauraUIMessage[], isBusy: boolean) {
  if (!isBusy) return null;

  const last = messages.at(-1);
  if (last?.role !== "assistant") return "Thinking";

  const part = last.parts.at(-1);
  if (part?.type === "text" && part.text) return "Writing";
  if (part && isToolPart(part) && part.state !== "output-available") {
    return TOOL_SOURCES[part.type].working;
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

  return "I lost my train of thought. If it keeps happening, the real me is on X at @lauradotjs.";
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function AskLaura() {
  const { messages, sendMessage, status, stop, error, regenerate } =
    useChat<AskLauraUIMessage>({ transport, throttle: 50 });
  const [timings, setTimings] = useState<Timing[]>([]);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const exchanges = toExchanges(messages);
  const hasMessages = messages.length > 0;
  const isBusy = status === "submitted" || status === "streaming";
  const agentStatus = getStatus(messages, isBusy);
  const mood: FaceMood = !isBusy
    ? error
      ? "sorry"
      : "idle"
    : agentStatus === "Writing"
      ? "writing"
      : "thinking";

  const page = useRef<HTMLElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const dockTopBeforeAsking = useRef<number | null>(null);
  const latestQuestion = useRef<HTMLParagraphElement>(null);
  const previousStatus = useRef(status);
  const wasStopped = useRef(false);

  // The saved choice is only readable in the browser, so it's applied after mount
  useEffect(() => setIsSoundOn(readSoundPreference()), []);

  function play(sound: Sound) {
    if (isSoundOn) playSound(sound);
  }

  function toggleSound() {
    const next = !isSoundOn;
    setIsSoundOn(next);
    saveSoundPreference(next);
    // The one sound that plays regardless: it's how turning sound on is heard
    if (next) playSound("tap");
  }

  function ask(question: string) {
    if (!hasMessages) {
      dockTopBeforeAsking.current =
        dock.current?.getBoundingClientRect().top ?? null;
    }
    wasStopped.current = false;
    setTimings((all) => [...all, { startedAt: Date.now() }]);
    play("send");
    sendMessage({ text: question });
  }

  function retry() {
    wasStopped.current = false;
    setTimings((all) => [...all.slice(0, -1), { startedAt: Date.now() }]);
    play("send");
    regenerate();
  }

  function handleStop() {
    wasStopped.current = true;
    stop();
  }

  // Each change of state is heard once, and the answer's clock stops with it
  useEffect(() => {
    const previous = previousStatus.current;
    previousStatus.current = status;
    if (previous === status) return;

    if (status === "streaming") play("arrive");

    if (status === "ready" || status === "error") {
      setTimings((all) =>
        all.map((timing, index) =>
          index === all.length - 1 && !timing.endedAt
            ? { ...timing, endedAt: Date.now() }
            : timing,
        ),
      );
      if (status === "error") play("error");
      else if (!wasStopped.current) play("done");
    }
    // `play` reads the sound setting; a status change is the only trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

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

  // The newest exchange keeps enough room under it to scroll to the top, and
  // how much that is depends on how tall the docked composer is right now
  useEffect(() => {
    const element = dock.current;
    if (!element) return;

    const observer = new ResizeObserver(() => {
      page.current?.style.setProperty("--ask-dock", `${element.offsetHeight}px`);
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

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
    <main ref={page} className="ask flex flex-1 flex-col pt-8">
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
        className={`pt-10 ${hasMessages ? "flex-1 pb-10" : ""}`}
      >
        {exchanges.map(({ question, answers }, index) => {
          const isLatest = index === exchanges.length - 1;
          const hasFailed = isLatest && !!error && !isBusy;

          return (
            <section
              key={question.id}
              // Room for the latest question to reach the top of the page
              className={`mt-8 first:mt-0 ${
                isLatest && index > 0 ? "ask-latest-exchange" : ""
              }`}
            >
              <p
                ref={isLatest ? latestQuestion : undefined}
                className="ask-raised ask-rise ml-auto w-fit max-w-[85%] scroll-mt-6 text-pretty rounded-[22px] rounded-br-lg px-4 py-2.5 text-base leading-7"
              >
                <span className="sr-only">You asked: </span>
                {getText(question)}
              </p>

              {(answers.length > 0 || isLatest) && (
                <div className="mt-3">
                  <Answer
                    answers={answers}
                    mood={isLatest ? mood : "idle"}
                    isBusy={isLatest && isBusy}
                    timing={timings[index]}
                    errorMessage={
                      hasFailed && error ? getErrorMessage(error) : undefined
                    }
                    onRetry={retry}
                  />
                </div>
              )}
            </section>
          );
        })}
      </div>

      <div
        ref={dock}
        className={
          hasMessages
            ? "ask-composer-dock sticky bottom-0 bg-background pb-4"
            : "pb-12"
        }
      >
        <Composer
          mood={mood}
          status={agentStatus}
          isBusy={isBusy}
          isDocked={hasMessages}
          suggestions={getSuggestions(exchanges, isBusy)}
          isSoundOn={isSoundOn}
          onToggleSound={toggleSound}
          onAsk={ask}
          onStop={handleStop}
        />
      </div>
    </main>
  );
}
