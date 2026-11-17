import type { ReactNode } from "react";
import { penLine } from "@/components/sketch";

/**
 * Words that ask a question when pressed. On this page a pen mark means "you
 * can ask this": the pen that circles "Ask me" on the home page underlines each
 * one here, with a slightly different stroke every time, the way a hand would.
 */
export function AskLink({
  onClick,
  disabled = false,
  index = 0,
  delay = 0,
  label,
  className,
  children,
}: {
  onClick: () => void;
  disabled?: boolean;
  /** Where this sits among its neighbours: sets its stroke and when it's drawn. */
  index?: number;
  /** Milliseconds before the first underline of the group is drawn. */
  delay?: number;
  /** For when the words alone don't say what pressing them asks. */
  label?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
      className={`ask-link ask-hit relative rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background ${className ?? ""}`}
    >
      {/* The stroke hangs off the words themselves, whatever room the button
          around them takes up */}
      <span className="ask-link-words">
        {children}
        <svg
          aria-hidden
          viewBox="0 0 100 4"
          preserveAspectRatio="none"
          className="ask-link-line"
          style={{ animationDelay: `${delay + index * 70}ms` }}
        >
          <path
            d={penLine(1, 2, 99, 2, index + 1)}
            vectorEffect="non-scaling-stroke"
          />
        </svg>
      </span>
    </button>
  );
}
