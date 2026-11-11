"use client";

import { useEffect, useRef, useState } from "react";
import { SIGNATURE_STROKES } from "@/lib/signature-strokes";

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
        {SIGNATURE_STROKES.map((stroke) => {
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
      </svg>
      <noscript className="hidden">
        <style>{`.handwriting{opacity:1}.handwriting-stroke{stroke-dashoffset:0}`}</style>
      </noscript>
    </>
  );
}
