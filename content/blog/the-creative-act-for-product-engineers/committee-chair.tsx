"use client";

import { useState } from "react";
import { DrawingFooter, Ink, penBox, penCircle, penLine, TextButton, through } from "./sketch";

const CHAIR = [
  ...penBox(110, 120, 90, 11, 3),
  penLine(114, 120, 114, 36, 8),
  penLine(196, 120, 196, 36, 9),
  penLine(114, 42, 196, 42, 10),
  penLine(114, 68, 196, 68, 11),
  penLine(118, 131, 113, 196, 12),
  penLine(192, 131, 197, 196, 13),
];

const CUSHION = [through([[112, 120], [122, 106], [155, 101], [188, 106], [198, 120]])];

const REQUESTS = [
  {
    label: "add wheels?",
    tilt: "-rotate-1",
    paths: [penCircle(112, 203, 8, 8, 21), penCircle(198, 203, 8, 8, 22)],
  },
  {
    label: "cup holder?",
    tilt: "rotate-1",
    paths: [
      penLine(200, 124, 236, 124, 31),
      penLine(226, 124, 222, 98, 32),
      penLine(222, 98, 248, 98, 33),
      penLine(248, 98, 244, 124, 34),
      penLine(238, 98, 245, 80, 35),
    ],
  },
  {
    label: "wings?",
    tilt: "rotate-2",
    paths: [
      through([[196, 54], [234, 22], [288, 18], [266, 42], [278, 50], [250, 62], [258, 74], [196, 72]]),
      through([[114, 54], [78, 22], [24, 18], [46, 42], [34, 50], [62, 62], [54, 74], [114, 72]]),
    ],
  },
  {
    label: "a flag?",
    tilt: "-rotate-2",
    paths: [
      penLine(155, 42, 155, 4, 51),
      through([[155, 5], [168, 8], [182, 12], [168, 18], [155, 22]]),
    ],
  },
  {
    label: "a horn?",
    tilt: "rotate-1",
    paths: [
      penLine(110, 125, 82, 125, 61),
      through([[82, 118], [70, 124], [82, 132]]),
      penLine(82, 118, 82, 132, 62),
      penCircle(60, 125, 10, 10, 63),
    ],
  },
];

export function CommitteeChair() {
  const [added, setAdded] = useState<string[]>([]);
  const [fixed, setFixed] = useState(false);

  function toggle(label: string) {
    setAdded((current) =>
      current.includes(label)
        ? current.filter((item) => item !== label)
        : [...current, label],
    );
  }

  function startOver() {
    setAdded([]);
    setFixed(false);
  }

  return (
    <div>
      <svg viewBox="0 0 310 216" aria-hidden className="mx-auto block h-auto w-full max-w-[310px]">
        <Ink paths={CHAIR} />
        {fixed && <Ink paths={CUSHION} draw />}
        {!fixed &&
          REQUESTS.filter((request) => added.includes(request.label)).map((request) => (
            <Ink key={request.label} paths={request.paths} draw />
          ))}
      </svg>

      {!fixed && (
        <div className="mt-4 flex flex-wrap justify-center gap-2">
          {REQUESTS.map((request) => (
            <button
              key={request.label}
              type="button"
              aria-pressed={added.includes(request.label)}
              onClick={() => toggle(request.label)}
              className={`${request.tilt} border border-border px-2.5 py-1 font-mono text-sm text-foreground transition-transform duration-150 [transition-timing-function:var(--ease-out)] active:scale-[0.97] aria-pressed:bg-foreground aria-pressed:text-background`}
            >
              {request.label}
            </button>
          ))}
        </div>
      )}

      <DrawingFooter>
        <span aria-live="polite">
          {fixed ? "It hurt to sit on." : "Everyone has a request."}
        </span>
        {fixed ? (
          <TextButton onClick={startOver}>start over</TextButton>
        ) : (
          <TextButton onClick={() => setFixed(true)}>what actually hurts?</TextButton>
        )}
      </DrawingFooter>
    </div>
  );
}
