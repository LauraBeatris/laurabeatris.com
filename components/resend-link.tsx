"use client";

import { useRef, useState } from "react";
import type { AnimationEvent, PointerEvent } from "react";

type Phase = "perched" | "flying" | "away" | "returning";

/**
 * One continuous line, in CSS pixels from the word's top-left corner. It spirals
 * counter-clockwise: the ring up to the perch, two laps around the word, then
 * off to the left. Each lap sits outside the last so the trail never overlaps.
 * The plane rides this exact path, so its trail can't drift out of sync.
 * The perch sits 18.47% along it (see `.plane` in globals.css).
 */
const FLIGHT_PATH =
  "M48.9 -8C46.3 -8.4 38.7 -10.1 33.4 -10.3C28.1 -10.5 22.3 -10.2 17.2 -9.4C12.1 -8.5 6.9 -7.1 2.8 -5.2C-1.4 -3.4 -5.1 -1 -7.6 1.5C-10.1 4.1 -11.8 7.1 -12.2 10C-12.6 12.9 -11.9 16.1 -10.1 18.9C-8.3 21.7 -5.3 24.5 -1.5 26.8C2.2 29.1 7.2 31.1 12.4 32.5C17.6 33.9 23.7 34.8 29.6 35.1C35.5 35.3 41.9 34.9 47.5 34C53.2 33 58.9 31.3 63.5 29.3C68 27.2 72.1 24.5 74.9 21.6C77.6 18.8 79.3 15.2 79.9 12.1C80.4 9 79.8 6 78 3C76.3 0 73.1 -3.4 69.2 -6C65.2 -8.6 59.9 -11 54.3 -12.6C48.7 -14.2 42 -15.4 35.6 -15.7C29.2 -16.1 22.1 -15.8 15.8 -14.8C9.6 -13.9 3.2 -12.1 -1.9 -9.9C-7.1 -7.7 -11.7 -4.8 -14.9 -1.6C-18.1 1.5 -20.3 5.2 -21 8.8C-21.7 12.4 -21.1 16.3 -19.1 19.8C-17.2 23.3 -13.7 26.9 -9.4 29.8C-5 32.6 0.8 35.2 6.9 37C13 38.8 20.3 40.1 27.3 40.5C34.3 40.9 42 40.5 48.8 39.4C55.6 38.4 62.5 36.4 68.1 34C73.6 31.6 78.7 28.3 82.1 24.9C85.6 21.5 87.9 17.4 88.7 13.4C89.4 9.5 88.7 5.2 86.6 1.3C84.5 -2.5 80.7 -6.4 76 -9.5C71.3 -12.7 65 -15.5 58.4 -17.5C51.7 -19.4 43.8 -20.8 36.3 -21.2C28.7 -21.6 20.4 -21.2 13 -20.1C5.7 -18.9 -1.8 -16.7 -7.8 -14.1C-13.8 -11.4 -19.2 -7.9 -22.9 -4.1C-26.6 -0.4 -29.2 4.1 -30 8.4C-30.8 12.6 -30 17.4 -27.7 21.5C-25.4 25.7 -21.3 29.9 -16.2 33.3C-11.1 36.7 -4.3 39.8 2.8 41.9C9.9 44 18.5 45.5 26.6 46C34.7 46.4 43.7 46 51.6 44.7C59.4 43.4 67.5 41.1 73.9 38.2C80.3 35.3 86.2 31.4 90.1 27.4C94.1 23.3 96.8 18.5 97.7 13.9C98.5 9.2 97.6 4.1 95.2 -0.4C92.7 -4.9 88.3 -9.4 82.8 -13.1C77.4 -16.8 81.9 -21 62.4 -22.4C43 -23.8 -10.6 -22.1 -34 -21.5C-57.4 -20.9 -63 -19.7 -78 -18.5C-93 -17.3 -108.7 -15.6 -124 -14.5C-139.3 -13.4 -162.3 -12.4 -170 -12";

const FLIGHT_LENGTH = 1037;

/** The front of the resting ring, where the link's underline stands in for it. */
const UNDERLINE_GAP = [97, 163];

/** Even dashes that shrink to dots over the last stretch as it flies off. */
function buildTrailDashes() {
  const taperStart = FLIGHT_LENGTH * 0.8;
  const dashes: number[] = [];
  let distance = 0;

  while (distance < FLIGHT_LENGTH) {
    const remaining = (FLIGHT_LENGTH - distance) / (FLIGHT_LENGTH - taperStart);
    const taper = distance < taperStart ? 1 : Math.max(remaining, 0);
    const dash = Math.round((0.5 + 4.5 * taper) * 10) / 10;
    const dashEnd = distance + dash;
    const next = dashEnd + 6.5;
    const isNextHidden = next >= UNDERLINE_GAP[0] && next < UNDERLINE_GAP[1];
    const gap = isNextHidden ? UNDERLINE_GAP[1] - dashEnd : 6.5;
    dashes.push(dash, gap);
    distance = dashEnd + gap;
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
              x="-190"
              y="-40"
              width="310"
              height="110"
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
          <span className="plane-body block size-full">
            {/* Real folded faces in 3D, pointing along +x, so banking looks solid. */}
            <span className="plane-model block size-full">
              <PlaneFace d="M19.6 8L4.6 8L5.8 12.8Z" className="plane-keel text-muted" />
              <PlaneFace d="M19.6 8L0.8 0.8L4.6 8Z" className="plane-wing-left text-accent" />
              <PlaneFace d="M19.6 8L0.8 15.2L4.6 8Z" className="plane-wing-right text-foreground" />
            </span>
          </span>
        </span>
      </span>
    </a>
  );
}

function PlaneFace({ d, className }: { d: string; className: string }) {
  return (
    <svg
      viewBox="0 0 20 16"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinejoin="round"
      className={`plane-face ${className}`}
    >
      <path d={d} />
    </svg>
  );
}
