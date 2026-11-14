"use client";

import { useState } from "react";
import { DrawingFooter, TextButton } from "@/components/sketch";
import { dedent, Mark } from "./marks";

type Option = {
  /** The excerpt, as the reader would find it in an RFC. */
  text: string;
  /** Why it works or doesn't, shown once the reader picks. */
  note: string;
};

type PickProps = {
  question: string;
  options: readonly [Option, Option];
  /** Index of the stronger option. */
  answer: 0 | 1;
};

const LETTERS = ["A", "B"];

export function Pick({ question, options, answer }: PickProps) {
  const [picked, setPicked] = useState<number | null>(null);
  const revealed = picked !== null;

  return (
    <div>
      <p className="font-mono text-sm text-muted">Pick one</p>
      <p className="mt-1 text-pretty text-lg font-medium leading-snug">{question}</p>

      <div className="mt-5 space-y-3">
        {options.map((option, i) => {
          const right = i === answer;

          return (
            <button
              key={LETTERS[i]}
              type="button"
              disabled={revealed}
              aria-pressed={picked === i}
              onClick={() => setPicked(i)}
              className={`block w-full rounded-lg border p-4 text-left transition-[border-color,transform] duration-150 [transition-timing-function:var(--ease-out)] enabled:hover:border-accent enabled:active:scale-[0.99] ${
                revealed && right ? "border-foreground" : "border-border"
              }`}
            >
              <span className="flex h-5 items-center gap-2 font-mono text-sm text-muted">
                {LETTERS[i]}
                {revealed && <Mark right={right} />}
                {picked === i && <span>your pick</span>}
              </span>
              <span
                className={`mt-2 block whitespace-pre-line text-pretty text-[15px] leading-relaxed transition-opacity duration-200 ${
                  revealed && !right ? "opacity-60" : ""
                }`}
              >
                {dedent(option.text)}
              </span>
              {revealed && (
                <span className="pen-appear mt-3 block border-t border-border pt-3 text-pretty text-sm leading-relaxed text-muted">
                  {option.note}
                </span>
              )}
            </button>
          );
        })}
      </div>

      <DrawingFooter>
        <span aria-live="polite">
          {!revealed && "Which one would you rather get?"}
          {revealed && picked === answer && "That's the one."}
          {revealed && picked !== answer && `Not quite. ${LETTERS[answer]} is the stronger one.`}
        </span>
        {revealed && <TextButton onClick={() => setPicked(null)}>try again</TextButton>}
      </DrawingFooter>
    </div>
  );
}
