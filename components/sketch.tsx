/**
 * Shared bits for the post's pen drawings. Lines wobble and overshoot a little
 * like a real pen, and are seeded so the server and client draw the same marks.
 */
import type { ReactNode } from "react";

type Point = readonly [number, number];

function seeded(seed: number) {
  let state = seed * 7919 + 13;

  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (value: number) => Math.round(value * 10) / 10;

/** A smooth curve through every point. */
export function through(points: readonly Point[]) {
  let path = `M${round(points[0][0])} ${round(points[0][1])}`;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(i - 1, 0)];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[Math.min(i + 2, points.length - 1)];

    path += `C${round(p1[0] + (p2[0] - p0[0]) / 6)} ${round(p1[1] + (p2[1] - p0[1]) / 6)} ${round(p2[0] - (p3[0] - p1[0]) / 6)} ${round(p2[1] - (p3[1] - p1[1]) / 6)} ${round(p2[0])} ${round(p2[1])}`;
  }

  return path;
}

export function penLine(x1: number, y1: number, x2: number, y2: number, seed = 1) {
  const random = seeded(seed);
  const length = Math.hypot(x2 - x1, y2 - y1) || 1;
  const ux = (x2 - x1) / length;
  const uy = (y2 - y1) / length;
  const steps = Math.max(2, Math.ceil(length / 26));
  const overshoot = (random() - 0.3) * 1.6;
  const points: Point[] = [];

  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const along = t * length + (i === steps ? overshoot : i === 0 ? -overshoot / 2 : 0);
    const off = (random() - 0.5) * Math.min(1.5, length * 0.03);

    points.push([x1 + ux * along - uy * off, y1 + uy * along + ux * off]);
  }

  return through(points);
}

/** Four separate strokes that cross at the corners, not one closed outline. */
export function penBox(x: number, y: number, width: number, height: number, seed = 1) {
  return [
    penLine(x, y, x + width, y, seed),
    penLine(x + width, y, x + width, y + height, seed + 1),
    penLine(x + width, y + height, x, y + height, seed + 2),
    penLine(x, y + height, x, y, seed + 3),
  ];
}

/** Goes slightly past a full turn, the way a hand closes a circle. */
export function penCircle(cx: number, cy: number, rx: number, ry = rx, seed = 1) {
  const random = seeded(seed);
  const start = random() * Math.PI * 2;
  const steps = 12;
  const points: Point[] = [];

  for (let i = 0; i <= steps; i++) {
    const angle = start + (i / steps) * Math.PI * 2.07;
    const wobble = 1 + (random() - 0.5) * 0.07;

    points.push([cx + Math.cos(angle) * rx * wobble, cy + Math.sin(angle) * ry * wobble]);
  }

  return through(points);
}

type InkProps = {
  paths: readonly string[];
  width?: number;
  /** Draws each stroke in turn, as a pen would, when it first appears. */
  draw?: boolean;
  delay?: number;
};

export function Ink({ paths, width = 1.7, draw = false, delay = 0 }: InkProps) {
  return paths.map((d, index) => (
    <path
      key={d}
      d={d}
      fill="none"
      stroke="currentColor"
      strokeWidth={width}
      strokeLinecap="round"
      strokeLinejoin="round"
      pathLength={draw ? 1 : undefined}
      className={draw ? "pen-draw" : undefined}
      style={draw ? { animationDelay: `${delay + index * 90}ms` } : undefined}
    />
  ));
}

export function DrawingFooter({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 font-mono text-sm text-muted">
      {children}
    </div>
  );
}

type TextButtonProps = {
  onClick: () => void;
  children: ReactNode;
};

export function TextButton({ onClick, children }: TextButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="shrink-0 font-mono text-sm text-foreground underline decoration-border decoration-2 underline-offset-4 transition-transform duration-150 [transition-timing-function:var(--ease-out)] active:scale-[0.97]"
    >
      {children}
    </button>
  );
}
