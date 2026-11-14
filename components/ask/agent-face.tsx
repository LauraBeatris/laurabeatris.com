import { SIGNATURE_STROKES } from "@/lib/signature-strokes";

export type FaceMood = "idle" | "listening" | "thinking" | "writing";

// The face in my autograph is its last five pen strokes: brow, eye, brow, eye,
// smile. The agent wears it, so it's my own drawing that answers.
const FACE_STROKES = SIGNATURE_STROKES.slice(-5);

export function AgentFace({
  mood,
  className,
}: {
  mood: FaceMood;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="181 87 74 61"
      data-mood={mood}
      className={`agent-face ${className ?? ""}`}
    >
      {FACE_STROKES.map((stroke, index) => {
        const isSmile = index === FACE_STROKES.length - 1;
        const path = (
          <path
            d={stroke.d}
            pathLength={1}
            className="agent-face-stroke pen-draw"
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

        return (
          <g
            key={stroke.d}
            className={isSmile ? "agent-face-smile" : "agent-face-brow"}
          >
            {path}
          </g>
        );
      })}
    </svg>
  );
}
