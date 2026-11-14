"use client";

import { useRef, useState, type PointerEvent } from "react";
import { DrawingFooter, Ink, penBox, penCircle, penLine, TextButton } from "@/components/sketch";

const WIDTH = 360;
const HEIGHT = 224;
const RUB_TO_ERASE = 70;
const REACH = 27;
const REST = { x: 322, y: 214 };
const SURVIVOR = { x: 180, y: 101 };

const knob = (x: number, y: number, s: number) => [
  penCircle(x, y, 12, 12, s),
  penLine(x, y, x + 6, y - 8, s + 1),
];
const toggle = (x: number, y: number, s: number) => [
  ...penBox(x - 14, y - 7, 28, 14, s),
  penCircle(x + 7, y, 4.5, 4.5, s + 5),
];
const slider = (x: number, y: number, s: number) => [
  penLine(x - 16, y, x + 16, y, s),
  ...penBox(x - 5, y - 8, 9, 16, s + 1),
];
const tiny = (x: number, y: number, s: number) => [
  ...penBox(x - 10, y - 8, 20, 16, s),
  penLine(x - 5, y, x + 5, y, s + 5),
];
const dial = (x: number, y: number, s: number) => [
  penCircle(x, y + 3, 9, 9, s),
  penLine(x - 13, y - 7, x - 10, y - 4, s + 1),
  penLine(x, y - 12, x, y - 9, s + 2),
  penLine(x + 13, y - 7, x + 10, y - 4, s + 3),
];

const LAYOUT = [
  [knob, 92, 48], [tiny, 136, 48], [toggle, 180, 48], [dial, 224, 48], [slider, 268, 48],
  [toggle, 92, 101], [knob, 136, 101], [tiny, 224, 101], [knob, 268, 101],
  [slider, 92, 154], [dial, 136, 154], [tiny, 180, 154], [toggle, 224, 154], [dial, 268, 154],
] as const;

const CONTROLS = LAYOUT.map(([shape, x, y], i) => ({
  x,
  y,
  paths: shape(x, y, 100 + i * 11),
  crumbs: [
    penLine(x - 6, y + 4, x - 3, y + 6, 300 + i),
    penLine(x + 2, y + 6, x + 6, y + 5, 320 + i),
    penLine(x + 8, y, x + 10, y + 3, 340 + i),
  ],
}));

const PANEL = penBox(62, 18, 236, 166, 7);
const BUTTON = penBox(SURVIVOR.x - 24, SURVIVOR.y - 15, 48, 30, 61);
/** A blunt block, with its flat rubbing edge at the pointer. */
const ERASER = [
  penLine(-11, -3, 11, 5, 71),
  penLine(11, 5, 27, -36, 72),
  penLine(27, -36, 5, -44, 73),
  penLine(5, -44, -11, -3, 74),
  penLine(-3, -22, 19, -14, 75),
];

const noRubs = () => CONTROLS.map(() => 0);

export function EraserPanel() {
  const [rubbed, setRubbed] = useState(noRubs);
  const [eraser, setEraser] = useState({ ...REST, active: false });
  const lastPoint = useRef(REST);

  const remaining = rubbed.filter((rub) => rub < RUB_TO_ERASE).length;
  const pushX = eraser.x - SURVIVOR.x;
  const pushY = eraser.y - SURVIVOR.y;
  const distance = Math.hypot(pushX, pushY) || 1;
  const push = eraser.active ? Math.max(0, 38 - distance) * 0.2 : 0;

  function toDrawing(event: PointerEvent<SVGSVGElement>) {
    const box = event.currentTarget.getBoundingClientRect();

    return {
      x: ((event.clientX - box.left) / box.width) * WIDTH,
      y: ((event.clientY - box.top) / box.height) * HEIGHT,
    };
  }

  function handlePointerDown(event: PointerEvent<SVGSVGElement>) {
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = toDrawing(event);

    lastPoint.current = point;
    setEraser({ ...point, active: true });
  }

  function handlePointerMove(event: PointerEvent<SVGSVGElement>) {
    if (!eraser.active) return;

    const point = toDrawing(event);
    const moved = Math.hypot(point.x - lastPoint.current.x, point.y - lastPoint.current.y);

    lastPoint.current = point;
    setEraser({ ...point, active: true });
    setRubbed((current) =>
      current.map((rub, i) =>
        Math.hypot(point.x - CONTROLS[i].x, point.y - CONTROLS[i].y) < REACH
          ? rub + moved
          : rub,
      ),
    );
  }

  function handlePointerEnd() {
    setEraser({ ...REST, active: false });
  }

  function eraseOne() {
    setRubbed((current) => {
      const next = current.findIndex((rub) => rub < RUB_TO_ERASE);

      return current.map((rub, i) => (i === next ? RUB_TO_ERASE : rub));
    });
  }

  return (
    <div>
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        aria-hidden
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        className="mx-auto block h-auto w-full max-w-[360px] cursor-grab touch-pan-y select-none active:cursor-grabbing"
      >
        <Ink paths={PANEL} />

        {CONTROLS.map((control, i) => {
          const gone = rubbed[i] >= RUB_TO_ERASE;

          return (
            <g key={`${control.x}-${control.y}`}>
              {!gone && (
                <g style={{ opacity: 1 - rubbed[i] / RUB_TO_ERASE }}>
                  <Ink paths={control.paths} width={1.4} />
                </g>
              )}
              {gone && (
                <g className="pen-crumbs">
                  <Ink paths={control.crumbs} width={1.2} />
                </g>
              )}
            </g>
          );
        })}

        <g
          className="transition-transform duration-200 [transition-timing-function:var(--ease-out)]"
          style={{
            transform: `translate(${(-pushX / distance) * push}px, ${(-pushY / distance) * push}px)`,
          }}
        >
          <Ink paths={BUTTON} />
          <text
            x={SURVIVOR.x}
            y={SURVIVOR.y + 4}
            textAnchor="middle"
            className="fill-foreground font-mono text-[11px]"
          >
            ship
          </text>
        </g>

        <g
          className={
            eraser.active
              ? undefined
              : "transition-transform duration-200 [transition-timing-function:var(--ease-out)]"
          }
          style={{ transform: `translate(${eraser.x}px, ${eraser.y}px)` }}
        >
          <Ink paths={ERASER} />
        </g>
      </svg>

      <DrawingFooter>
        <span aria-live="polite">
          {remaining ? "Rub it out with the eraser." : "That one stays."}
        </span>
        {remaining ? (
          <TextButton onClick={eraseOne}>erase one</TextButton>
        ) : (
          <TextButton onClick={() => setRubbed(noRubs())}>put it all back</TextButton>
        )}
      </DrawingFooter>
    </div>
  );
}
