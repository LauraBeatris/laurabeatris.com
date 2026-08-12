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
        className={day ? "text-foreground" : "opacity-0"}
        aria-hidden={!day}
      >
        {day ?? "day"}
      </span>
      !
    </span>
  );
}
