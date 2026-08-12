"use client";

import { useEffect, useState } from "react";

const VERBS = ["learning", "creating", "teaching"];

export function FlowVerbs() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (prefersReduced) return;

    const id = setInterval(() => {
      setIndex((i) => (i + 1) % VERBS.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="relative inline-grid">
      {/* Invisible sizer keeps layout stable at the widest verb */}
      <span aria-hidden className="invisible col-start-1 row-start-1">
        creating
      </span>
      <span
        key={index}
        className="animate-flow-in col-start-1 row-start-1 bg-gradient-to-r from-muted-foreground to-foreground bg-clip-text font-semibold text-transparent"
      >
        {VERBS[index]}
      </span>
      <span className="sr-only">learning, creating, and teaching</span>
    </span>
  );
}
