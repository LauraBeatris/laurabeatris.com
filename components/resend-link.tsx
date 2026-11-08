"use client";

import { useRef, useState } from "react";
import type { AnimationEvent, PointerEvent } from "react";

type Phase = "perched" | "flying" | "away" | "returning";

/**
 * One continuous line, traced from a pen sketch, in CSS pixels from the word's
 * top-left corner. It starts as the half ring around the word: above the R, round
 * its left side and across the word to the perch. From there it's the way out, up
 * over a hump, down into a valley and off to the top right.
 * The plane rides this exact path, so its trail can't drift out of sync.
 * The perch sits 17.71% along it (see `.plane` in globals.css).
 */
const FLIGHT_PATH =
  "M2.5 1.5C1.8 1.9 -0.5 2.9 -1.5 4C-2.5 5.1 -3.4 6.7 -3.6 8C-3.8 9.3 -3.4 10.8 -2.6 11.8C-1.8 12.8 -1.1 13.4 1 13.8C3.1 14.2 6 14.1 10 14.2C14 14.3 20 14.3 25 14.3C30 14.3 35 14.3 40 14.2C45 14.1 50.8 14.2 55 14C59.2 13.8 62.3 13.6 65 13.1C67.7 12.6 69.3 12 71 11C72.7 10 73.6 9 75 7C76.4 5 78.5 2.3 79.5 -1C80.5 -4.3 79.1 -4.3 81 -13C82.9 -21.7 84.5 -41.3 91 -53C97.5 -64.7 111 -75.7 120 -83C129 -90.3 135.8 -95.8 145 -97C154.2 -98.3 165.3 -97.2 175 -90.5C184.7 -83.8 193.8 -66.2 203 -57C212.2 -47.8 221.8 -37.4 230 -35.5C238.3 -33.6 245.4 -40.3 252.5 -45.5C259.6 -50.8 265.8 -58.7 272.5 -67C279.2 -75.3 284.9 -84.2 292.5 -95.5C300.1 -106.8 308.1 -121.3 318 -135C327.9 -148.8 346.3 -170.8 352 -178";

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
      className="relative font-medium text-foreground"
    >
      {/* Painted before the word, so the half ring passes behind the letters. */}
      <svg
        aria-hidden="true"
        fill="none"
        className="pointer-events-none absolute left-0 top-0 size-px overflow-visible text-accent"
      >
        <defs>
          <mask
            id={TRAIL_MASK_ID}
            maskUnits="userSpaceOnUse"
            x="-30"
            y="-200"
            width="420"
            height="250"
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
          strokeDasharray="7 6"
          className="plane-trail"
        />
      </svg>

      <span className="relative">Resend</span>

      <span
        aria-hidden="true"
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
