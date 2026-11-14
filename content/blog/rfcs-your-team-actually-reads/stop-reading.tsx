"use client";

import { useState } from "react";
import { DrawingFooter } from "@/components/sketch";

const BUDGETS = ["10 seconds", "1 minute", "10 minutes"] as const;

const DOCS = [
  {
    label: "Warm-up first",
    blocks: [
      "Webhooks are a critical part of our platform, and their reliability matters a lot to our customers.",
      "In 2023 we moved webhooks out of the monolith into a separate worker, originally built for batch email, with a Redis-backed queue and a retry cron…",
      "We propose retrying failed webhooks for 24 hours with backoff. We need a decision on the window by Friday.",
    ],
    takeaways: [
      "that webhooks matter.",
      "some history about a worker.",
      "what you're proposing, finally.",
    ],
  },
  {
    label: "Bottom line up front",
    blocks: [
      "We want to retry failed webhooks for 24 hours with backoff. We need a decision on the window by Friday.",
      "Failed deliveries are our top support ticket, most customer outages last under 6 hours, and the queue we already run supports backoff.",
      "Ticket counts by month, outage durations from last quarter, the alternatives we considered, and the rollout slices…",
    ],
    takeaways: [
      "what you want, and by when.",
      "why, and why it's cheap.",
      "enough to challenge the details.",
    ],
  },
] as const;

export function StopReading() {
  const [budget, setBudget] = useState(0);

  return (
    <div>
      <p className="font-mono text-sm text-muted">Your reader has</p>
      <div className="mt-2 flex flex-wrap gap-1.5">
        {BUDGETS.map((label, i) => (
          <button
            key={label}
            type="button"
            aria-pressed={budget === i}
            onClick={() => setBudget(i)}
            className="border border-border px-2.5 py-1 font-mono text-sm text-foreground transition-transform duration-150 [transition-timing-function:var(--ease-out)] active:scale-[0.97] aria-pressed:bg-foreground aria-pressed:text-background"
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mt-5 space-y-3">
        {DOCS.map((doc) => (
          <div key={doc.label} className="rounded-lg border border-border p-4">
            <p className="font-mono text-sm text-muted">{doc.label}</p>
            <div className="mt-2 space-y-2 text-pretty text-[15px] leading-relaxed">
              {doc.blocks.map((block, i) => (
                <p
                  key={block}
                  className={`transition-[opacity,filter] duration-300 [transition-timing-function:var(--ease-out)] ${
                    i > budget ? "opacity-25 blur-[2px]" : ""
                  }`}
                >
                  {block}
                </p>
              ))}
            </div>
            <p
              aria-live="polite"
              className="mt-3 border-t border-border pt-3 text-pretty text-sm leading-relaxed text-muted"
            >
              They leave knowing {doc.takeaways[budget]}
            </p>
          </div>
        ))}
      </div>

      <DrawingFooter>
        <span>Same RFC, same facts, different order.</span>
      </DrawingFooter>
    </div>
  );
}
