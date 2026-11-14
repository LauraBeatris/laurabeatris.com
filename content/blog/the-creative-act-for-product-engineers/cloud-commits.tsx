"use client";

import { useState } from "react";
import { DrawingFooter, Ink, TextButton } from "@/components/sketch";

/** The cloud above the home page greeting, as it stood after each commit. */
const COMMITS = [
  {
    base: [
      "M0.6 16.2C3.6 14.1 9.6 9.5 11.2 15.7C14.6 12.6 18.0 9.0 20.6 15.6C22.7 12.0 29.4 11.1 30.7 15.8C35.5 11.2 37.9 9.8 41.8 16.4C44.9 13.0 49.2 9.0 52.0 15.4C55.5 13.4 59.1 10.4 61.3 16.2C64.3 13.7 68.2 9.0 70.6 15.2C73.5 11.6 74.3 11.6 77.6 14.3",
      "M79.7 13.5C83.6 11.4 86.8 9.4 89.1 15.0C90.8 12.2 95.9 10.1 97.4 14.6C97.9 13.7 98.9 13.4 99.8 13.4",
      "M104.3 13.7C106.1 12.3 107.4 14.9 108.9 15.6",
    ],
    crest: [
      "M0.3 9.2C3.1 7.1 5.1 6.7 8.4 7.9",
      "M22.7 6.3C27.1 5.2 26.1 7.2 29.2 7.1",
      "M41.3 6.1C44.1 5.3 44.4 6.2 46.7 6.8",
      "M56.5 5.6C59.7 4.1 58.3 4.5 60.9 6.3",
      "M68.3 5.7C72.2 4.6 71.7 3.8 74.6 6.7",
      "M80.9 6.1C83.7 5.4 83.9 6.0 86.2 6.4",
      "M92.6 5.6C93.5 5.3 94.4 5.1 95.4 5.1",
      "M103.2 7.9C105.5 7.5 106.0 9.7 107.2 10.2",
    ],
  },
  {
    base: [
      "M0.6 13.2C4.9 7.8 11.9 9.0 15.9 14.5C22.2 9.2 28.1 9.2 33.9 15.1C40.3 10.1 45.2 8.5 50.6 16.0C53.6 10.9 62.3 10.0 65.1 15.7C69.7 9.8 76.6 12.0 81.3 16.2C86.2 11.9 91.9 9.4 96.5 15.7C99.5 11.1 112.6 9.6 113.5 17.3",
    ],
    crest: [
      "M7.1 1.7C13.9 -0.6 14.2 3.9 18.0 3.5",
      "M25.7 4.0C30.2 2.4 29.1 3.1 32.9 4.5",
      "M40.2 5.2C45.9 3.4 45.4 3.1 50.8 5.9",
      "M63.9 6.7C68.8 5.4 71.1 3.3 75.7 6.8",
      "M86.5 6.6C91.5 5.2 93.1 5.5 97.3 8.6",
      "M102.3 6.9C106.2 6.0 107.6 4.6 110.9 7.7",
    ],
  },
  {
    base: [
      "M0.6 13.2C4.9 7.8 11.9 9.0 15.9 14.5C22.2 9.2 28.1 9.2 33.9 15.1C40.3 10.1 45.2 8.5 50.6 16.0C53.6 10.9 62.3 10.0 65.1 15.7C69.7 9.8 76.6 12.0 81.3 16.2C86.2 11.9 91.9 9.4 96.5 15.7C99.5 11.1 112.6 9.6 113.5 17.3",
    ],
    crest: [
      "M0.8 7.4C4.7 4.9 10.0 5.0 14.0 7.2",
      "M18.0 8.1C22.2 5.9 27.4 5.8 31.6 8.1",
      "M35.9 8.7C40.1 6.1 45.9 5.8 49.8 9.1",
      "M65.1 10.0C69.2 7.2 74.7 7.4 79.0 9.6",
      "M83.9 9.3C87.7 7.2 92.7 7.0 96.3 9.7",
      "M99.1 8.9C103.3 7.4 108.2 7.1 112.3 9.1",
    ],
  },
];

export function CloudCommits() {
  // Stops at the last commit: pressing again is meant to do nothing
  const [count, setCount] = useState(0);
  const commit = COMMITS[count - 1];

  return (
    <div>
      <svg
        viewBox="-2 -2 118.8 22.2"
        aria-hidden
        className="mx-auto block h-auto w-full max-w-[360px] overflow-visible"
      >
        {commit && (
          <g key={count}>
            <Ink paths={commit.base} width={0.62} draw />
            <Ink paths={commit.crest} width={0.34} draw delay={320} />
          </g>
        )}
      </svg>
      <DrawingFooter>
        <span aria-live="polite">
          {count === 0 ? "No cloud yet." : `${count} ${count === 1 ? "commit" : "commits"}`}
        </span>
        <TextButton onClick={() => setCount((value) => Math.min(value + 1, COMMITS.length))}>
          one more pass
        </TextButton>
      </DrawingFooter>
    </div>
  );
}
