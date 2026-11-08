"use client";

import { useState } from "react";

const EASINGS = ["linear", "ease-in", "ease-out"] as const;

export function EasingDemo() {
  const [isAtEnd, setIsAtEnd] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      {EASINGS.map((easing) => (
        <div key={easing} className="flex items-center gap-4">
          <span className="w-20 shrink-0 font-mono text-sm text-muted">
            {easing}
          </span>
          <div className="flex-1 overflow-hidden rounded-full bg-border/60 p-1">
            {/* One dot narrower than the track, so translateX(100%) lands on the end */}
            <div
              className="w-[calc(100%-1rem)] transition-transform duration-700 motion-reduce:transition-none"
              style={{
                transform: `translateX(${isAtEnd ? "100%" : "0"})`,
                transitionTimingFunction: easing,
              }}
            >
              <div className="size-4 rounded-full bg-foreground" />
            </div>
          </div>
        </div>
      ))}

      <button
        type="button"
        onClick={() => setIsAtEnd((value) => !value)}
        className="mt-2 w-fit rounded-full border border-border px-4 py-1.5 font-mono text-sm transition-colors hover:border-accent"
      >
        Play
      </button>
    </div>
  );
}
