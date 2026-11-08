"use client";

import { useEffect, useState } from "react";

const DAYS = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

// Traced from a pen sketch, one path per pen stroke. The base sits right above
// the text and carries the weight; the crest floats over it, drawn lighter.
const CLOUD_BASE_STROKES = [
  "M0.6 12.2C3.6 10.1 9.6 5.5 11.2 11.7C14.6 8.6 18.0 5.0 20.6 11.6C22.7 8.0 29.4 7.1 30.7 11.8C35.5 7.2 37.9 5.8 41.8 12.4C44.9 9.0 49.2 5.0 52.0 11.4C55.5 9.4 59.1 6.4 61.3 12.2C64.3 9.7 68.2 5.0 70.6 11.2C73.5 7.6 74.3 7.6 77.6 10.3",
  "M79.7 9.5C83.6 7.4 86.8 5.4 89.1 11.0C90.8 8.2 95.9 6.1 97.4 10.6C97.9 9.7 98.9 9.4 99.8 9.4",
  "M104.3 9.7C106.1 8.3 107.4 10.9 108.9 11.6",
];

const CLOUD_CREST_STROKES = [
  "M0.3 5.2C3.1 3.1 5.1 2.7 8.4 3.9",
  "M22.7 2.3C27.1 1.2 26.1 3.2 29.2 3.1",
  "M41.3 2.1C44.1 1.3 44.4 2.2 46.7 2.8",
  "M56.5 1.6C59.7 0.1 58.3 0.5 60.9 2.3",
  "M68.3 1.7C72.2 0.6 71.7 -0.2 74.6 2.7",
  "M80.9 2.1C83.7 1.4 83.9 2.0 86.2 2.4",
  "M92.6 1.6C93.5 1.3 94.4 1.1 95.4 1.1",
  "M103.2 3.9C105.5 3.5 106.0 5.7 107.2 6.2",
];

export function Greeting() {
  // Render a stable value on the server, then resolve the real day on the client
  // to avoid a hydration mismatch across timezones.
  const [day, setDay] = useState<string | null>(null);

  useEffect(() => {
    setDay(DAYS[new Date().getDay()]);
  }, []);

  return (
    <span className="relative inline-block text-muted">
      {day && (
        // Waits for the day so it's never sized to the placeholder. Stretches
        // with the day's length while the strokes keep their weight.
        <svg
          aria-hidden="true"
          viewBox="0 0 109.2 13.2"
          preserveAspectRatio="none"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute -left-[0.8ch] bottom-full h-3.5 w-[calc(100%+0.6ch)] overflow-visible text-accent"
        >
          {CLOUD_BASE_STROKES.map((d) => (
            <path
              key={d}
              d={d}
              strokeWidth="1.5"
              vectorEffect="non-scaling-stroke"
            />
          ))}
          {CLOUD_CREST_STROKES.map((d) => (
            <path
              key={d}
              d={d}
              strokeWidth="0.75"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>
      )}
      Happy{" "}
      <span
        className={`group relative inline-block ${day ? "text-foreground" : "opacity-0"}`}
        aria-hidden={!day}
        tabIndex={day ? 0 : -1}
      >
        <span
          className="pointer-events-none absolute bottom-0 left-full ml-3"
          aria-hidden="true"
        >
          <svg
            width="20"
            height="23"
            viewBox="0 0 30 34"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="coffee-cup text-accent"
          >
            {/* steam */}
            <path className="coffee-steam" d="M10 3c-1.2 1.6 0.8 2.6-0.4 4.2" />
            <path className="coffee-steam" d="M15 2c-1.2 1.8 0.8 2.8-0.4 4.6" />
            <path className="coffee-steam" d="M20 3c-1.2 1.6 0.8 2.6-0.4 4.2" />
            {/* cup */}
            <path d="M5 12h16v7a6 6 0 0 1-6 6h-4a6 6 0 0 1-6-6z" />
            {/* handle */}
            <path d="M21 13h2.5a3.5 3.5 0 0 1 0 7H21" />
            {/* saucer */}
            <path d="M4 28h18" />
          </svg>
        </span>
        {day ?? "day"}
      </span>
      !
    </span>
  );
}
