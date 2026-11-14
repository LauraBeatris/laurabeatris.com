"use client";

import { useState } from "react";
import { DrawingFooter, TextButton } from "@/components/sketch";
import { Mark } from "./marks";

const CHANGES = [
  {
    change: "Rename an internal helper used in three files",
    rfc: false,
    note: "The PR description is enough. Nobody needs to approve a name in advance.",
  },
  {
    change: "Change the shape of a public API response",
    rfc: true,
    note: "Customers build on it, and you can't take it back once it ships.",
  },
  {
    change: "Bump a dependency's minor version",
    rfc: false,
    note: "Your CI is the reviewer here.",
  },
  {
    change: "Move webhook delivery to a different queue provider",
    rfc: true,
    note: "Expensive to reverse, and it changes things for everyone on call.",
  },
  {
    change: "Add a filter to an internal admin page",
    rfc: false,
    note: "Build it, ship it, mention it in the channel.",
  },
  {
    change: "Change when customers receive retried webhooks",
    rfc: true,
    note: "It changes what customers see. That's worth a decision on record.",
  },
] as const;

type Answers = Record<number, boolean>;

export function NeedsAnRfc() {
  const [answers, setAnswers] = useState<Answers>({});

  const answered = Object.keys(answers).length;
  const right = CHANGES.filter((item, i) => answers[i] === item.rfc).length;
  const done = answered === CHANGES.length;

  function answer(index: number, rfc: boolean) {
    setAnswers((current) => ({ ...current, [index]: rfc }));
  }

  return (
    <div>
      <p className="font-mono text-sm text-muted">Sort them</p>
      <p className="mt-1 text-pretty text-lg font-medium leading-snug">
        Does it need an RFC, or is a message enough?
      </p>

      <ul className="mt-5 divide-y divide-border border-y border-border">
        {CHANGES.map((item, i) => {
          const choice = answers[i];
          const revealed = choice !== undefined;

          return (
            <li key={item.change} className="py-3">
              <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
                <span className="flex items-center gap-2 text-pretty text-[15px] leading-snug">
                  {revealed && <Mark right={choice === item.rfc} />}
                  {item.change}
                </span>
                <span className="flex shrink-0 gap-1.5">
                  {[true, false].map((rfc) => (
                    <button
                      key={String(rfc)}
                      type="button"
                      disabled={revealed}
                      aria-pressed={choice === rfc}
                      onClick={() => answer(i, rfc)}
                      className="border border-border px-2.5 py-1 font-mono text-sm text-foreground transition-transform duration-150 [transition-timing-function:var(--ease-out)] enabled:active:scale-[0.97] disabled:text-muted aria-pressed:bg-foreground aria-pressed:text-background"
                    >
                      {rfc ? "RFC" : "message"}
                    </button>
                  ))}
                </span>
              </div>
              {revealed && (
                <p className="pen-appear mt-2 text-pretty text-sm leading-relaxed text-muted">
                  {item.rfc ? "RFC. " : "A message. "}
                  {item.note}
                </p>
              )}
            </li>
          );
        })}
      </ul>

      <DrawingFooter>
        <span aria-live="polite">
          {done
            ? `${right} of ${CHANGES.length}.`
            : `${answered} of ${CHANGES.length} sorted.`}
        </span>
        {answered > 0 && <TextButton onClick={() => setAnswers({})}>start over</TextButton>}
      </DrawingFooter>
    </div>
  );
}
