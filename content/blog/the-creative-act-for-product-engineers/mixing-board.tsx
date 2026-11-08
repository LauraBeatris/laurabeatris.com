"use client";

import { useMemo, useState } from "react";
import { DrawingFooter, Ink, penBox, penLine, through } from "./sketch";

const WIDTH = 360;
const HEIGHT = 200;
const TRACK_TOP = 34;
const TRACK_BOTTOM = 150;
const CODE_X = 58;
const TASTE_X = 122;

const BOARD = penBox(16, 12, 150, 176, 3);
const TRACKS = [
  penLine(CODE_X, TRACK_TOP, CODE_X, TRACK_BOTTOM, 9),
  penLine(TASTE_X, TRACK_TOP, TASTE_X, TRACK_BOTTOM, 10),
];
const TICKS = Array.from({ length: 5 }, (_, i) => {
  const y = TRACK_TOP + (i * (TRACK_BOTTOM - TRACK_TOP)) / 4;

  return [
    penLine(CODE_X + 18, y, CODE_X + 25, y, 20 + i),
    penLine(TASTE_X + 18, y, TASTE_X + 25, y, 30 + i),
  ];
}).flat();

/** Fixed, so the scribble is the same tangle for every reader. */
const NOISE = Array.from({ length: 53 }, (_, i) => [
  Math.sin(i * 12.9898) * 43758.5453,
  Math.sin(i * 78.233) * 12543.1234,
]).map(([a, b]) => [a - Math.floor(a) - 0.5, b - Math.floor(b) - 0.5]);

function soundWave(taste: number) {
  const mess = (1 - taste) ** 1.25;

  return through(
    NOISE.map(([a, b], i) => {
      const x = 192 + i * 3;

      return [
        x + b * 34 * mess,
        100 + Math.sin(i * 0.36) * 24 + a * 112 * mess,
      ] as const;
    }),
  );
}

function FaderCap({ x, y, seed }: { x: number; y: number; seed: number }) {
  return (
    <g className="fader-cap">
      <rect x={x - 14} y={y - 7} width={28} height={14} fill="hsl(var(--background))" />
      <Ink paths={penBox(x - 14, y - 7, 28, 14, seed)} />
      <Ink paths={[penLine(x - 8, y, x + 8, y, seed + 7)]} width={1.2} />
    </g>
  );
}

export function MixingBoard() {
  const [taste, setTaste] = useState(6);
  const wave = useMemo(() => soundWave(taste / 100), [taste]);
  const tasteY = TRACK_BOTTOM - (taste / 100) * (TRACK_BOTTOM - TRACK_TOP);

  return (
    <div>
      <div className="relative mx-auto max-w-[360px]">
        <input
          type="range"
          aria-label="Taste"
          min={0}
          max={100}
          value={taste}
          onChange={(event) => setTaste(Number(event.target.value))}
          className="peer absolute z-10 cursor-grab touch-none opacity-0 active:cursor-grabbing"
          style={{
            writingMode: "vertical-lr",
            direction: "rtl",
            left: `${((TASTE_X - 20) / WIDTH) * 100}%`,
            width: `${(40 / WIDTH) * 100}%`,
            top: `${((TRACK_TOP - 8) / HEIGHT) * 100}%`,
            height: `${((TRACK_BOTTOM - TRACK_TOP + 16) / HEIGHT) * 100}%`,
          }}
        />
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          aria-hidden
          className="block h-auto w-full peer-focus-visible:[&_.fader-focus]:opacity-100"
        >
          <Ink paths={BOARD} />
          <Ink paths={TRACKS} />
          <Ink paths={TICKS} width={1.1} />
          <FaderCap x={CODE_X} y={TRACK_TOP} seed={41} />
          <FaderCap x={TASTE_X} y={tasteY} seed={51} />
          <circle
            className="fader-focus opacity-0"
            cx={TASTE_X}
            cy={tasteY}
            r={20}
            fill="none"
            stroke="currentColor"
            strokeWidth={1}
            strokeDasharray="3 3"
          />
          <g className="fill-muted font-mono text-[11px]" textAnchor="middle">
            <text x={CODE_X} y={174}>code</text>
            <text x={TASTE_X} y={174}>taste</text>
          </g>
          <Ink paths={[wave]} width={1.5} />
        </svg>
      </div>
      <DrawingFooter>
        <span>Drag taste up.</span>
      </DrawingFooter>
    </div>
  );
}
