"use client";

import { useRef, useState } from "react";
import type { AnimationEvent, PointerEvent } from "react";

type Phase = "perched" | "flying" | "away" | "returning";

/**
 * One continuous line, in CSS pixels from the word's top-left corner: the arc
 * over the word up to the perch, a lap around it, a dip, then the climb away.
 * The plane rides this exact path, so its trail can't drift out of sync.
 * The perch sits 10.25% along it (see `.plane` in globals.css).
 */
const FLIGHT_PATH =
  "M-10 10C-8.3 8.2 -5 1.8 0 -1C5 -3.8 13 -5.6 20 -6.5C27 -7.4 35 -6.2 42 -6.5C49 -6.8 55.7 -7.6 62 -8.5C68.3 -9.4 74.7 -11.2 80 -12C85.3 -12.8 88.8 -14.2 94 -13.5C99.2 -12.8 106.3 -11.6 111 -8C115.7 -4.4 122.2 1.3 122 8C121.8 14.7 117.3 25.9 110 32C102.7 38.1 90.3 42 78 44.5C65.7 47 50.3 47.6 36 47C21.7 46.4 3.3 45.5 -8 41C-19.3 36.5 -28.2 27.8 -32 20C-35.8 12.2 -35.2 0 -31 -6C-26.8 -12 -17.8 -13.8 -7 -16C3.8 -18.2 19.2 -18.4 34 -19C48.8 -19.6 66.3 -20.5 82 -19.5C97.7 -18.5 113.3 -17.9 128 -13C142.7 -8.1 155.3 3.7 170 10C184.7 16.3 200.7 23.7 216 25C231.3 26.3 247.7 24.5 262 18C276.3 11.5 291 -0.7 302 -14C313 -27.3 320.7 -45.7 328 -62C335.3 -78.3 337.7 -95.7 346 -112C354.3 -128.3 366 -145 378 -160C390 -175 411.3 -195 418 -202";

const FLIGHT_LENGTH = 938;

/** Even dashes that shrink to dots over the last stretch of the climb. */
function buildTrailDashes() {
  const taperStart = FLIGHT_LENGTH * 0.68;
  const dashes: number[] = [];
  let distance = 0;

  while (distance < FLIGHT_LENGTH) {
    const remaining = (FLIGHT_LENGTH - distance) / (FLIGHT_LENGTH - taperStart);
    const taper = distance < taperStart ? 1 : Math.max(remaining, 0);
    const dash = Math.round((0.5 + 4.5 * taper) * 10) / 10;
    const gap = 6.5;
    dashes.push(dash, gap);
    distance += dash + gap;
  }

  return dashes.join(" ");
}

const TRAIL_DASHES = buildTrailDashes();
const TRAIL_MASK_ID = "resend-plane-trail";

export function ResendLink() {
  const [phase, setPhase] = useState<Phase>("perched");
  const isHovering = useRef(false);

  function handlePointerEnter(event: PointerEvent<HTMLAnchorElement>) {
    // A tap also fires pointerenter, right before the link opens.
    if (event.pointerType === "touch") return;
    isHovering.current = true;

    if (phase !== "perched") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setPhase("flying");
  }

  function handlePointerLeave() {
    isHovering.current = false;
    if (phase === "away") setPhase("returning");
  }

  function handleAnimationEnd(event: AnimationEvent<HTMLAnchorElement>) {
    if (event.animationName === "plane-trail-erase") {
      // A flight always finishes. It only comes back once the pointer is gone.
      setPhase(isHovering.current ? "away" : "returning");
    }
    if (event.animationName === "plane-return") {
      // Hovered again while landing: don't swallow it, take off once it lands.
      setPhase(isHovering.current ? "flying" : "perched");
    }
  }

  return (
    <a
      href="https://resend.com"
      target="_blank"
      rel="noopener noreferrer"
      data-plane={phase}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onAnimationEnd={handleAnimationEnd}
      className="relative font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
    >
      Resend
      <span aria-hidden="true" className="pointer-events-none absolute left-0 top-0">
        <svg fill="none" className="absolute left-0 top-0 size-px overflow-visible text-accent">
          <defs>
            <mask
              id={TRAIL_MASK_ID}
              maskUnits="userSpaceOnUse"
              x="-60"
              y="-240"
              width="520"
              height="320"
            >
              <path
                d={FLIGHT_PATH}
                pathLength={1}
                stroke="white"
                strokeWidth="4"
                className="plane-trail-reveal"
              />
              <path
                d={FLIGHT_PATH}
                pathLength={1}
                stroke="black"
                strokeWidth="5"
                className="plane-trail-erase"
              />
            </mask>
          </defs>
          <path
            d={FLIGHT_PATH}
            mask={`url(#${TRAIL_MASK_ID})`}
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeDasharray={TRAIL_DASHES}
            className="plane-trail"
          />
        </svg>

        <span
          className="plane absolute left-0 top-0 block h-[14.4px] w-[18px]"
          style={{ offsetPath: `path("${FLIGHT_PATH}")` }}
        >
          {/* Seen from above and pointing along +x, so it reads right mid-loop. */}
          <svg
            viewBox="0 0 20 16"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.8"
            strokeLinejoin="round"
            className="plane-body block size-full"
          >
            <path d="M19.4 8L0.8 0.8L5.2 8Z" />
            <path d="M19.4 8L0.8 15.2L5.2 8Z" opacity="0.55" />
          </svg>
        </span>
      </span>
    </a>
  );
}
