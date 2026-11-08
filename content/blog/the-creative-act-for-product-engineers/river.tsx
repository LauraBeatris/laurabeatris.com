"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import boatImage from "./boat.webp";
import riverDay from "./river-day.webp";
import riverNight from "./river-night.webp";
import { centerAt, headingAt, RIVER_WIDTH, TILE_HEIGHT } from "./river-path";
import wakeImage from "./wake.webp";

/** Only shown when the gutter beside the text is wide enough to hold it. */
const WIDE_ENOUGH = "(min-width: 1100px)";
/** Until the post is measured, tall enough to reach past the first screen. */
const INITIAL_HEIGHT = 6000;
const BOAT_BOX = { width: 100, height: 110 };
const WAKE_BOX = { width: 140, height: 220 };
const RIVER_START = 150;
const RIVER_END_MARGIN = 125;

/** Critically damped, so the boat catches up to the scroll and never overshoots. */
const STIFFNESS = 90;
const DAMPING = 2 * Math.sqrt(STIFFNESS);
const FULL_WAKE_SPEED = 700;

const tile = (src: string) => ({
  backgroundImage: `url(${src})`,
  backgroundRepeat: "repeat-y",
  backgroundSize: `${RIVER_WIDTH}px ${TILE_HEIGHT}px`,
});

export function River() {
  const rootRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const wakeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const boat = boatRef.current;
    const wake = wakeRef.current;
    const article = root?.closest("article");
    if (!boat || !wake || !article) return;

    const wide = window.matchMedia(WIDE_ENOUGH);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    let riverEnd = 0;
    let scrollRange = 1;
    let viewportHeight = 1;
    let y = 0;
    let velocity = 0;
    let frame = 0;
    let lastTime = 0;

    function measure() {
      riverEnd = Math.round(
        article!.getBoundingClientRect().bottom + window.scrollY,
      );
      viewportHeight = window.innerHeight;
      // Before reading the page's height, or the placeholder height inflates it
      root!.style.height = `${riverEnd}px`;
      scrollRange = Math.max(
        document.documentElement.scrollHeight - viewportHeight,
        1,
      );
    }

    /** The boat's place depends only on scroll, so scrolling back retraces it. */
    function targetY() {
      const progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
      const anchored = window.scrollY + viewportHeight * (0.3 + 0.45 * progress);

      return Math.min(
        Math.max(anchored, RIVER_START),
        riverEnd - RIVER_END_MARGIN,
      );
    }

    function draw() {
      const x = centerAt(y) - BOAT_BOX.width / 2;
      const top = y - BOAT_BOX.height / 2;

      boat!.style.transform = `translate3d(${x}px, ${top}px, 0) rotate(${headingAt(y)}deg)`;
      wake!.style.opacity = String(
        Math.min(Math.abs(velocity) / FULL_WAKE_SPEED, 1),
      );
      // Flips at zero speed, while the wake is invisible
      wake!.style.transform = velocity < 0 ? "scaleY(-1)" : "scaleY(1)";
    }

    function snap() {
      y = targetY();
      velocity = 0;
      draw();
    }

    function tick(now: number) {
      const delta = Math.min((now - lastTime) / 1000, 1 / 30);
      const target = targetY();
      lastTime = now;

      velocity += (STIFFNESS * (target - y) - DAMPING * velocity) * delta;
      y += velocity * delta;

      if (Math.abs(target - y) < 0.1 && Math.abs(velocity) < 2) {
        frame = 0;
        snap();

        return;
      }

      draw();
      frame = requestAnimationFrame(tick);
    }

    function handleScroll() {
      if (!wide.matches) return;

      if (reducedMotion.matches) {
        snap();

        return;
      }

      if (frame) return;
      lastTime = performance.now();
      frame = requestAnimationFrame(tick);
    }

    /** Mid-glide the boat just follows the new target instead of teleporting. */
    function handleLayoutChange() {
      measure();
      if (!frame) snap();
    }

    handleLayoutChange();
    boat.style.opacity = "1";

    const observer = new ResizeObserver(handleLayoutChange);
    observer.observe(article);
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleLayoutChange);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleLayoutChange);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 ml-[-536px] hidden select-none overflow-hidden min-[1100px]:block"
      style={{ width: RIVER_WIDTH, height: INITIAL_HEIGHT }}
    >
      {/* Stops short of the end so no sliver shows past the solid part of the fade */}
      <div className="absolute inset-x-0 bottom-2 top-0 dark:hidden" style={tile(riverDay.src)} />
      <div className="absolute inset-x-0 bottom-2 top-0 hidden dark:block" style={tile(riverNight.src)} />

      {/* The river comes out of the page and sinks back into it */}
      <div className="absolute inset-x-0 top-0 h-[130px] bg-gradient-to-b from-background from-30% to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-[110px] bg-gradient-to-t from-background from-30% to-transparent" />

      <div
        ref={boatRef}
        className="absolute left-0 top-0 opacity-0 transition-opacity duration-200 [transition-timing-function:var(--ease-out)] will-change-transform"
        style={BOAT_BOX}
      >
        <div
          ref={wakeRef}
          className="absolute opacity-0 will-change-[opacity,transform]"
          style={{
            ...WAKE_BOX,
            left: (BOAT_BOX.width - WAKE_BOX.width) / 2,
            top: (BOAT_BOX.height - WAKE_BOX.height) / 2,
          }}
        >
          <Image src={wakeImage} alt="" unoptimized draggable={false} />
        </div>
        <Image
          src={boatImage}
          alt=""
          unoptimized
          draggable={false}
          className="absolute inset-0 dark:brightness-[0.72] dark:saturate-[0.8]"
        />
      </div>
    </div>
  );
}
