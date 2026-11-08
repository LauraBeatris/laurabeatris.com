/**
 * The river's course, shared by the boat and the script that paints the river.
 * Every curve repeats exactly once per tile, so the painting tiles seamlessly.
 */
export const RIVER_WIDTH = 240;
export const TILE_HEIGHT = 1600;
/** Measured across the current, so the width stays even through the bends. */
export const HALF_WIDTH = 52;

const CENTER = 104;
const BENDS = [
  { waves: 2, amplitude: 20, phase: 0.4 },
  { waves: 1, amplitude: 6, phase: 1.9 },
  { waves: 3, amplitude: 3, phase: 4.2 },
];

export function centerAt(y: number) {
  return BENDS.reduce(
    (x, { waves, amplitude, phase }) =>
      x +
      amplitude * Math.sin((y / TILE_HEIGHT) * waves * Math.PI * 2 + phase),
    CENTER,
  );
}

export function slopeAt(y: number) {
  return BENDS.reduce((slope, { waves, amplitude, phase }) => {
    const frequency = (waves * Math.PI * 2) / TILE_HEIGHT;

    return slope + amplitude * frequency * Math.cos(y * frequency + phase);
  }, 0);
}

/** The boat's rotation in degrees so it points along the river at `y`. */
export function headingAt(y: number) {
  return (-Math.atan(slopeAt(y)) * 180) / Math.PI;
}
