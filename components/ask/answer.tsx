import { Fragment } from "react";
import {
  AgentFace,
  AgentName,
  type FaceMood,
} from "@/components/ask/agent-face";
import { AnyLink } from "@/components/ask/any-link";
import { AskLink } from "@/components/ask/ask-link";
import { InkText } from "@/components/ask/ink-text";
import {
  NOTES_SOURCE,
  TOOL_SOURCES,
  ToolCard,
  isToolPart,
  type Source,
} from "@/components/ask/tool-cards";
import type { AskLauraUIMessage } from "@/lib/ask/agent";

/** What an answer drew on: always the notes, plus each tool that returned. */
export function getSources(answers: AskLauraUIMessage[]): Source[] {
  const tools = answers
    .flatMap((answer) => answer.parts)
    .filter(isToolPart)
    .filter((part) => part.state === "output-available")
    .map((part) => TOOL_SOURCES[part.type]);

  return [NOTES_SOURCE, ...new Set(tools)];
}

/** Whether anything has been written or shown yet. */
export function hasContent(answers: AskLauraUIMessage[]) {
  return answers.some((answer) =>
    answer.parts.some(
      (part) =>
        (part.type === "text" && part.text) ||
        (isToolPart(part) && part.state === "output-available"),
    ),
  );
}

export function Answer({
  answers,
  mood,
  status,
  isBusy,
  errorMessage,
  onRetry,
}: {
  answers: AskLauraUIMessage[];
  mood: FaceMood;
  /** What the agent is doing while there's nothing new to read, or null. */
  status: string | null;
  isBusy: boolean;
  /** Set when this answer fell through, in words a visitor can read. */
  errorMessage?: string;
  onRetry: () => void;
}) {
  const sources = getSources(answers);

  return (
    // Written straight onto the page, like everything else I've put on it
    <article className="ask-rise">
      <header className="flex items-center gap-2.5">
        <AgentFace mood={mood} className="w-7 text-foreground" />
        <AgentName className="text-[15px] font-medium" />
      </header>

      <div className="mt-2 [&>*+*]:mt-4">
        {answers.map((answer) =>
          answer.parts.map((part, index) => {
            if (part.type === "text" && part.text) {
              const isStreaming = part.state === "streaming";

              return (
                <div key={`${answer.id}-${index}`} className="relative">
                  {/* The words take the place of the line that said it was
                      thinking, and that line dissolves under them instead of
                      blinking out */}
                  {isStreaming && (
                    <span
                      aria-hidden
                      className="ask-status-out text-base leading-7 text-muted"
                    >
                      {NOTES_SOURCE.working}…
                    </span>
                  )}
                  <InkText text={part.text} isStreaming={isStreaming} />
                </div>
              );
            }

            if (isToolPart(part)) {
              return <ToolCard key={part.toolCallId} part={part} />;
            }

            return null;
          }),
        )}

        {/* Where the next words will land, so the wait is read in the same
            place as the answer. Announced from outside the transcript */}
        {status && (
          <p
            key={status}
            aria-hidden
            className="ask-status text-base leading-7 text-muted"
          >
            {status}…
          </p>
        )}
      </div>

      {errorMessage && (
        <div role="alert" className="ask-rise mt-2">
          <p className="text-pretty text-base leading-7 text-muted">
            {errorMessage}
          </p>
          <AskLink onClick={onRetry} className="mt-1 py-2 text-[15px]">
            Try again
          </AskLink>
        </div>
      )}

      {!isBusy && hasContent(answers) && (
        // Each one a link to the real thing, so the answer can be checked
        <p className="ask-rise mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-sm text-muted">
          <span className="font-mono text-[11px] uppercase tracking-widest">
            Sources
          </span>
          {sources.map((source, index) => (
            <Fragment key={source.name}>
              {index > 0 && <span aria-hidden>·</span>}
              <AnyLink
                href={source.href}
                className="-my-2.5 py-2.5 underline decoration-border decoration-2 underline-offset-4 transition-colors hover:text-foreground hover:decoration-accent active:text-foreground active:decoration-accent"
              >
                {source.name}
              </AnyLink>
            </Fragment>
          ))}
        </p>
      )}
    </article>
  );
}
