"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { buildScene, centerAt, headingAt, RIVER_TOP, RIVER_WIDTH } from "./river-scene";

/** Only drawn when the gutter beside the text is wide enough to hold it. */
const WIDE_ENOUGH = "(min-width: 1100px)";
const INITIAL_HEIGHT = 6000;
const BOAT_BOX = { width: 100, height: 110 };

/** Critically damped, so the boat catches up to the scroll and never overshoots. */
const STIFFNESS = 90;
const DAMPING = 2 * Math.sqrt(STIFFNESS);
const FULL_WAKE_SPEED = 700;

export function River() {
  const rootRef = useRef<HTMLDivElement>(null);
  const boatRef = useRef<HTMLDivElement>(null);
  const wakeRef = useRef<SVGSVGElement>(null);
  const [height, setHeight] = useState(INITIAL_HEIGHT);
  const scene = useMemo(() => buildScene(height), [height]);

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
      setHeight(riverEnd);
    }

    /** The boat's place depends only on scroll, so scrolling back retraces it. */
    function targetY() {
      const progress = Math.min(Math.max(window.scrollY / scrollRange, 0), 1);
      const anchored = window.scrollY + viewportHeight * (0.3 + 0.45 * progress);

      return Math.min(Math.max(anchored, RIVER_TOP + 110), riverEnd - 125);
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
      className="river pointer-events-none absolute left-1/2 top-0 ml-[-536px] hidden select-none overflow-hidden min-[1100px]:block"
      style={{ width: RIVER_WIDTH, height }}
    >
      <svg width={RIVER_WIDTH} height={height} className="absolute inset-0">
        <defs>
          <clipPath id="river-water">
            <path d={scene.water} />
          </clipPath>
          {/* Sesame speckle: the grain a woodblock leaves in flat color */}
          <pattern id="river-grain" width="46" height="46" patternUnits="userSpaceOnUse">
            <g className="river-grain">
              <circle cx="4" cy="7" r="0.7" />
              <circle cx="17" cy="3" r="0.5" />
              <circle cx="31" cy="11" r="0.8" />
              <circle cx="42" cy="4" r="0.5" />
              <circle cx="11" cy="20" r="0.6" />
              <circle cx="25" cy="25" r="0.5" />
              <circle cx="38" cy="22" r="0.7" />
              <circle cx="6" cy="35" r="0.5" />
              <circle cx="19" cy="40" r="0.8" />
              <circle cx="34" cy="38" r="0.5" />
            </g>
          </pattern>
          <linearGradient id="river-fade-top" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.3" className="river-fade-solid" />
            <stop offset="1" className="river-fade-clear" />
          </linearGradient>
          <linearGradient id="river-fade-bottom" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" className="river-fade-clear" />
            <stop offset="0.7" className="river-fade-solid" />
          </linearGradient>
        </defs>

        <path d={scene.water} className="river-water" />
        {/* Flat bands that deepen toward the banks, the way a print grades color */}
        <g clipPath="url(#river-water)" fill="none" strokeLinecap="round">
          <path d={scene.leftBank} className="river-band-wide" />
          <path d={scene.rightBank} className="river-band-wide" />
          <path d={scene.leftBank} className="river-band-narrow" />
          <path d={scene.rightBank} className="river-band-narrow" />
          <rect width={RIVER_WIDTH} height={height} fill="url(#river-grain)" />
        </g>

        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d={scene.currents} className="river-foam" strokeWidth="1.2" />
          <path d={scene.eddies} className="river-foam" strokeWidth="1" />
          <path d={scene.ticks} className="river-tick" strokeWidth="1.3" />
        </g>
        <path d={scene.petals} className="river-petal" />

        <path d={scene.leftBrush} className="river-ink-fill" />
        <path d={scene.rightBrush} className="river-ink-fill" />

        {scene.rocks.map((rock) => (
          <g key={rock.anchor.join()} transform={rock.transform}>
            <path d={rock.fill} className="river-rock" />
            <path
              d={rock.ink}
              className="river-ink-line"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        ))}

        <rect width={RIVER_WIDTH} height="130" fill="url(#river-fade-top)" />
        {/* Runs past the water's edge so no sliver of it shows at the end */}
        <rect y={height - 110} width={RIVER_WIDTH} height="114" fill="url(#river-fade-bottom)" />
      </svg>

      <div
        ref={boatRef}
        className="absolute left-0 top-0 opacity-0 transition-opacity duration-200 [transition-timing-function:var(--ease-out)] will-change-transform"
        style={BOAT_BOX}
      >
        <svg
          ref={wakeRef}
          viewBox="-50 -55 100 110"
          className="absolute inset-0 overflow-visible opacity-0 will-change-[opacity,transform]"
        >
          <g className="river-wake" fill="none" strokeLinecap="round" strokeWidth="1.4">
            <path d="M-7-37C-12-52-17-62-25-76" />
            <path d="M7-37C12-52 17-62 25-76" />
            <path d="M-13-44c-3-5-6-8-11-11M13-44c3-5 6-8 11-11" />
            <ellipse cx="0" cy="-50" rx="5" ry="2.4" />
            <ellipse cx="1" cy="-64" rx="7.5" ry="3.2" />
            <ellipse cx="-1" cy="-80" rx="10" ry="4" />
          </g>
        </svg>

        {/* Traced from the paper sketch, then turned so its long axis is upright */}
        <svg viewBox="-50 -55 100 110" className="absolute inset-0 overflow-visible">
          <g transform="rotate(-17.4) scale(0.114) translate(-215 -400)">
            <path d="M290 155L335 385L285 570L115 735L95 490L130 385Z" className="river-hull" />
            <path d="M325 65L160 200L225 245L290 155Z" className="river-flag" />
            <path
              className="river-boat-line"
              strokeWidth="13"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M325 65C260 105 205 150 160 200L225 245M325 65L300 160L335 375M335 395L308 480L270 568M290 155L230 240L135 380L95 490M95 490L105 640L115 735L200 650L285 570M170 290L155 460L175 470M235 245L230 395M290 160L260 260M170 575L180 470C195 440 225 410 240 402C270 375 295 355 320 345M205 550L290 410"
            />
          </g>
        </svg>
      </div>
    </div>
  );
}
