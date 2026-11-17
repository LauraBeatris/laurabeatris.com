"use client";

import { Fragment, useEffect, useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import type { FaceMood } from "@/components/ask/agent-face";
import { Answer, getSources, hasContent } from "@/components/ask/answer";
import { AskLink } from "@/components/ask/ask-link";
import { Composer } from "@/components/ask/composer";
import {
  NOTES_SOURCE,
  TOOL_SOURCES,
  isToolPart,
} from "@/components/ask/tool-cards";
import { PenLoop } from "@/components/pen-loop";
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

/**
 * One for each kind of thing the agent can show, so the range is clear at a
 * glance. They read as one sentence in the intro, and each phrase asks its
 * question when pressed.
 */
const STARTERS = [
  { phrase: "what I'm building", question: "What are you building at Resend?" },
  { phrase: "where I've worked", question: "Where have you worked?" },
  { phrase: "my talks", question: "Show me your talks" },
  { phrase: "my writing", question: "What have you written?" },
  {
    phrase: "what I'm hacking on",
    question: "What have you been hacking on lately?",
  },
  { phrase: "where to find me", question: "Where can I find you?" },
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
 * Questions that follow from what the latest answer drew on, most specific
 * source first, minus anything already asked. None until there's an answer to
 * follow from.
 */
function getFollowUps(exchanges: Exchange[]) {
  const latest = exchanges.at(-1);
  if (!latest || !hasContent(latest.answers)) return [];

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
  if (last?.role !== "assistant") return NOTES_SOURCE.working;

  const part = last.parts.at(-1);
  if (part?.type === "text" && part.text) return "Writing";
  if (part && isToolPart(part) && part.state !== "output-available") {
    return TOOL_SOURCES[part.type].working;
  }

  return NOTES_SOURCE.working;
}

const FALLBACK_ERROR =
  "I lost my train of thought. If it keeps happening, the real me is on X at @lauradotjs.";

/**
 * What to say for each way a question can be turned away. The words are chosen
 * here and not read from the response: a refusal can come from the firewall in
 * front of the route, and its reply isn't written for visitors.
 */
const ERRORS_BY_STATUS: Record<number, string> = {
  403: "I couldn't tell you apart from a bot. Reload the page and ask again.",
  413: "This conversation has grown too long for me. Reload the page to start a fresh one.",
  429: "That's a lot of questions at once. Give me a minute, then ask again.",
};

function getErrorMessage(error: Error) {
  const status = "statusCode" in error ? Number(error.statusCode) : undefined;

  return (status && ERRORS_BY_STATUS[status]) || FALLBACK_ERROR;
}

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

// The least an answer needs to be seen starting: the face, the line that says
// what it's doing and a few lines of text. With less than this between the
// first question and the docked note, the question goes to the top of the page
const ROOM_FOR_AN_ANSWER = 200;
// How far above the note the transcript starts to fade (2rem, in globals.css)
const DOCK_FADE = 32;

export function AskLaura() {
  const { messages, sendMessage, status, stop, error, regenerate } =
    useChat<AskLauraUIMessage>({ transport, throttle: 50 });
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isFirstQuestionLifted, setIsFirstQuestionLifted] = useState(false);

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
  // Nothing to follow from while an answer is on its way, or after one failed
  const followUps = isBusy || error ? [] : getFollowUps(exchanges);

  const page = useRef<HTMLElement>(null);
  const dock = useRef<HTMLDivElement>(null);
  const noteTopBeforeAsking = useRef<number | null>(null);
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

  // The note itself, and not the dock around it: it's the thing the eye follows
  function getNoteTop() {
    return (
      dock.current?.querySelector("form")?.getBoundingClientRect().top ?? null
    );
  }

  function ask(question: string) {
    // One question at a time; the note's button says Stop until this one is done
    if (isBusy) return;
    if (!hasMessages) noteTopBeforeAsking.current = getNoteTop();
    wasStopped.current = false;
    play("send");
    sendMessage({ text: question });
  }

  function retry() {
    wasStopped.current = false;
    play("send");
    regenerate();
  }

  function handleStop() {
    wasStopped.current = true;
    stop();
  }

  // Each change of state is heard once
  useEffect(() => {
    const previous = previousStatus.current;
    previousStatus.current = status;
    if (previous === status) return;

    if (status === "streaming") play("arrive");
    if (status === "error") play("error");
    if (status === "ready" && !wasStopped.current) play("done");
    // `play` reads the sound setting; a status change is the only trigger
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  // The first question sends the note to the foot of the page. It's the same
  // note in a new place, so it travels there from exactly where it was.
  useLayoutEffect(() => {
    const from = noteTopBeforeAsking.current;
    const to = getNoteTop();
    const element = dock.current;
    noteTopBeforeAsking.current = null;

    if (!element) return;
    // Docking changes the note's height, and the paper under it is cut to that
    // height: measured here so the very first docked frame is right
    page.current?.style.setProperty("--ask-dock", `${element.offsetHeight}px`);

    if (!hasMessages) return;

    // On a phone the intro and the docked note leave little between them, and
    // the first answer would be written underneath the note. When that's so,
    // the first question goes to the top like every one after it
    const question = latestQuestion.current;
    if (question) {
      const room =
        window.innerHeight -
        element.offsetHeight -
        DOCK_FADE -
        question.getBoundingClientRect().bottom;

      if (room < ROOM_FOR_AN_ANSWER) setIsFirstQuestionLifted(true);
    }

    if (from === null || to === null) return;
    if (prefersReducedMotion()) return;

    element.animate(
      [{ transform: `translateY(${from - to}px)` }, { transform: "none" }],
      {
        // The pace of the site's other sheet, the email composer on a phone
        duration: 400,
        easing:
          getComputedStyle(element).getPropertyValue("--ease-drawer").trim() ||
          "ease-out",
      },
    );
  }, [hasMessages]);

  // The newest exchange keeps enough room under it to scroll to the top, and
  // how much that is depends on how tall the docked note is right now
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
  // The first question is already under the intro and stays put, unless that
  // would leave its answer no room.
  useEffect(() => {
    if (exchanges.length === 0) return;
    if (exchanges.length === 1 && !isFirstQuestionLifted) return;

    latestQuestion.current?.scrollIntoView({
      block: "start",
      behavior: prefersReducedMotion() ? "auto" : "smooth",
    });
  }, [exchanges.length, isFirstQuestionLifted]);

  return (
    <main
      ref={page}
      data-conversation={hasMessages || undefined}
      className="ask flex flex-1 flex-col pt-8"
    >
      <div>
        <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
          {/* Circled in pen, like the link on the home page that led here */}
          <span className="relative isolate inline-block whitespace-nowrap">
            <span className="title-depth inline-block">
              <span>Ask me</span>
            </span>
            <PenLoop scalesWithWords className="ask-title-loop" />
          </span>{" "}
          <span className="title-depth inline-block">
            <span>anything</span>
          </span>
        </h1>
        {/* On a touch screen the lines sit a little further apart: each
            underlined phrase is something to press, one above the other */}
        <p className="mt-4 text-pretty text-lg text-muted [@media(pointer:coarse)]:leading-8">
          An agent that has read my notes answers for me, and tells you when it
          doesn&apos;t know. Ask about{" "}
          {STARTERS.map(({ phrase, question }, index) => (
            <Fragment key={question}>
              <AskLink
                index={index}
                // The pen comes down from circling the title and keeps going
                delay={500}
                disabled={isBusy}
                label={`Ask about ${phrase}`}
                onClick={() => ask(question)}
                className="whitespace-nowrap"
              >
                {phrase}
              </AskLink>
              {index < STARTERS.length - 2
                ? ", "
                : index === STARTERS.length - 2
                  ? " or "
                  : "."}
            </Fragment>
          ))}
        </p>
      </div>

      {/* Read out as it changes, from outside the transcript it describes */}
      <p role="status" className="sr-only">
        {agentStatus ? `${agentStatus}…` : ""}
      </p>

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
              className={`mt-10 first:mt-0 ${
                isLatest && (index > 0 || isFirstQuestionLifted)
                  ? "ask-latest-exchange"
                  : ""
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
                <div className="mt-4">
                  <Answer
                    answers={answers}
                    mood={isLatest ? mood : "idle"}
                    // While it's writing, the words themselves say so
                    status={
                      isLatest && agentStatus !== "Writing" ? agentStatus : null
                    }
                    isBusy={isLatest && isBusy}
                    errorMessage={
                      hasFailed && error ? getErrorMessage(error) : undefined
                    }
                    onRetry={retry}
                  />
                </div>
              )}

              {isLatest && followUps.length > 0 && (
                // Where the reading ends is where the next question starts.
                // They're offers and not part of what was said, so they aren't
                // read out with the transcript
                <div aria-live="off" className="mt-7">
                  <p className="ask-rise font-mono text-[11px] uppercase tracking-widest text-muted">
                    Ask next
                  </p>
                  <ul
                    aria-label="Questions to ask next"
                    className="mt-1 flex flex-col items-start"
                  >
                    {followUps.map((followUp, followUpIndex) => (
                      <li
                        key={followUp}
                        className="ask-rise"
                        style={{ "--item": followUpIndex + 1 } as CSSProperties}
                      >
                        <AskLink
                          index={followUpIndex}
                          delay={100}
                          onClick={() => ask(followUp)}
                          className="py-2 text-left text-[15px]"
                        >
                          {followUp}
                        </AskLink>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </section>
          );
        })}
      </div>

      {/* The paper the transcript slides under, once there is one */}
      {hasMessages && <div aria-hidden className="ask-dock-paper" />}

      <div
        ref={dock}
        className={
          hasMessages
            ? // Clear of the home indicator now the page runs under it
              "sticky bottom-0 pb-[max(1rem,env(safe-area-inset-bottom))]"
            : "pb-12"
        }
      >
        <Composer
          mood={mood}
          isBusy={isBusy}
          isSoundOn={isSoundOn}
          onToggleSound={toggleSound}
          onAsk={ask}
          onStop={handleStop}
        />
      </div>
    </main>
  );
}
