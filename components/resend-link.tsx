"use client";

import { useRef, useState } from "react";
import type { AnimationEvent, CSSProperties, PointerEvent } from "react";

type Phase = "perched" | "flying" | "away" | "returning";

/**
 * One continuous line, in CSS pixels from the word's top-left corner. It starts
 * as a swoop under the word, from below the R up to the perch. From there it's
 * the way out, traced from a pen sketch: up over a hump, down into a valley and
 * off to the top right.
 * The plane rides this exact path, so its trail can't drift out of sync.
 * The perch sits 16.13% along it (see `.plane` in globals.css).
 */
const FLIGHT_PATH =
  "M1 25.5C2.5 26.1 6.2 28.1 10 29C13.8 29.9 19 30.8 24 31C29 31.3 35 31.3 40 30.5C45 29.8 50.2 28 54 26.5C57.8 25 60.4 23.3 63 21.5C65.6 19.7 67.5 17.9 69.5 15.5C71.5 13.1 73.3 9.8 75 7C76.7 4.3 78.5 2.3 79.5 -1C80.5 -4.3 79.1 -4.3 81 -13C82.9 -21.7 84.5 -41.3 91 -53C97.5 -64.7 111 -75.7 120 -83C129 -90.3 135.8 -95.8 145 -97C154.2 -98.3 165.3 -97.2 175 -90.5C184.7 -83.8 193.8 -66.2 203 -57C212.2 -47.8 221.8 -37.4 230 -35.5C238.3 -33.6 245.4 -40.3 252.5 -45.5C259.6 -50.8 265.8 -58.7 272.5 -67C279.2 -75.3 284.9 -84.2 292.5 -95.5C300.1 -106.8 308.1 -121.3 318 -135C327.9 -148.8 346.3 -170.8 352 -178";

const FLIGHT_LENGTH = 519.3;
const PERCH_DISTANCE = 83.7;
const TRAIL_MASK_ID = "resend-plane-trail";

/**
 * Dashes stay small around the word, then lengthen and thicken on the way out.
 * One stroke can't change width, so each width gets its own layer of the path.
 */
function buildTrailLayers() {
  const round = (value: number) => Math.round(value * 10) / 10;
  const dashes: { start: number; length: number; width: number }[] = [];
  let start = 0;

  while (start < FLIGHT_LENGTH) {
    const isResting = start < PERCH_DISTANCE;
    const progress = isResting
      ? 0
      : (start - PERCH_DISTANCE) / (FLIGHT_LENGTH - PERCH_DISTANCE);
    const length = round(isResting ? 3.5 : 4 + 9 * progress);
    const gap = round(isResting ? 3.5 : 4 + 5 * progress);
    const width = isResting ? 1 : Math.round((1.25 + progress) * 4) / 4;
    dashes.push({ start, length, width });
    start = round(start + length + gap);
  }

  return [...new Set(dashes.map((dash) => dash.width))].map((width) => {
    const layer = dashes.filter((dash) => dash.width === width);
    const pattern = layer.flatMap((dash, index) => {
      const next = layer[index + 1];
      return [
        dash.length,
        next ? round(next.start - dash.start - dash.length) : FLIGHT_LENGTH,
      ];
    });
    const total = round(pattern.reduce((sum, value) => sum + value, 0));
    // The long final gap holds the layer back until its first dash.
    return { width, dashArray: pattern.join(" "), dashOffset: round(total - layer[0].start) };
  });
}

const TRAIL_LAYERS = buildTrailLayers();

/** The takeoff burst, in pixels from the perch. */
const SPARKLES = [
  { x: -7, y: 14, size: 9, delayMs: 0, spin: 70 },
  { x: 17, y: -9, size: 8, delayMs: 25, spin: -80 },
  { x: 14, y: 12, size: 6, delayMs: 40, spin: -60 },
  { x: 6, y: 18, size: 4, delayMs: 55, spin: -45 },
  { x: -13, y: -14, size: 5, delayMs: 70, spin: 90 },
  { x: -3, y: -20, size: 6, delayMs: 90, spin: 60 },
];

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
        <g
          mask={`url(#${TRAIL_MASK_ID})`}
          stroke="currentColor"
          strokeLinecap="round"
          className="plane-trail"
        >
          {TRAIL_LAYERS.map((layer) => (
            <path
              key={layer.width}
              d={FLIGHT_PATH}
              strokeWidth={layer.width}
              strokeDasharray={layer.dashArray}
              strokeDashoffset={layer.dashOffset}
            />
          ))}
        </g>
      </svg>

      Resend

      <span
        aria-hidden="true"
        className="pointer-events-none absolute left-[75px] top-[7px] text-foreground"
      >
        {SPARKLES.map((sparkle) => (
          <Sparkle key={`${sparkle.x},${sparkle.y}`} {...sparkle} />
        ))}
      </span>

      <span
        aria-hidden="true"
        className="plane-shadow pointer-events-none absolute left-0 top-0 block h-6 w-[30px]"
        style={{ offsetPath: `path("${FLIGHT_PATH}")` }}
      >
        <svg viewBox="0 0 20 16" fill="currentColor" className="plane-shadow-body block size-full">
          <path d="M19.6 8L0.8 0.8L3.2 4.4L5.2 8L3.2 11.6L0.8 15.2Z" />
        </svg>
      </span>

      <span
        aria-hidden="true"
        className="plane absolute left-0 top-0 block h-6 w-[30px]"
        style={{ offsetPath: `path("${FLIGHT_PATH}")` }}
      >
        <span className="plane-body block size-full">
          {/* Real folds in 3D, pointing along +x: a keel, then two creased wings. */}
          <span className="plane-model block size-full">
            <PlaneFace id="keel-left" d="M19.6 8L5.2 8L6 12.8Z" from="--paper-400" to="--paper-500" className="plane-keel-left" />
            <PlaneFace id="keel-right" d="M19.6 8L5.2 8L6 12.8Z" from="--paper-300" to="--paper-400" className="plane-keel-right" />
            <span className="plane-wing plane-wing-left">
              <PlaneFace id="left-inner" d="M19.6 8L3.2 4.4L5.2 8Z" from="--paper-100" to="--paper-300" />
              <PlaneFace id="left-outer" d="M19.6 8L0.8 0.8L3.2 4.4Z" from="--paper-50" to="--paper-200" className="plane-flap-left" />
            </span>
            <span className="plane-wing plane-wing-right">
              <PlaneFace id="right-inner" d="M19.6 8L3.2 11.6L5.2 8Z" from="--paper-300" to="--paper-200" />
              <PlaneFace id="right-outer" d="M19.6 8L0.8 15.2L3.2 11.6Z" from="--paper-200" to="--paper-100" className="plane-flap-right" />
            </span>
          </span>
        </span>
      </span>
    </a>
  );
}

function Sparkle({
  x,
  y,
  size,
  delayMs,
  spin,
}: {
  x: number;
  y: number;
  size: number;
  delayMs: number;
  spin: number;
}) {
  const style = {
    "--sparkle-x": `${x}px`,
    "--sparkle-y": `${y}px`,
    "--sparkle-spin": `${spin}deg`,
    "--sparkle-delay": `${delayMs}ms`,
    width: size,
    height: size,
    left: -size / 2,
    top: -size / 2,
  } as CSSProperties;

  return (
    <span className="plane-sparkle absolute block" style={style}>
      <svg viewBox="0 0 24 24" fill="currentColor" className="plane-twinkle block size-full">
        <path d="M12 0C12.8 7.5 16.5 11.2 24 12C16.5 12.8 12.8 16.5 12 24C11.2 16.5 7.5 12.8 0 12C7.5 11.2 11.2 7.5 12 0Z" />
      </svg>
    </span>
  );
}

function PlaneFace({
  id,
  d,
  from,
  to,
  className = "",
}: {
  id: string;
  d: string;
  from: string;
  to: string;
  className?: string;
}) {
  const gradientId = `plane-paper-${id}`;

  return (
    <svg viewBox="0 0 20 16" className={`plane-face ${className}`}>
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: `var(${from})` }} />
          <stop offset="1" style={{ stopColor: `var(${to})` }} />
        </linearGradient>
      </defs>
      <path
        d={d}
        fill={`url(#${gradientId})`}
        stroke="var(--paper-edge)"
        strokeWidth="0.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
