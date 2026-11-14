/** A teacher's pen marks: a tick for the stronger answer, a cross for the other. */
import { Ink, penLine, through } from "@/components/sketch";

const TICK = [through([[4, 12], [8, 16.5], [18, 4]])];
const CROSS = [penLine(5, 5, 17, 17, 3), penLine(17, 5, 5, 17, 4)];

export function Mark({ right }: { right: boolean }) {
  return (
    <svg viewBox="0 0 22 22" aria-hidden className="size-5 shrink-0 text-foreground">
      <Ink paths={right ? TICK : CROSS} width={2} draw />
    </svg>
  );
}

/** Lets excerpts be written as indented template literals in MDX. */
export function dedent(text: string) {
  return text
    .trim()
    .split("\n")
    .map((line) => line.trim())
    .join("\n");
}
