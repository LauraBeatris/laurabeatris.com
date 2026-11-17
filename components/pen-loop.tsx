/**
 * A loop of pen around a couple of words: how you'd mark the one line on a page
 * someone shouldn't miss. Drawn once and stretched to whatever it circles, and
 * placed by `.ask-me-loop` in globals.css.
 */
export function PenLoop({
  scalesWithWords = false,
  className,
}: {
  /**
   * Around small text the stroke keeps its weight however far it's stretched.
   * Around a title it's scaled up almost evenly, so the weight scales with it.
   */
  scalesWithWords?: boolean;
  className?: string;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 40"
      preserveAspectRatio="none"
      className={`ask-me-loop ${className ?? ""}`}
    >
      <path
        d="M86 5C68 0 24 1 9 9C-3 16 2 32 22 36C45 40 83 38 95 28C103 20 96 8 74 4C64 2 54 2 46 4"
        pathLength={1}
        vectorEffect={scalesWithWords ? undefined : "non-scaling-stroke"}
      />
    </svg>
  );
}
