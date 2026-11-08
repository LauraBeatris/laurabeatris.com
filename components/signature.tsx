"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The centerline of the handwritten signature, one path per pen-down, in the
 * order it was written. Each `easing` is that stroke's pen speed: slower
 * through tight curves and reversals, faster along the straights.
 */
const STROKES = [
  {
    d: "M47.1 15.4C51.3 9.3 66.6 -2.1 70.8 9.6C71.7 12.1 72.3 14.9 71.5 17.5C67.9 30.8 53 46.2 44.1 56.5C35.4 66.5 26.4 76.2 17.7 86.2C15.9 88.4 14.7 91.2 13 93.6C10.7 96.8 7.3 99.8 4.3 102.4C7 100.1 9.3 97.3 12 95C14.3 93 17.2 91.7 19.6 89.9C25.3 85.7 37.4 74.4 44.7 75.3C49.2 75.8 51.1 83.9 53.4 87.2C55.3 89.7 57.6 91.5 60.2 93.2C62.9 94.8 65.5 96.5 68.7 96.6C76.4 96.8 95.7 84.7 102.5 80.1C109.5 75.4 117.2 67.9 122.8 61.6C130.7 52.8 137.4 42.6 143.9 32.7C146.1 29.4 149 26 150.1 22.1C150.6 20.4 150.5 18.4 149.1 17.2C148.2 16.3 146.9 16.1 145.6 16.3C141.1 16.9 132.8 21.4 128.7 23.8C123.4 26.8 118.5 30.6 113.5 34.1C105.9 39.2 96.6 44.4 90.6 51.4C86.7 55.8 87.5 61.3 94.3 60.3",
    delayMs: 120,
    durationMs: 865,
    easing:
      "linear(0,0.023,0.053,0.078,0.109,0.155,0.194,0.244,0.289,0.329,0.345,0.38,0.425,0.455,0.483,0.519,0.55,0.595,0.641,0.681,0.722,0.767,0.801,0.825,0.876,0.925,0.969,0.988,1)",
  },
  {
    d: "M171.9 27.8C171.4 31.3 169.7 34.1 168.3 37.3C158.1 60.2 140.9 77.5 124.6 95.9C122.4 98.3 119.1 99.8 117.2 102.4C116.2 103.7 116.5 105.2 116.8 106.8C115.7 101.3 119.1 95.2 121.1 90.2C128.3 72.1 143.1 54.1 158.2 41.8C161.6 39 165.3 36.7 168.8 34.1C170.6 32.8 171.7 30.9 173.6 29.7C180.5 25.1 188.1 21.9 195.4 18C203.2 13.8 211.2 10.4 219.5 7.6C221.6 6.8 223.7 5.9 225.9 5.5C240.1 3 236.2 12.1 229.4 18.7C227.1 20.9 224.5 22.8 222.2 25C219.8 27.2 217.7 29.6 215.2 31.6C206.4 38.4 196.8 44.2 187.6 50.5C185.3 52.1 183.5 54.2 181.2 55.7C176.3 59 167.2 61.3 163.4 65.8C165.8 62.9 176.7 57.4 180.5 56.4C182.8 55.8 185.4 56 187.8 55.6C190.8 55.3 193.8 54.4 196.8 54C199.5 53.6 202.4 53.7 205.2 53.5C208.4 53.3 211.4 53.6 214.4 54.9C217.5 56.2 219.6 58.6 220.3 61.9C221.9 68.9 215.4 73.2 211 77.2C206.7 81.1 202.7 84.9 198 88.1C194.3 90.7 190.2 92.6 186.4 94.9C175.5 101.2 163.4 108.1 151.4 112.3C150 112.8 148.4 112.9 147 113.4C143.1 114.6 139.6 116.2 135.4 116C132.4 115.8 129.2 114.2 127 116.8",
    delayMs: 1135,
    durationMs: 1035,
    easing:
      "linear(0,0.026,0.069,0.121,0.167,0.181,0.192,0.233,0.276,0.322,0.361,0.4,0.442,0.483,0.504,0.551,0.6,0.641,0.668,0.681,0.722,0.764,0.789,0.817,0.857,0.905,0.953,0.988,1)",
  },
  {
    d: "M188.4 113Q191.6 110.8 194.8 109.5",
    delayMs: 2330,
    durationMs: 60,
    easing:
      "linear",
  },
  {
    d: "M201.6 122.3a1.8 1.8 0 1 1 -3.6 0a1.8 1.8 0 1 1 3.6 0",
    isEye: true,
    delayMs: 2435,
    durationMs: 80,
    easing:
      "linear",
  },
  {
    d: "M211.6 98.9Q215.9 95.6 220.2 93",
    delayMs: 2560,
    durationMs: 60,
    easing:
      "linear",
  },
  {
    d: "M219.8 110.3a1.8 1.8 0 1 1 -3.6 0a1.8 1.8 0 1 1 3.6 0",
    isEye: true,
    delayMs: 2665,
    durationMs: 80,
    easing:
      "linear",
  },
  {
    d: "M187.2 139.8C212.5 146.1 240.8 130.4 248.8 105.6",
    delayMs: 2815,
    durationMs: 300,
    easing:
      "linear(0,0.028,0.07,0.145,0.233,0.322,0.411,0.502,0.592,0.682,0.771,0.859,0.932,0.972,1)",
  },
];

export function Signature({ className }: { className: string }) {
  const ref = useRef<SVGSVGElement>(null);
  const [isWriting, setIsWriting] = useState(false);

  useEffect(() => {
    const svg = ref.current;
    if (!svg) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setIsWriting(true);
      },
      { threshold: 0.6 },
    );
    observer.observe(svg);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <svg
        ref={ref}
        aria-hidden
        viewBox="0 0 257.1 145.5"
        data-writing={isWriting}
        className={`handwriting ${className}`}
      >
        {STROKES.map((stroke) => {
          const path = (
            <path
              key={stroke.d}
              d={stroke.d}
              pathLength={1}
              className="handwriting-stroke"
              style={{
                animationDelay: `${stroke.delayMs}ms`,
                animationDuration: `${stroke.durationMs}ms`,
                animationTimingFunction: stroke.easing,
              }}
            />
          );
          // The blink lives on a wrapper so it can't replace the draw animation
          return stroke.isEye ? (
            <g key={stroke.d} className="handwriting-eye">
              {path}
            </g>
          ) : (
            path
          );
        })}
        {/* Invisible hover target over the whole face: the strokes are too thin */}
        <circle cx={217} cy={117} r={38} className="handwriting-face" />
      </svg>
      <noscript className="hidden">
        <style>{`.handwriting{opacity:1}.handwriting-stroke{stroke-dashoffset:0}`}</style>
      </noscript>
    </>
  );
}
