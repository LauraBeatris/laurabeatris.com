"use client";

import { useEffect, useState } from "react";

/** The page's background in each theme. Matches themeColor in app/layout.tsx. */
const STATUS_BAR = { light: "#ffffff", dark: "#121212" };

/**
 * The phone's status bar follows the OS theme on its own. When the site's own
 * choice differs, both tags are pointed at the theme actually on screen.
 */
function paintStatusBar(isDark: boolean) {
  const color = isDark ? STATUS_BAR.dark : STATUS_BAR.light;
  document
    .querySelectorAll('meta[name="theme-color"]')
    .forEach((tag) => tag.setAttribute("content", color));
}

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const dark = document.documentElement.classList.contains("dark");
    setMounted(true);
    setIsDark(dark);
    paintStatusBar(dark);
  }, []);

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    document.documentElement.classList.toggle("dark", next);
    paintStatusBar(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {}
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className="relative inline-flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted transition-[color,transform] duration-[160ms] ease-[var(--ease-out)] hover:text-foreground after:absolute after:-inset-1.5 active:scale-95 motion-reduce:active:scale-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {/* Avoid an icon flash before we know the theme */}
      <span className={mounted ? "" : "opacity-0"}>
        {isDark ? (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          </svg>
        ) : (
          <svg
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
    </button>
  );
}
