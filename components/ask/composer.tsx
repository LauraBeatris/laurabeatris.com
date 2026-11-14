"use client";

import { useRef, useState } from "react";
import type { FormEvent, KeyboardEvent } from "react";
import { AgentFace, type FaceMood } from "@/components/ask/agent-face";
import { MAX_QUESTION_LENGTH } from "@/lib/ask/limits";

export function Composer({
  mood,
  isBusy,
  onAsk,
  onStop,
}: {
  mood: FaceMood;
  isBusy: boolean;
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
    <form
      onSubmit={handleSubmit}
      className="ask-composer flex items-end gap-3 rounded-2xl border border-border bg-background py-2.5 pl-4 pr-2.5 transition-[border-color] duration-200 focus-within:border-accent"
    >
      <AgentFace
        // It looks over at what you're typing, unless it's busy answering
        mood={mood === "idle" && question.trim() ? "listening" : mood}
        className="mb-1 w-8 shrink-0 text-foreground"
      />
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
        className="max-h-40 min-w-0 flex-1 resize-none self-center bg-transparent py-1 text-base leading-relaxed placeholder:text-muted focus:outline-none"
      />
      <button
        type="submit"
        disabled={!isBusy && !canAsk}
        data-state={isBusy ? "busy" : "idle"}
        aria-label={isBusy ? "Stop answering" : "Send question"}
        className="ask-send relative h-9 w-9 shrink-0 rounded-full bg-foreground text-background transition-[transform,opacity] duration-[160ms] ease-[var(--ease-out)] active:scale-[0.97] disabled:opacity-30 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="ask-send-plane absolute inset-0 m-auto h-[18px] w-[18px]"
        >
          <path d="M21.2 3.1 10.4 13.6" />
          <path d="M21.2 3.1 14.6 20.6l-4.2-7-7-4.2Z" />
        </svg>
        <span
          aria-hidden
          className="ask-send-stop absolute inset-0 m-auto h-3 w-3 rounded-[3px] bg-current"
        />
      </button>
    </form>
  );
}
