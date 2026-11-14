"use client";

import { useEffect, useState } from "react";
import { accentChain } from "glimm";
import { GlimmProvider } from "glimm/next";

// The site's own greys (globals.css), so the sweep reads as ink crossing paper
const inkOnPaper = accentChain([
  "#1a1a1a", // --foreground, hsl(0 0% 10%)
  "#616161", // --accent, hsl(0 0% 38%)
  "#707070", // --muted, hsl(0 0% 44%)
]);

const chalkOnSlate = accentChain([
  "#f2f2f2", // dark --foreground, hsl(0 0% 95%)
  "#b8b8b8", // dark --accent, hsl(0 0% 72%)
  "#949494", // dark --muted, hsl(0 0% 58%)
]);

export function PageTransitions({ children }: { children: React.ReactNode }) {
  const [isDark, setIsDark] = useState(false);

  // The theme is a class on <html> that ThemeToggle flips, so follow it live
  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains("dark"));
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <GlimmProvider
      palette={isDark ? chalkOnSlate : inkOnPaper}
      brightness={isDark ? 0.85 : 1}
    >
      {children}
    </GlimmProvider>
  );
}
