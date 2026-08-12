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

export function Greeting() {
  // Render a stable value on the server, then resolve the real day on the client
  // to avoid a hydration mismatch across timezones.
  const [day, setDay] = useState<string | null>(null);

  useEffect(() => {
    setDay(DAYS[new Date().getDay()]);
  }, []);

  return (
    <span className="text-muted">
      Happy{" "}
      <span
        className={`group relative inline-block ${day ? "text-foreground" : "opacity-0"}`}
        aria-hidden={!day}
        tabIndex={day ? 0 : -1}
      >
        <span
          className="pointer-events-none absolute bottom-full left-full mb-0.5 ml-1"
          aria-hidden="true"
        >
          <svg
            width="30"
            height="34"
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
