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
// the text and carries the weight; the crest floats over it, drawn lighter and
// running parallel to the arches below.
const CLOUD_BASE_STROKES = [
  "M0.6 13.2C4.9 7.8 11.9 9.0 15.9 14.5C22.2 9.2 28.1 9.2 33.9 15.1C40.3 10.1 45.2 8.5 50.6 16.0C53.6 10.9 62.3 10.0 65.1 15.7C69.7 9.8 76.6 12.0 81.3 16.2C86.2 11.9 91.9 9.4 96.5 15.7C99.5 11.1 112.6 9.6 113.5 17.3",
];

const CLOUD_CREST_STROKES = [
  "M0.8 7.4C4.7 4.9 10.0 5.0 14.0 7.2",
  "M18.0 8.1C22.2 5.9 27.4 5.8 31.6 8.1",
  "M35.9 8.7C40.1 6.1 45.9 5.8 49.8 9.1",
  "M65.1 10.0C69.2 7.2 74.7 7.4 79.0 9.6",
  "M83.9 9.3C87.7 7.2 92.7 7.0 96.3 9.7",
  "M99.1 8.9C103.3 7.4 108.2 7.1 112.3 9.1",
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
        // Waits for the day so it's never sized to the placeholder. Scales
        // evenly with the day's length, so the arches stay round and the
        // strokes keep their weight.
        <svg
          aria-hidden="true"
          viewBox="0 0 114.8 18.2"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="pointer-events-none absolute -left-[0.8ch] bottom-full h-auto w-[calc(100%+0.6ch)] overflow-visible text-foreground"
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
