"use client";

import { useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import {
  AgentFace,
  AgentName,
  type FaceMood,
} from "@/components/ask/agent-face";
import { MAX_QUESTION_LENGTH } from "@/lib/ask/transcript";

const CAVEAT = "AI answers from my notes. It can be wrong.";

export function Composer({
  mood,
  isBusy,
  isSoundOn,
  onToggleSound,
  onAsk,
  onStop,
}: {
  mood: FaceMood;
  isBusy: boolean;
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
    <div>
      {/* The note you write on: the one thing on the page that's raised off it */}
      {/* 16px corners, like the email composer: the site's other thing to write on */}
      <form onSubmit={handleSubmit} className="ask-note ask-raised rounded-2xl">
        <label htmlFor="ask-question" className="sr-only">
          Your question
        </label>
        <textarea
          id="ask-question"
          ref={field}
          rows={1}
          value={question}
          maxLength={MAX_QUESTION_LENGTH}
          placeholder="What are you curious about?"
          enterKeyHint="send"
          onChange={(event) => {
            setQuestion(event.target.value);
            resize();
          }}
          onKeyDown={handleKeyDown}
          // 16px or iOS zooms the page on focus. The note lights up in its place
          className="block max-h-40 w-full resize-none bg-transparent px-3.5 pb-2 pt-3 text-base leading-6 placeholder:text-muted focus:outline-none"
        />

        <div className="flex items-center justify-between gap-2 pb-2 pl-3 pr-2 pt-1">
          {/* Who you're asking, and that it's an AI, right where you type */}
          <span className="inline-flex h-8 items-center gap-2 text-sm">
            <AgentFace
              // It looks over at what you're typing, unless it's busy answering
              mood={isBusy || !question.trim() ? mood : "listening"}
              blinks
              className="w-6 text-foreground"
            />
            <AgentName />
          </span>

          <button
            type="submit"
            disabled={!isBusy && !canAsk}
            aria-label={isBusy ? "Stop answering" : "Send question"}
            className="ask-glass ask-swap ask-hit relative h-8 w-16 shrink-0 rounded-full text-sm font-medium active:scale-[0.97] disabled:opacity-50 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
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

      {/* One quiet line under the note, the same whatever the agent is doing.
          It sits at the right, beside the sound icon, and the two end where
          Send ends. On a
          narrow phone it takes a second line before it loses a word: it's the
          page's small print */}
      <div className="ask-depth mt-2.5 flex min-h-5 items-start justify-end gap-1 text-[13px] leading-5 text-muted">
        <p className="text-pretty text-right">{CAVEAT}</p>

        <button
          type="button"
          onClick={onToggleSound}
          aria-pressed={isSoundOn}
          aria-label="Sound effects"
          className="ask-swap ask-hit relative -my-2 -mr-0.5 h-9 w-9 shrink-0 rounded-full transition-[color,transform] duration-150 ease-[var(--ease-out)] hover:text-foreground active:scale-[0.95] motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
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
    </div>
  );
}
