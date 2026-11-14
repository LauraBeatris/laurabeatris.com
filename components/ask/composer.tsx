"use client";

import { useRef, useState } from "react";
import type { CSSProperties, FormEvent, KeyboardEvent } from "react";
import {
  AgentFace,
  AgentName,
  type FaceMood,
} from "@/components/ask/agent-face";
import { MAX_QUESTION_LENGTH } from "@/lib/ask/transcript";

const CAVEAT = "AI answers from my notes. It can be wrong.";

export function Composer({
  mood,
  status,
  isBusy,
  isDocked,
  suggestions,
  isSoundOn,
  onToggleSound,
  onAsk,
  onStop,
}: {
  mood: FaceMood;
  /** What the agent is doing right now, or null when it's waiting for a question. */
  status: string | null;
  isBusy: boolean;
  isDocked: boolean;
  suggestions: string[];
  isSoundOn: boolean;
  onToggleSound: () => void;
  onAsk: (question: string) => void;
  onStop: () => void;
}) {
  const [question, setQuestion] = useState("");
  const field = useRef<HTMLTextAreaElement>(null);
  const canAsk = question.trim().length > 0 && !isBusy;

  function resize() {
    const textarea = field.current;
    if (!textarea) return;
    textarea.style.height = "auto";
    textarea.style.height = `${textarea.scrollHeight}px`;
  }

  function ask() {
    if (!canAsk) return;
    onAsk(question.trim());
    setQuestion("");
    // On a phone, put the keyboard away so the answer has the screen
    if (window.matchMedia("(pointer: coarse)").matches) field.current?.blur();
    // Back to one line once the field has emptied
    requestAnimationFrame(resize);
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (isBusy) onStop();
    else ask();
  }

  function handleKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    // Enter sends; Shift+Enter and IME composition keep their own meaning
    if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) {
      return;
    }
    event.preventDefault();
    ask();
  }

  return (
    // Whatever helps you ask sits around the input: questions to try above,
    // what's happening below. All three share the input's left edge.
    <div>
      {suggestions.length > 0 && (
        <ul
          aria-label="Questions to try"
          className={`flex gap-2 ${
            // Docked, they stay on one line so the transcript keeps its room.
            // A scroller clips its children's shadows, so it's padded by their
            // size and its margins give that much back: the gap to the input
            // is 10px either way.
            isDocked
              ? "ask-chips -mx-px -mt-px mb-[7px] overflow-x-auto px-px pb-[3px] pr-8 pt-px"
              : "mb-2.5 flex-wrap"
          }`}
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion}
              className="ask-rise shrink-0"
              style={{ "--item": index } as CSSProperties}
            >
              <button
                type="button"
                disabled={isBusy}
                onClick={() => onAsk(suggestion)}
                className="ask-pill ask-chip ask-hit h-9 whitespace-nowrap px-3.5 text-sm text-foreground/80 transition-[color,transform,opacity] duration-150 ease-[var(--ease-out)] hover:text-foreground active:scale-[0.97] disabled:opacity-50 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {suggestion}
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={handleSubmit}
        className="ask-raised rounded-[22px]"
      >
        <label htmlFor="ask-question" className="sr-only">
          Your question
        </label>
        <textarea
          id="ask-question"
          ref={field}
          rows={1}
          value={question}
          maxLength={MAX_QUESTION_LENGTH}
          placeholder="Ask me anything"
          enterKeyHint="send"
          onChange={(event) => {
            setQuestion(event.target.value);
            resize();
          }}
          onKeyDown={handleKeyDown}
          // 16px or iOS zooms the page on focus
          className="block max-h-40 w-full resize-none bg-transparent px-4 pb-1 pt-3.5 text-base leading-relaxed placeholder:text-muted focus:outline-none"
        />

        <div className="flex items-center justify-between gap-2 px-2 pb-2 pt-1">
          <div className="flex items-center gap-1.5">
            {/* Who you're asking, and that it's an AI, right where you type */}
            <span className="ask-pill inline-flex h-9 items-center gap-2 pl-2.5 pr-3 text-sm">
              <AgentFace
                // It looks over at what you're typing, unless it's busy answering
                mood={isBusy || !question.trim() ? mood : "listening"}
                blinks
                className="w-6 text-foreground"
              />
              <AgentName />
            </span>

            <button
              type="button"
              onClick={onToggleSound}
              aria-pressed={isSoundOn}
              aria-label="Sound effects"
              className="ask-pill ask-swap ask-hit relative h-9 w-9 text-muted transition-[color,transform] duration-150 ease-[var(--ease-out)] hover:text-foreground active:scale-[0.94] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {[true, false].map((isOnIcon) => (
                <svg
                  key={String(isOnIcon)}
                  aria-hidden
                  data-shown={isOnIcon === isSoundOn}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="absolute inset-0 m-auto h-4 w-4"
                >
                  <path d="M4 9.5v5h3.5L12 18V6L7.5 9.5z" />
                  {isOnIcon ? (
                    <path d="M15.5 9a4 4 0 0 1 0 6M18 6.5a7.5 7.5 0 0 1 0 11" />
                  ) : (
                    <path d="m16 9.5 5 5m0-5-5 5" />
                  )}
                </svg>
              ))}
            </button>
          </div>

          <button
            type="submit"
            disabled={!isBusy && !canAsk}
            aria-label={isBusy ? "Stop answering" : "Send question"}
            className="ask-glass ask-swap ask-hit relative h-10 w-[5.25rem] shrink-0 rounded-full text-[15px] font-semibold active:scale-[0.97] disabled:opacity-50 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {/* Both labels stay in the button, so it keeps its width as they swap */}
            <span
              aria-hidden
              data-shown={!isBusy}
              className="absolute inset-0 flex items-center justify-center"
            >
              Send
            </span>
            <span
              aria-hidden
              data-shown={isBusy}
              className="absolute inset-0 flex items-center justify-center"
            >
              Stop
            </span>
          </button>
        </div>
      </form>

      {/* One line under the input, always there, so nothing changes height:
          the caveat while it waits, the current step while it works. It starts
          where the input's text starts and ends where the send button ends. */}
      <div className="ask-depth mt-2.5 flex h-5 items-center justify-between gap-3 pl-4 pr-2 text-[13px] text-muted">
        <p key={status ?? "caveat"} role="status" className="ask-rise truncate">
          {status ? `${status}…` : CAVEAT}
        </p>
        {isBusy ? (
          <span aria-hidden className="ask-spinner" />
        ) : (
          <span
            aria-hidden
            className="hidden shrink-0 font-mono text-[10px] uppercase tracking-[0.04em] [@media(pointer:fine)]:inline"
          >
            Enter to send
          </span>
        )}
      </div>
    </div>
  );
}
