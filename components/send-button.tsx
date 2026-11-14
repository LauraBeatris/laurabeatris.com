"use client";

import { useEffect, useEffectEvent, useRef, useState } from "react";

export type SendStatus = "idle" | "sending" | "sent" | "failed";

/**
 * What the button is showing. It seals the letter while the request is out,
 * holds the envelope until there's an answer, and only then lets it fly.
 */
type Stage =
  | "idle"
  | "morph"
  | "open"
  | "sealing"
  | "waiting"
  | "plane"
  | "flown";

/** How long each stage holds before the next, in ms. The CSS fits inside these. */
const STAGE_MS = {
  morph: 320,
  open: 300,
  sealing: 460,
  plane: 200,
  flown: 720,
};

type Point = [number, number];

function line(from: Point, to: Point): Point[] {
  const along = (t: number): Point => [
    from[0] + (to[0] - from[0]) * t,
    from[1] + (to[1] - from[1]) * t,
  ];
  return [along(1 / 3), along(2 / 3), to];
}

/** Chains corners into cubic segments, so every outline has the same shape of path. */
function polygon(corners: Point[]): Point[] {
  return [
    corners[0],
    ...corners.flatMap((corner, index) =>
      line(corner, corners[(index + 1) % corners.length]),
    ),
  ];
}

// Drawn around the button's centre, in CSS pixels.
const PILL_X = 41.25;
const PILL_Y = 17.25;
const PILL_FLAT = PILL_X - PILL_Y;
const ARC = PILL_Y * 0.5523;

/**
 * The pill and the open envelope, each as eight cubic segments starting at the
 * top centre and going clockwise. Matching segments are what let one outline
 * become the other point by point.
 */
const PILL: Point[] = [
  [0, -PILL_Y],
  ...line([0, -PILL_Y], [PILL_FLAT, -PILL_Y]),
  [PILL_FLAT + ARC, -PILL_Y],
  [PILL_X, -ARC],
  [PILL_X, 0],
  [PILL_X, ARC],
  [PILL_FLAT + ARC, PILL_Y],
  [PILL_FLAT, PILL_Y],
  ...line([PILL_FLAT, PILL_Y], [0, PILL_Y]),
  ...line([0, PILL_Y], [-PILL_FLAT, PILL_Y]),
  [-PILL_FLAT - ARC, PILL_Y],
  [-PILL_X, ARC],
  [-PILL_X, 0],
  [-PILL_X, -ARC],
  [-PILL_FLAT - ARC, -PILL_Y],
  [-PILL_FLAT, -PILL_Y],
  ...line([-PILL_FLAT, -PILL_Y], [0, -PILL_Y]),
];

const ENVELOPE: Point[] = polygon([
  [0, -14],
  [7, -9.5],
  [14, -5],
  [14, 12],
  [0, 12],
  [-14, 12],
  [-14, -5],
  [-7, -9.5],
]);

function toPath(points: Point[]) {
  const round = (value: number) => Math.round(value * 100) / 100;
  const [start, ...rest] = points.map(([x, y]) => `${round(x)} ${round(y)}`);
  const segments = [];
  for (let index = 0; index < rest.length; index += 3) {
    segments.push(`C${rest.slice(index, index + 3).join(" ")}`);
  }
  return `M${start}${segments.join("")}Z`;
}

const PILL_PATH = toPath(PILL);

/** A CSS cubic-bezier as a function, solved by bisection. */
function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const at = (t: number, a: number, b: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;

  return (x: number) => {
    let low = 0;
    let high = 1;
    for (let step = 0; step < 20; step++) {
      const middle = (low + high) / 2;
      if (at(middle, x1, x2) < x) low = middle;
      else high = middle;
    }
    return at((low + high) / 2, y1, y2);
  };
}

// The same curve the stylesheet uses for things that move across the page
const easeInOut = cubicBezier(0.77, 0, 0.175, 1);

export function SendButton({
  status,
  onSent,
}: {
  status: SendStatus;
  onSent: () => void;
}) {
  const [stage, setStage] = useState<Stage>("idle");
  const outline = useRef<SVGPathElement>(null);
  const notifySent = useEffectEvent(onSent);

  if (status === "sending" && stage === "idle") setStage("morph");
  if ((status === "idle" || status === "failed") && stage !== "idle") {
    setStage("idle");
  }
  // The envelope waits for the answer however long sealing it took
  if (status === "sent" && stage === "waiting") setStage("plane");

  useEffect(() => {
    const path = outline.current;

    if (stage === "idle") {
      path?.setAttribute("d", PILL_PATH);
      return;
    }

    if (stage === "morph") {
      const isReduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      const startedAt = performance.now();
      let frame = 0;

      const draw = (now: number) => {
        const elapsed = isReduced ? 1 : (now - startedAt) / STAGE_MS.morph;
        const progress = easeInOut(Math.min(elapsed, 1));

        path?.setAttribute(
          "d",
          toPath(
            PILL.map(([x, y], index) => [
              x + (ENVELOPE[index][0] - x) * progress,
              y + (ENVELOPE[index][1] - y) * progress,
            ]),
          ),
        );

        if (elapsed < 1) frame = requestAnimationFrame(draw);
      };

      frame = requestAnimationFrame(draw);
      // Frames only draw the outline. A tab in the background gets none, and
      // the send still has to move on.
      const timer = setTimeout(
        () => setStage("open"),
        isReduced ? 0 : STAGE_MS.morph,
      );
      return () => {
        cancelAnimationFrame(frame);
        clearTimeout(timer);
      };
    }

    if (stage === "waiting") return;

    const next: Record<Exclude<Stage, "idle" | "morph" | "waiting">, () => void> = {
      open: () => setStage("sealing"),
      sealing: () => setStage("waiting"),
      plane: () => setStage("flown"),
      flown: () => notifySent(),
    };
    const timer = setTimeout(next[stage], STAGE_MS[stage]);
    return () => clearTimeout(timer);
  }, [stage]);

  const isBusy = stage !== "idle";

  return (
    <button
      type="submit"
      data-stage={stage}
      aria-disabled={isBusy}
      className="send-button relative ml-auto h-9 w-[84px] shrink-0 rounded-full text-foreground outline-none transition-transform duration-[160ms] ease-[var(--ease-out)] after:absolute after:-inset-1.5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background active:scale-[0.97] aria-disabled:pointer-events-none motion-reduce:active:scale-100"
    >
      <svg
        aria-hidden="true"
        viewBox="-42 -18 84 36"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="pointer-events-none absolute inset-0 size-full overflow-visible"
      >
        <path ref={outline} d={PILL_PATH} className="send-outline" />

        <g className="send-envelope">
          <g className="send-envelope-bob">
            <path d="M-14 -5L0 -14L14 -5" className="send-paper send-flap-back" />
            <g className="send-letter">
              <rect x="-9" y="-11" width="18" height="13" rx="1" className="send-paper" />
              <path d="M-5.5 -7.5H1.5" strokeOpacity="0.55" />
            </g>
            <path d="M-14 -5V12H14V-5" className="send-paper" />
            <path
              d="M-14 -5H14M-14 -5L0 1.5L14 -5M-14 12L0 1.5L14 12"
              className="send-folds"
            />
            <path d="M-14 -5L0 -14L14 -5" className="send-paper send-flap-front" />
          </g>
        </g>

        <g className="send-plane">
          <path d="M10 -10L3 10L-1 1L-10 -3Z" className="send-paper" />
          <path d="M10 -10L-1 1" />
          <path d="M-8 8L-10.5 10.5" className="send-dash" />
          <path d="M-3.5 11.5L-5.5 13.5" className="send-dash" />
          <path d="M-13 12.5L-15 14.5" className="send-dash" />
        </g>
      </svg>

      <span className="send-label absolute inset-0 flex items-center justify-center text-[11px] font-medium uppercase tracking-[0.14em]">
        Send
      </span>
      <span
        aria-hidden="true"
        className="send-done absolute inset-y-0 right-0 flex items-center whitespace-nowrap text-sm font-medium"
      >
        Email sent
      </span>
    </button>
  );
}
