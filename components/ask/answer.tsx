"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import {
  AgentFace,
  AgentName,
  type FaceMood,
} from "@/components/ask/agent-face";
import { AnyLink } from "@/components/ask/any-link";
import { InkText } from "@/components/ask/ink-text";
import {
  NOTES_SOURCE,
  TOOL_SOURCES,
  ToolCard,
  isToolPart,
  type Source,
} from "@/components/ask/tool-cards";
import type { AskLauraUIMessage } from "@/lib/ask/agent";

export type Timing = { startedAt: number; endedAt?: number };

/** What an answer drew on: always the notes, plus each tool that returned. */
export function getSources(answers: AskLauraUIMessage[]): Source[] {
  const tools = answers
    .flatMap((answer) => answer.parts)
    .filter(isToolPart)
    .filter((part) => part.state === "output-available")
    .map((part) => TOOL_SOURCES[part.type]);

  return [NOTES_SOURCE, ...new Set(tools)];
}

function SourceIcon({ source, className }: { source: Source; className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={source.icon} />
    </svg>
  );
}

/** Counts up while the answer is being written, then holds at how long it took. */
function Elapsed({ startedAt, endedAt }: Timing) {
  const [now, setNow] = useState(startedAt);

  useEffect(() => {
    if (endedAt) return;
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, [endedAt]);

  const seconds = Math.max(0, Math.round(((endedAt ?? now) - startedAt) / 1000));

  return (
    <span className="text-sm tabular-nums text-muted">
      {seconds < 60 ? `${seconds}s` : `${Math.floor(seconds / 60)}m`}
    </span>
  );
}

export function Answer({
  answers,
  mood,
  isBusy,
  timing,
  errorMessage,
  onRetry,
}: {
  answers: AskLauraUIMessage[];
  mood: FaceMood;
  isBusy: boolean;
  timing?: Timing;
  /** Set when this answer fell through, in words a visitor can read. */
  errorMessage?: string;
  onRetry: () => void;
}) {
  const [areSourcesOpen, setAreSourcesOpen] = useState(false);
  const [haveSourcesBeenOpened, setHaveSourcesBeenOpened] = useState(false);

  const sources = getSources(answers);
  const hasContent = answers.some((answer) =>
    answer.parts.some(
      (part) =>
        (part.type === "text" && part.text) ||
        (isToolPart(part) && part.state === "output-available"),
    ),
  );
  // The thread ends in the sources pill, so both wait for something to cite
  const hasThread = isBusy || hasContent;

  return (
    <article className="ask-tray ask-rise p-4 sm:p-5">
      <div className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-x-3.5">
        <span className="ask-pill flex h-10 w-10 items-center justify-center">
          <AgentFace mood={mood} className="w-6 text-foreground" />
        </span>
        {hasThread && <span aria-hidden className="ask-thread-line" />}

        <div className="min-w-0">
          <header className="flex items-center gap-2 pt-0.5">
            <AgentName className="text-[15px] font-medium" />
            {timing && <Elapsed {...timing} />}
          </header>

          <div className="mt-1 [&>*+*]:mt-4">
            {answers.map((answer) =>
              answer.parts.map((part, index) => {
                if (part.type === "text" && part.text) {
                  return (
                    <div key={`${answer.id}-${index}`}>
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
              }),
            )}
          </div>

          {errorMessage && (
            <div role="alert" className="ask-rise mt-1">
              <p className="text-pretty text-base leading-7 text-muted">
                {errorMessage}
              </p>
              <button
                type="button"
                onClick={onRetry}
                className="ask-pill ask-hit mt-3 h-9 px-3.5 text-sm transition-transform duration-150 ease-[var(--ease-out)] active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                Try again
              </button>
            </div>
          )}

          {hasThread && (
            <button
              type="button"
              disabled={isBusy}
              aria-expanded={areSourcesOpen}
              data-read={haveSourcesBeenOpened}
              onClick={() => {
                setAreSourcesOpen((isOpen) => !isOpen);
                setHaveSourcesBeenOpened(true);
              }}
              className="ask-pill ask-sources ask-hit mt-4 inline-flex h-9 items-center gap-2 pl-1.5 pr-3.5 text-sm active:scale-[0.97] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {isBusy ? (
                <span className="ask-spinner mx-1" />
              ) : (
                <span className="flex">
                  {sources.map((source) => (
                    <span
                      key={source.name}
                      className="-ml-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-foreground text-background ring-2 ring-[hsl(var(--ask-raised))] first:ml-0"
                    >
                      <SourceIcon source={source} className="h-3 w-3" />
                    </span>
                  ))}
                </span>
              )}
              <span aria-hidden className="ask-unread" />
              {sources.length} {sources.length === 1 ? "source" : "sources"}
            </button>
          )}
        </div>
      </div>

      {areSourcesOpen && (
        // Nested under the answer they belong to, each one a link to the real thing
        <ul className="mt-3 pl-[3.375rem]">
          {sources.map((source, index) => (
            <li
              key={source.name}
              className="ask-rise"
              style={{ "--item": index } as CSSProperties}
            >
              <AnyLink
                href={source.href}
                className="group flex items-center gap-2.5 py-1.5 text-sm"
              >
                <SourceIcon source={source} className="h-4 w-4 text-muted" />
                <span className="underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
                  {source.name}
                </span>
                <span className="ml-auto truncate font-mono text-xs text-muted">
                  {source.origin}
                </span>
              </AnyLink>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
