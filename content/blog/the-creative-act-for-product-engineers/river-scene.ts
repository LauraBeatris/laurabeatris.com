/**
 * The river's static drawing. Bank shapes are measured from the red pen lines
 * on the post screenshot, in that screenshot's pixels. Everything else is
 * derived from them, seeded so the server and client draw the same river.
 */
const SCREENSHOT_SCALE = 1.267;
const SCREENSHOT_CONTENT_LEFT = 335;
const KNOT_GAP = 50;

/** Width of the river's box, which ends where the post's text starts. */
export const RIVER_WIDTH = 240;
export const RIVER_TOP = 40;

const LEFT_BANK = [
  118.1, 99.2, 87.7, 85.5, 89.3, 103, 117.8, 124.5, 122, 105.2, 101, 87.6, 93.1,
  105.3, 122.3, 130.1, 128.3, 118.3, 103.3, 93.2, 93.3, 118.3, 141.1, 148.6,
  157.8, 145.3, 113.6, 105.7, 112.6, 129.3, 126.4, 115.9, 96.4, 70.3, 62, 77.7,
  91.4, 93.3, 90.2,
];
const LEFT_BANK_START = 50;

const RIGHT_BANK = [
  243.9, 237.2, 233.2, 234.6, 243.3, 251.2, 253.9, 251.8, 242.6, 231.6, 224.2,
  220.6, 218, 224.1, 238.8, 252.6, 255.3, 247.9, 225.9, 206.3, 206.9, 220.4,
  235.5, 253.4, 268.7, 266.2, 251.4, 234.5, 227, 227, 227, 230.1, 221.5, 194.8,
  187, 192.4, 200, 206.1,
];
const RIGHT_BANK_START = 86;

/** The drawing is shorter than a post, so past its end it runs back and forth. */
const FOLD_START = 200;
const FOLD_END = 1780;

function unfold(screenshotY: number) {
  if (screenshotY <= FOLD_END) return screenshotY;

  const span = FOLD_END - FOLD_START;
  const offset = (screenshotY - FOLD_END) % (span * 2);

  return offset < span ? FOLD_END - offset : FOLD_START + offset - span;
}

function catmullRom(knots: number[], start: number, y: number) {
  const position = Math.min(
    Math.max((y - start) / KNOT_GAP, 0),
    knots.length - 1,
  );
  const index = Math.min(Math.floor(position), knots.length - 2);
  const t = position - index;
  const p0 = knots[Math.max(index - 1, 0)];
  const p1 = knots[index];
  const p2 = knots[index + 1];
  const p3 = knots[Math.min(index + 2, knots.length - 1)];

  return (
    0.5 *
    (2 * p1 +
      (p2 - p0) * t +
      (2 * p0 - 5 * p1 + 4 * p2 - p3) * t * t +
      (3 * p1 - p0 - 3 * p2 + p3) * t * t * t)
  );
}

function toRiverX(screenshotX: number) {
  return (
    (screenshotX - SCREENSHOT_CONTENT_LEFT) / SCREENSHOT_SCALE + RIVER_WIDTH
  );
}

function leftBankAt(y: number) {
  const source = unfold(y * SCREENSHOT_SCALE);

  return toRiverX(catmullRom(LEFT_BANK, LEFT_BANK_START, source));
}

function rightBankAt(y: number) {
  const source = unfold(y * SCREENSHOT_SCALE);

  return toRiverX(catmullRom(RIGHT_BANK, RIGHT_BANK_START, source));
}

export function centerAt(y: number) {
  return (leftBankAt(y) + rightBankAt(y)) / 2;
}

/** The boat's rotation in degrees so it points along the river at `y`. */
export function headingAt(y: number) {
  const reach = 30;
  const degrees =
    (-Math.atan2(centerAt(y + reach) - centerAt(y - reach), reach * 2) * 180) /
    Math.PI;

  return Math.max(-35, Math.min(35, degrees));
}

function seededRandom(seed: number) {
  let state = seed;

  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;

    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const round = (value: number) => Math.round(value * 10) / 10;
const STEP = 10;

function range(from: number, to: number, step: number) {
  const values: number[] = [];

  for (let value = from; value < to; value += step) values.push(value);
  values.push(to);

  return values;
}

function line(points: [number, number][]) {
  return points
    .map(([x, y], index) => `${index ? "L" : "M"}${round(x)} ${round(y)}`)
    .join("");
}

/** A closed ribbon around a bank, so the line swells and thins like a brush. */
function brushLine(bankAt: (y: number) => number, end: number, seed: number) {
  const random = seededRandom(seed);
  const ys = range(RIVER_TOP, end, STEP);
  let width = 1.8;
  const widths = ys.map(() => {
    width = Math.max(1.1, Math.min(2.8, width + (random() - 0.5) * 0.5));

    return width;
  });
  const forward = ys.map((y, i): [number, number] => [
    bankAt(y) - widths[i] / 2,
    y,
  ]);
  const back = ys
    .map((y, i): [number, number] => [bankAt(y) + widths[i] / 2, y])
    .reverse();

  return `${line([...forward, ...back])}Z`;
}

function buildCurrents(end: number) {
  const random = seededRandom(7);
  let path = "";

  for (let y = RIVER_TOP + 20; y < end - 40; y += 26 + random() * 46) {
    const t = 0.18 + random() * 0.64;
    const length = 34 + random() * 86;
    const phase = random() * 6;
    const ys = range(y, Math.min(y + length, end), 8);
    const points = ys.map((py): [number, number] => {
      const left = leftBankAt(py);

      return [left + t * (rightBankAt(py) - left) + Math.sin(py / 22 + phase) * 1.6, py];
    });
    const curl = random() > 0.5 ? 6 : -6;

    path += `${line(points)}q${curl} 6 ${curl / 3} 11`;
  }

  return path;
}

function buildEddies(end: number) {
  const random = seededRandom(23);
  let path = "";

  for (let y = 300; y < end - 200; y += 480 + random() * 300) {
    const left = leftBankAt(y);
    const width = rightBankAt(y) - left;
    const cx = left + width * (0.36 + random() * 0.28);

    for (const size of [0.1, 0.19, 0.28]) {
      const rx = width * size;
      const ry = rx * 0.42;
      const from = random() * 2;
      const to = from + 3.6 + random() * 1.6;
      const large = to - from > Math.PI ? 1 : 0;

      path += `M${round(cx + rx * Math.cos(from))} ${round(y + ry * Math.sin(from))}`;
      path += `A${round(rx)} ${round(ry)} 0 ${large} 1 ${round(cx + rx * Math.cos(to))} ${round(y + ry * Math.sin(to))}`;
    }
  }

  return path;
}

/** The little hooks scattered on the water in the paper sketch. */
const WAVE_TICKS = [
  "m0 3c3-4 6-4 10-1 2 1 4 1 6 0",
  "m0 2c4-3 8-2 12 1",
  "m0 6 7-6c2 2 4 4 7 4",
];

function buildTicks(end: number) {
  const random = seededRandom(41);
  let path = "";

  for (let y = RIVER_TOP + 30; y < end - 30; y += 34 + random() * 52) {
    const left = leftBankAt(y);
    const x = left + (rightBankAt(y) - left) * (0.14 + random() * 0.68);

    path += `M${round(x)} ${round(y)}${WAVE_TICKS[Math.floor(random() * WAVE_TICKS.length)]}`;
  }

  return path;
}

function buildPetals(end: number) {
  const random = seededRandom(59);
  let path = "";

  for (let y = RIVER_TOP + 40; y < end - 40; y += 52 + random() * 118) {
    const left = leftBankAt(y);
    const x = left + (rightBankAt(y) - left) * (0.12 + random() * 0.76);
    const angle = random() * Math.PI * 2;
    const size = 3 + random() * 2.2;
    const place = (px: number, py: number) =>
      `${round(x + (px * Math.cos(angle) - py * Math.sin(angle)) * size)} ${round(y + (px * Math.sin(angle) + py * Math.cos(angle)) * size)}`;

    path += `M${place(0, -1)}C${place(0.8, -0.5)} ${place(0.7, 0.6)} ${place(0.12, 1)}L${place(0, 0.72)}L${place(-0.12, 1)}C${place(-0.7, 0.6)} ${place(-0.8, -0.5)} ${place(0, -1)}Z`;
  }

  return path;
}

const ROCK_SCALE = 0.208;

/**
 * The five rocks, traced from the paper sketch, top to bottom. Coordinates are
 * the sketch crop's pixels; `anchor` is where each one touches the bank and
 * `offset` is its distance in page pixels above the last rock.
 */
const ROCK_SHAPES = [
  {
    anchor: [270, 160],
    offset: 175,
    fill: "M270 130L290 85L360 65L395 110L418 122L390 130L370 200L330 262L290 215Z",
    ink: "M290 85C310 72 340 62 360 65C378 75 388 95 395 110L418 122L390 130C382 165 362 225 330 262M270 130L275 175M335 125L350 130L365 95M300 150L310 240M305 175L335 190",
  },
  {
    anchor: [150, 310],
    offset: 143,
    fill: "M160 310L170 245L225 232L275 245L295 330L240 400L170 380Z",
    ink: "M170 245C195 234 215 230 225 232C250 232 268 238 275 245L295 330C278 355 255 382 240 400M160 310L170 380M200 315L215 380L250 320",
  },
  {
    anchor: [95, 510],
    offset: 98,
    fill: "M100 490L130 440L175 425L210 470L240 510L210 570L145 640L115 575Z",
    ink: "M100 490C110 465 120 450 130 440C150 428 165 424 175 425L210 470L240 510C232 535 222 555 210 570C190 598 165 625 145 640M120 510L145 595M150 510L165 570M175 480L170 540L205 480",
  },
  {
    anchor: [85, 750],
    offset: 53,
    fill: "M90 740L130 660L205 705L215 740L180 820L140 850L100 780Z",
    ink: "M90 740C105 705 120 675 130 660L205 705L215 740C205 770 192 800 180 820M100 780L140 850M135 715L140 790M160 720L170 770",
  },
  {
    anchor: [70, 990],
    offset: 0,
    fill: "M70 915L100 880L170 880L215 995L165 1120L135 1110L70 990Z",
    ink: "M70 915C80 900 90 888 100 880L170 880L215 995L165 1120M70 915C62 945 62 970 70 990C90 1035 115 1080 135 1110M90 940L105 1050M120 930L125 1000M150 950L170 970M105 930L95 1010",
  },
];

/** The last rock sits this far above the river's end, clear of the fade. */
const ROCKS_FROM_END = 130;

export function buildScene(end: number) {
  const ys = range(RIVER_TOP, end, STEP);
  const left = ys.map((y): [number, number] => [leftBankAt(y), y]);
  const right = ys.map((y): [number, number] => [rightBankAt(y), y]);

  return {
    water: `${line([...left, ...[...right].reverse()])}Z`,
    leftBank: line(left),
    rightBank: line(right),
    leftBrush: brushLine(leftBankAt, end, 3),
    rightBrush: brushLine(rightBankAt, end, 13),
    currents: buildCurrents(end),
    eddies: buildEddies(end),
    ticks: buildTicks(end),
    petals: buildPetals(end),
    rocks: ROCK_SHAPES.map((rock) => {
      const y = end - ROCKS_FROM_END - rock.offset;

      return {
        ...rock,
        transform: `translate(${round(rightBankAt(y))} ${round(y)}) scale(${ROCK_SCALE}) translate(${-rock.anchor[0]} ${-rock.anchor[1]})`,
      };
    }),
  };
}
