"use client";

import { useState } from "react";
import { DrawingFooter, Ink, penCircle, penLine, TextButton, through } from "@/components/sketch";

const WIDTH = 360;
const HEIGHT = 150;
const SOIL = 122;
const SEEDS = 7;
const seedX = (i: number) => (WIDTH / SEEDS) * (i + 0.5);

type Outcome = "waiting" | "sprouted" | "nothing";

const SOIL_LINES = [
  penLine(10, SOIL, WIDTH - 10, SOIL, 5),
  penLine(44, SOIL + 8, 58, SOIL + 8, 6),
  penLine(150, SOIL + 10, 170, SOIL + 10, 7),
  penLine(262, SOIL + 8, 280, SOIL + 8, 8),
];

/** Three plants of different ambition, each listed stroke by stroke. */
function plant(x: number, kind: number, seed: number) {
  const base = SOIL - 2;

  if (kind === 0) {
    return [
      through([[x, base], [x + 1, base - 16], [x - 1, base - 34]]),
      through([[x - 1, base - 34], [x - 12, base - 42], [x - 18, base - 38]]),
      through([[x - 1, base - 34], [x + 10, base - 44], [x + 17, base - 41]]),
    ];
  }

  if (kind === 1) {
    return [
      through([[x, base], [x - 2, base - 30], [x + 2, base - 66]]),
      through([[x - 1, base - 22], [x - 14, base - 32], [x - 19, base - 26]]),
      through([[x - 1, base - 36], [x + 13, base - 46], [x + 19, base - 40]]),
      through([[x + 1, base - 52], [x - 11, base - 64], [x - 17, base - 58]]),
      through([[x + 2, base - 66], [x + 9, base - 78], [x + 15, base - 74]]),
    ];
  }

  return [
    through([[x, base], [x + 2, base - 40], [x - 1, base - 84]]),
    through([[x + 1, base - 24], [x + 14, base - 36], [x + 20, base - 30]]),
    through([[x + 1, base - 44], [x - 13, base - 54], [x - 19, base - 48]]),
    penCircle(x - 1, base - 92, 6.5, 6.5, seed),
    through([[x - 1, base - 99], [x - 4, base - 106], [x + 3, base - 106], [x - 1, base - 99]]),
    through([[x + 6, base - 93], [x + 14, base - 96], [x + 13, base - 89], [x + 6, base - 92]]),
    through([[x - 8, base - 93], [x - 16, base - 96], [x - 15, base - 89], [x - 8, base - 92]]),
  ];
}

const PLANTS = Array.from({ length: SEEDS }, (_, i) => plant(seedX(i), i % 3, 40 + i));
const SEED_SHAPES = Array.from({ length: SEEDS }, (_, i) =>
  penCircle(seedX(i), SOIL - 5, 7, 4.5, 20 + i),
);

const unplanted = () => Array<Outcome>(SEEDS).fill("waiting");

export function SeedRow() {
  const [outcomes, setOutcomes] = useState(unplanted);
  const allPlanted = outcomes.every((outcome) => outcome !== "waiting");

  function plantSeed(index: number) {
    const outcome: Outcome = Math.random() < 0.55 ? "sprouted" : "nothing";

    setOutcomes((current) =>
      current.map((value, i) => (i === index && value === "waiting" ? outcome : value)),
    );
  }

  return (
    <div>
      <div className="relative mx-auto max-w-[360px]">
        <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden className="block h-auto w-full">
          <Ink paths={SOIL_LINES} />
          {outcomes.map((outcome, i) => (
            <g key={seedX(i)}>
              {outcome === "nothing" && (
                <ellipse
                  cx={seedX(i)}
                  cy={SOIL - 5}
                  rx={6.5}
                  ry={4}
                  fill="currentColor"
                  className="pen-appear"
                />
              )}
              {outcome !== "sprouted" && <Ink paths={[SEED_SHAPES[i]]} />}
              {outcome === "sprouted" && <Ink paths={PLANTS[i]} width={1.5} draw />}
            </g>
          ))}
        </svg>
        <div className="absolute inset-0 flex">
          {outcomes.map((outcome, i) => (
            <button
              key={seedX(i)}
              type="button"
              aria-label={`Plant seed ${i + 1}`}
              disabled={outcome !== "waiting"}
              onClick={() => plantSeed(i)}
              className="flex-1 cursor-pointer disabled:cursor-default"
            />
          ))}
        </div>
      </div>
      <DrawingFooter>
        <span aria-live="polite">
          {allPlanted ? "No way to tell beforehand." : "Tap a seed."}
        </span>
        {allPlanted && <TextButton onClick={() => setOutcomes(unplanted())}>plant again</TextButton>}
      </DrawingFooter>
    </div>
  );
}
