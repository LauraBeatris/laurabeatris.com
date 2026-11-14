import { SIGNATURE_STROKES } from "@/lib/signature-strokes";

export type FaceMood = "idle" | "listening" | "thinking" | "writing" | "sorry";

// The face in my autograph is its last five pen strokes: brow, eye, brow, eye,
// smile. The agent wears it, so it's my own drawing that answers.
const FACE_STROKES = SIGNATURE_STROKES.slice(-5);

/** The agent's name never appears without saying what it is. */
export function AgentName({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      Laura
      <span className="rounded-md bg-foreground/[0.07] px-1.5 py-0.5 font-mono text-[10px] font-normal uppercase tracking-wider text-foreground/70">
        AI
      </span>
    </span>
  );
}

export function AgentFace({
  mood,
  blinks = false,
  className,
}: {
  mood: FaceMood;
  /** Only one face on the page should blink, or they all blink in step. */
  blinks?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="181 87 74 61"
      data-mood={mood}
      data-blinks={blinks || undefined}
      className={`agent-face ${className ?? ""}`}
    >
      {FACE_STROKES.map((stroke, index) => {
        const isSmile = index === FACE_STROKES.length - 1;
        const path = (
          <path
            key={stroke.d}
            d={stroke.d}
            pathLength={1}
            className="handwriting-stroke pen-draw"
            style={{ animationDelay: `${150 + index * 70}ms` }}
          />
        );

        if (stroke.isEye) {
          // Gaze on the outside, blink on the inside, so neither replaces the other
          return (
            <g key={stroke.d} className="agent-face-gaze">
              <g className="agent-face-eye handwriting-eye">{path}</g>
            </g>
          );
        }

        // Only the brows move; the smile stays put
        return isSmile ? (
          path
        ) : (
          <g key={stroke.d} className="agent-face-brow">
            {path}
          </g>
        );
      })}
    </svg>
  );
}
