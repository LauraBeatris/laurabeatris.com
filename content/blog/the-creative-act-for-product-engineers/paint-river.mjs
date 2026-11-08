/**
 * Paints the river and boat images, pixel by pixel. Seeded, so reruns match.
 *
 *   node paint-river.mjs [scale=2] [outDir=this folder]
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { HALF_WIDTH as HW, RIVER_WIDTH, TILE_HEIGHT as H, centerAt, slopeAt } from "./river-path.ts";

const require = createRequire(import.meta.url);
const sharp = createRequire(require.resolve("next/package.json"))("sharp");

const SCALE = Number(process.argv[2] ?? 2);
const OUT = process.argv[3] ?? path.dirname(fileURLToPath(import.meta.url));

// ---- Math

const clamp = (v, a = 0, b = 1) => (v < a ? a : v > b ? b : v);
const ss = (a, b, v) => {
  const t = clamp((v - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const mix = (a, b, t) => [
  a[0] + (b[0] - a[0]) * t,
  a[1] + (b[1] - a[1]) * t,
  a[2] + (b[2] - a[2]) * t,
];
const mul = (c, k) => [c[0] * k, c[1] * k, c[2] * k];
const hex = (s) => [1, 3, 5].map((i) => parseInt(s.slice(i, i + 2), 16) / 255);
const ramp = (stops, t) => {
  const p = clamp(t) * (stops.length - 1);
  const i = Math.min(Math.floor(p), stops.length - 2);
  return mix(stops[i], stops[i + 1], p - i);
};

function seeded(seed) {
  let state = seed;
  return () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function hash(x, y, seed) {
  let h = Math.imul(x, 374761393) + Math.imul(y, 668265263) + Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const wrap = (v, p) => ((v % p) + p) % p;

function noise(x, y, py, seed) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  const fx = x - ix;
  const fy = y - iy;
  const u = fx * fx * (3 - 2 * fx);
  const v = fy * fy * (3 - 2 * fy);
  const y0 = wrap(iy, py);
  const y1 = wrap(iy + 1, py);
  const a = hash(ix, y0, seed);
  const b = hash(ix + 1, y0, seed);
  const c = hash(ix, y1, seed);
  const d = hash(ix + 1, y1, seed);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

/** Fractal noise that repeats every tile. Cells are sized in page pixels. */
function fbm(x, y, cellX, cellY, octaves, seed) {
  let py = Math.max(1, Math.round(H / cellY));
  let lx = x / cellX;
  let ly = y / (H / py);
  let amp = 0.5;
  let sum = 0;
  let total = 0;
  for (let i = 0; i < octaves; i++) {
    sum += amp * noise(lx, ly, py, seed + i * 17);
    total += amp;
    lx *= 2;
    ly *= 2;
    py *= 2;
    amp *= 0.5;
  }
  return sum / total;
}

function voronoi(x, y, cell, seed) {
  const py = Math.max(1, Math.round(H / cell));
  const size = H / py;
  const lx = x / size;
  const ly = y / size;
  const ix = Math.floor(lx);
  const iy = Math.floor(ly);
  let f1 = 9;
  let f2 = 9;
  let id = 0;
  for (let j = -1; j <= 1; j++) {
    for (let i = -1; i <= 1; i++) {
      const cx = ix + i;
      const cy = wrap(iy + j, py);
      const px = cx + hash(cx, cy, seed);
      const py2 = iy + j + hash(cx, cy, seed + 1);
      const d = Math.hypot(px - lx, py2 - ly);
      if (d < f1) {
        f2 = f1;
        f1 = d;
        id = hash(cx, cy, seed + 2);
      } else if (d < f2) {
        f2 = d;
      }
    }
  }
  return { f1, f2, id };
}

// ---- Palette

const WATER = ["#8ed8c2", "#3fb6b0", "#1b8796", "#126a80"].map(hex);
const BED_DARK = hex("#7b6e4b");
const BED_LIGHT = hex("#d0c08e");
const SKY = hex("#c9efe9");
const CAUSTIC = hex("#effac9");
const GLINT = hex("#f6fffb");
const CREST = hex("#e4f9f3");
const FOAM = hex("#fbfffc");
const EARTH_DARK = hex("#352c20");
const EARTH_LIGHT = hex("#5f5138");
const EARTH_GREEN = hex("#4c6a2f");
const ROCK_SHADOW = hex("#4e5c6b");
const ROCK_TONES = ["#aaa18c", "#b9b09a", "#9c9a92", "#a89a84"].map(hex);
const ROCK_LIGHT = hex("#f3ead2");
const MOSS = ["#3f6228", "#7f9f3a", "#b9cf5e", "#e0e58a"].map(hex);
const GRASS_ROOT = hex("#2c6233");
const GRASS_TIP = hex("#b4d65b");
const PETAL = hex("#f6c9d4");
const PETAL_DARK = hex("#e29ab0");

// ---- Scene objects

const BAND = 8;
const bands = () => Array.from({ length: Math.ceil(H / BAND) + 2 }, () => []);

function addToBands(table, item, top, bottom) {
  const first = Math.max(Math.floor(top / BAND), 0);
  const last = Math.min(Math.floor(bottom / BAND), table.length - 1);
  for (let i = first; i <= last; i++) table[i].push(item);
}

function buildRocks() {
  const random = seeded(11);
  const rocks = [];
  const add = (y, side, offset, rad, layer) =>
    rocks.push({
      x: centerAt(y) + side * offset,
      y,
      rx: rad * (0.9 + random() * 0.45),
      ry: rad * (0.72 + random() * 0.36),
      angle: random() * Math.PI,
      tone: ROCK_TONES[Math.floor(random() * ROCK_TONES.length)],
      seed: Math.floor(random() * 1e6),
      layer,
    });

  for (const side of [-1, 1]) {
    for (let y = 0; y < H; y += 7 + random() * 6) {
      add(y, side, HW + 10 + random() * 7, 3 + random() * 3.5, 0);
    }
    for (let y = 0; y < H; y += 8 + random() * 6) {
      const rad = random() < 0.14 ? 9.5 + random() * 3 : 5 + random() * 4;
      add(y, side, HW + rad * 0.3 + random() * 2, rad, 1);
    }
    for (let y = 0; y < H; y += 8 + random() * 13) {
      add(y, side, HW - 3 - random() * 6, 1.8 + random() * 2.4, 2);
    }
  }

  const copies = rocks.flatMap((r) =>
    r.y < 30 ? [r, { ...r, y: r.y + H }] : r.y > H - 30 ? [r, { ...r, y: r.y - H }] : [r],
  );
  copies.sort((a, b) => a.layer - b.layer || a.y - b.y);

  const table = bands();
  for (const rock of copies) {
    const reach = Math.max(rock.rx, rock.ry) * 1.9 + 4;
    addToBands(table, rock, rock.y - reach, rock.y + reach);
  }
  return table;
}

function buildGrass() {
  const random = seeded(29);
  const table = bands();
  for (const side of [-1, 1]) {
    for (let y = 0; y < H; y += 3.5 + random() * 7) {
      const base = centerAt(y) + side * (HW + 10 + random() * 11);
      const blades = 4 + Math.floor(random() * 5);
      for (let b = 0; b < blades; b++) {
        const length = 5 + random() * 7.5;
        const lean = side * (0.15 + random() * 0.9);
        const bend = (random() - 0.5) * 0.7 + side * 0.25;
        const shade = random();
        let px = base + (random() - 0.5) * 5;
        let py = y + (random() - 0.5) * 3;
        const steps = 5;
        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          const dx = ((lean + bend * t) * length) / steps;
          const dy = (-(1 - t * 0.5) * length * 0.8) / steps;
          const seg = {
            ax: px,
            ay: py,
            bx: px + dx,
            by: py + dy,
            w0: 0.62 * (1 - t),
            w1: 0.62 * (1 - (s + 1) / steps),
            t0: t,
            t1: (s + 1) / steps,
            shade,
          };
          addToBands(table, seg, Math.min(seg.ay, seg.by) - 2, Math.max(seg.ay, seg.by) + 2);
          if (seg.by < 4 || seg.ay < 4) {
            const copy = { ...seg, ay: seg.ay + H, by: seg.by + H };
            addToBands(table, copy, Math.min(copy.ay, copy.by) - 2, Math.max(copy.ay, copy.by) + 2);
          }
          px += dx;
          py += dy;
        }
      }
    }
  }
  return table;
}

function buildRipples() {
  const random = seeded(47);
  const ripples = [];
  for (let y = 120; y < H - 120; y += 230 + random() * 170) {
    ripples.push({
      x: centerAt(y) + (random() - 0.5) * HW * 0.9,
      y,
      radius: 7 + random() * 5,
      seed: Math.floor(random() * 1e6),
    });
  }
  return ripples;
}

function buildPetals() {
  const random = seeded(61);
  const petals = [];
  for (let y = 40; y < H - 40; y += 70 + random() * 120) {
    petals.push({
      x: centerAt(y) + (random() - 0.5) * HW * 1.5,
      y,
      angle: random() * Math.PI,
      size: 1.7 + random() * 1.1,
      tone: random(),
    });
  }
  return petals;
}

const ROCKS = buildRocks();
const GRASS = buildGrass();
const RIPPLES = buildRipples();
const PETALS = buildPetals();

// ---- Painting

function paintWater(x, y, s, d) {
  const depth = clamp(1 - Math.abs(s) / HW);

  // Pebbles on the riverbed, visible through the shallows
  const lean = fbm(x, y, 5, 5, 2, 2) * 5;
  const pebbles = voronoi(x + lean, y - lean, 6.8, 3);
  let bed = mix(BED_DARK, BED_LIGHT, pebbles.id);
  bed = mul(bed, 0.68 + 0.44 * ss(0.72, 0.1, pebbles.f1));
  bed = mul(bed, 0.8 + 0.2 * ss(0, 0.15, pebbles.f2 - pebbles.f1));
  bed = mul(bed, 0.86 + 0.28 * fbm(x, y, 1.6, 1.6, 2, 5));

  let color = ramp(WATER, ss(0.02, 1, depth));
  color = mix(color, bed, 0.72 * Math.exp(-depth * 2.8));

  // Broad bands of reflected sky, then fine streaks along the current
  color = mix(color, SKY, 0.34 * ss(0.54, 0.78, fbm(s, y, 26, 130, 3, 7)));
  color = mul(color, 1 + 0.24 * (fbm(s, y, 3, 46, 3, 9) - 0.5));

  // Leaf shade dappled from the banks
  const dapple = ss(0.5, 0.66, fbm(x, y, 17, 17, 3, 11)) * (1 - 0.55 * depth);
  color = mix(color, [color[0] * 0.5, color[1] * 0.64, color[2] * 0.7], dapple * 0.62);

  // Thin, wandering light on the shallow bed
  const wander = fbm(x, y, 11, 11, 2, 13) * 9;
  const light = Math.abs(fbm(x + wander, y - wander, 6.5, 6.5, 3, 15) - 0.5) * 2;
  const shallows = (1 - depth) * (1 - depth);
  color = mix(color, CAUSTIC, ss(0.05, 0, light) * (0.05 + 0.42 * shallows));

  // Small waves crossing the current, bowed because the middle runs fastest
  const sway = x + Math.sin(y / 9) * 2.6;
  const bow = (s / HW) * (s / HW) * 10;
  const waves = fbm(sway, y + bow, 21, 2.7, 2, 51);
  const waveMask = ss(0.44, 0.64, fbm(x, y, 28, 28, 2, 53));
  color = mul(color, 1 - ss(0.38, 0.26, waves) * 0.17 * waveMask);
  color = mix(color, CREST, ss(0.67, 0.79, waves) * waveMask * 0.72);

  // Wide, faint light drawn out along the flow
  const bent = s + Math.sin(y / 34) * 4;
  color = mix(color, SKY, ss(0.6, 0.78, fbm(bent, y, 3.6, 42, 2, 21)) * 0.26);

  for (const r of RIPPLES) {
    if (Math.abs(y - r.y) > 16) continue;
    const dist = Math.hypot(x - r.x, (y - r.y) * 2.3);
    if (dist > r.radius * 1.5) continue;
    for (const k of [0.34, 0.68, 1]) {
      const ring = ss(0.62, 0.1, Math.abs(dist - r.radius * k));
      const broken = ss(0.32, 0.5, fbm(x, y, 5, 5, 2, r.seed));
      color = mix(color, GLINT, ring * broken * (1.08 - k * 0.5) * 0.8);
    }
  }

  // Lace of foam where the water touches the stones
  const foam = ss(-6.5, -1, d) * ss(0.45, 0.6, fbm(x, y, 3.2, 3.2, 3, 23));
  color = mix(color, FOAM, foam * 0.72);

  for (const p of PETALS) {
    if (Math.abs(y - p.y) > 6) continue;
    const dx = x - p.x;
    const dy = y - p.y;
    const c = Math.cos(p.angle);
    const n = Math.sin(p.angle);
    const shade = Math.hypot(dx - 0.5, dy - 0.8);
    if (shade < p.size * 1.2) color = mul(color, 0.8 + 0.2 * ss(0.3, 1.2, shade / p.size));
    const u = (dx * c + dy * n) / p.size;
    const v = (-dx * n + dy * c) / (p.size * 0.62);
    const inside = u * u + v * v;
    if (inside < 1.1) {
      color = mix(color, mix(PETAL, PETAL_DARK, clamp(p.tone * 0.5 + u * 0.3 + 0.2)), ss(1.1, 0.8, inside));
    }
  }

  return color;
}

const LIGHT = (() => {
  const v = [-0.52, -0.62, 0.59];
  const l = Math.hypot(...v);
  return v.map((c) => c / l);
})();

/** Returns [color, coverage], or null when the point misses the rock. */
function paintRock(rock, x, y, s) {
  const dx = x - rock.x;
  const dy = y - rock.y;
  const c = Math.cos(rock.angle);
  const n = Math.sin(rock.angle);
  const nx = (dx * c + dy * n) / rock.rx;
  const ny = (-dx * n + dy * c) / rock.ry;
  const base = nx * nx + ny * ny;
  if (base > 2.2) return null;

  const size = (rock.rx + rock.ry) / 2;
  const edge = base * (1 + (fbm(x, y, size * 0.8, size * 0.8, 2, rock.seed) - 0.5) * 0.5);
  const coverage = ss(1.03, 0.9, edge);
  if (coverage <= 0) return null;

  const height = Math.sqrt(Math.max(0, 1 - Math.min(edge, 1)));
  // Broad planes first, then a fine grain on top of them
  const planes = (px, py) => fbm(px, py, size * 0.7, size * 0.7, 2, rock.seed + 13);
  const grain = (px, py) => fbm(px, py, 2.1, 2.1, 2, rock.seed + 3);
  const bumpGx = (planes(x + 0.6, y) - planes(x - 0.6, y)) * size * 0.34 + (grain(x + 0.4, y) - grain(x - 0.4, y)) * 1.5;
  const bumpGy = (planes(x, y + 0.6) - planes(x, y - 0.6)) * size * 0.34 + (grain(x, y + 0.4) - grain(x, y - 0.4)) * 1.5;
  let wx = dx / size + bumpGx;
  let wy = dy / size + bumpGy;
  let wz = height + 0.3;
  const length = Math.hypot(wx, wy, wz);
  wx /= length;
  wy /= length;
  wz /= length;

  const diffuse = clamp(wx * LIGHT[0] + wy * LIGHT[1] + wz * LIGHT[2]);
  let color =
    diffuse < 0.5
      ? mix(ROCK_SHADOW, rock.tone, ss(0.02, 0.5, diffuse))
      : mix(rock.tone, ROCK_LIGHT, ss(0.5, 1, diffuse));

  // Mineral speckle, then cracks
  color = mul(color, 0.86 + 0.28 * fbm(x, y, 0.75, 0.75, 2, rock.seed + 5));
  const ridge = Math.abs(fbm(x, y, 3.6, 3.6, 3, rock.seed + 7) - 0.5) * 2;
  color = mul(color, 1 - 0.4 * ss(0.05, 0, ridge));

  // Moss settles on the sides facing up and away from the water
  const mossAmount = ss(0.56, 0.68, fbm(x, y, size * 0.75, size * 0.75, 3, rock.seed + 9) - wy * 0.2);
  const fray = ss(0.34, 0.6, fbm(x, y, 0.9, 0.9, 2, rock.seed + 11));
  color = mix(color, ramp(MOSS, diffuse * 1.05), mossAmount * fray * 0.92);

  // Stones are dark and wet at the waterline, and shaded where they meet
  const wet = ss(HW + 4, HW - 3, Math.abs(s));
  color = mix(color, [color[0] * 0.56, color[1] * 0.66, color[2] * 0.72], wet * 0.75);
  color = mul(color, 0.62 + 0.38 * ss(0, 0.42, height));

  return [color, coverage];
}

function shadowOf(rock, x, y) {
  const size = (rock.rx + rock.ry) / 2;
  const dist = Math.hypot(x - rock.x - size * 0.42, y - rock.y - size * 0.58);
  return ss(size * 1.5, size * 0.6, dist);
}

function segmentHit(seg, x, y) {
  const vx = seg.bx - seg.ax;
  const vy = seg.by - seg.ay;
  const t = clamp(((x - seg.ax) * vx + (y - seg.ay) * vy) / (vx * vx + vy * vy || 1));
  const dist = Math.hypot(x - seg.ax - vx * t, y - seg.ay - vy * t);
  const width = seg.w0 + (seg.w1 - seg.w0) * t;
  return { coverage: ss(width + 0.35, width - 0.15, dist), along: seg.t0 + (seg.t1 - seg.t0) * t };
}

/** A touch of gouache: tones gather into soft steps, with the paper's tooth. */
function gouache(color, x, y) {
  const tooth = 0.965 + 0.07 * fbm(x, y, 1.15, 1.15, 2, 97);
  return color.map((c) => {
    const stepped = Math.round(c * 15) / 15;
    return clamp((c + (stepped - c) * 0.42) * tooth);
  });
}

/** Same scene by moonlight, with the highlights left cool and bright. */
function toNight([r, g, b]) {
  const l = 0.3 * r + 0.59 * g + 0.11 * b;
  const lift = ss(0.78, 1, l);
  return [
    r * 0.27 + l * 0.08 + lift * 0.34,
    g * 0.34 + l * 0.13 + lift * 0.4,
    b * 0.5 + l * 0.2 + lift * 0.42,
  ];
}

function paintRiver() {
  const width = RIVER_WIDTH * SCALE;
  const height = H * SCALE;
  const day = Buffer.alloc(width * height * 4);
  const night = Buffer.alloc(width * height * 4);

  for (let py = 0; py < height; py++) {
    const y = (py + 0.5) / SCALE;
    const rowCenter = centerAt(y);
    const rocks = ROCKS[Math.floor(y / BAND)];
    const blades = GRASS[Math.floor(y / BAND)];

    for (let px = 0; px < width; px++) {
      const x = (px + 0.5) / SCALE;
      if (Math.abs(x - rowCenter) > HW + 48) continue;

      // Slightly unsteady coordinates, so edges read as brushed, not plotted
      const wx = x + (fbm(x, y, 8, 8, 2, 31) - 0.5) * 2.1;
      const wy = y + (fbm(x, y, 8, 8, 2, 37) - 0.5) * 2.1;
      const slope = slopeAt(wy);
      const s = (wx - centerAt(wy)) / Math.sqrt(1 + slope * slope);
      const d = Math.abs(s) - HW - (fbm(s > 0 ? 400 : 900, wy, 40, 40, 2, 41) - 0.5) * 4;

      let color = [0, 0, 0];
      let alpha = 0;

      if (d < 2) {
        color = paintWater(wx, wy, s, d);
        alpha = 1;
      }

      const earthEnd = 15 + fbm(wx, wy, 11, 11, 3, 43) * 10;
      if (d > -1.5 && d < earthEnd) {
        let earth = mix(EARTH_DARK, EARTH_LIGHT, fbm(wx, wy, 2.4, 2.4, 3, 45));
        earth = mix(earth, EARTH_GREEN, Math.max(ss(0.45, 0.68, fbm(wx, wy, 6, 6, 3, 47)) * 0.85, ss(earthEnd - 8, earthEnd - 2, d)));
        const over = ss(-1.5, 1, d);
        color = alpha ? mix(color, earth, over) : earth;
        if (d >= 2) alpha = ss(earthEnd, earthEnd - 2.2, d);
        else alpha = Math.max(alpha, over);
      }

      for (const rock of rocks) {
        if (alpha > 0) {
          const shadow = shadowOf(rock, wx, wy);
          if (shadow > 0) {
            color = mix(color, [color[0] * 0.42, color[1] * 0.5, color[2] * 0.6], shadow * 0.74);
          }
        }
        const hit = paintRock(rock, wx, wy, s);
        if (hit) {
          color = alpha ? mix(color, hit[0], hit[1]) : hit[0];
          alpha = Math.max(alpha, hit[1]);
        }
      }

      for (const seg of blades) {
        const hit = segmentHit(seg, x, y);
        if (hit.coverage <= 0) continue;
        const blade = mul(mix(GRASS_ROOT, GRASS_TIP, hit.along), 0.82 + seg.shade * 0.34);
        color = alpha ? mix(color, blade, hit.coverage) : blade;
        alpha = Math.max(alpha, hit.coverage);
      }

      if (alpha <= 0) continue;
      alpha *= ss(0, 3, x) * ss(RIVER_WIDTH, RIVER_WIDTH - 3, x);

      const finished = gouache(color, wx, wy);
      const moonlit = toNight(finished);
      const i = (py * width + px) * 4;
      for (let c = 0; c < 3; c++) {
        day[i + c] = Math.round(clamp(finished[c]) * 255);
        night[i + c] = Math.round(clamp(moonlit[c]) * 255);
      }
      day[i + 3] = night[i + 3] = Math.round(alpha * 255);
    }
    if (py % 400 === 0) console.log(`river ${Math.round((py / height) * 100)}%`);
  }

  return { day, night, width, height };
}

// ---- The boat, on the outline of the paper sketch

const BOAT_SCALE = 3;
const BOAT_BOX = { width: 100, height: 110 };
const WAKE_BOX = { width: 140, height: 220 };

const fromSketch = (() => {
  const angle = (-17.4 * Math.PI) / 180;
  const c = Math.cos(angle);
  const n = Math.sin(angle);
  return ([x, y]) => {
    const dx = (x - 215) * 0.114;
    const dy = (y - 400) * 0.114;
    return [dx * c - dy * n, dx * n + dy * c];
  };
})();

const HULL = [[290, 155], [335, 385], [285, 570], [115, 735], [95, 490], [130, 385]].map(fromSketch);
const CABIN = [[235, 245], [170, 290], [155, 460], [180, 470], [240, 402], [320, 345], [300, 165]].map(fromSketch);
const FLAG = [[325, 65], [160, 200], [225, 245], [290, 155]].map(fromSketch);
const SEAMS = [
  [[235, 245], [230, 395]],
  [[290, 160], [260, 260]],
  [[205, 550], [290, 410]],
  [[170, 575], [180, 470]],
].map((line) => line.map(fromSketch));

function polygonDistance(points, x, y) {
  let best = Infinity;
  let inside = false;
  for (let i = 0, j = points.length - 1; i < points.length; j = i++) {
    const [ax, ay] = points[i];
    const [bx, by] = points[j];
    const vx = bx - ax;
    const vy = by - ay;
    const t = clamp(((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy));
    best = Math.min(best, Math.hypot(x - ax - vx * t, y - ay - vy * t));
    if (ay > y !== by > y && x < (vx * (y - ay)) / vy + ax) inside = !inside;
  }
  return inside ? -best : best;
}

const WOOD_DARK = hex("#4b2d1b");
const WOOD = hex("#8f5e36");
const WOOD_LIGHT = hex("#d7a366");
const THATCH_DARK = hex("#8a6a3b");
const THATCH_LIGHT = hex("#e6cd92");
const CLOTH_DARK = hex("#8f2a1f");
const CLOTH = hex("#c44a32");
const CLOTH_LIGHT = hex("#e88562");

function paintBoat() {
  const width = BOAT_BOX.width * BOAT_SCALE;
  const height = BOAT_BOX.height * BOAT_SCALE;
  const data = Buffer.alloc(width * height * 4);

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const x = (px + 0.5) / BOAT_SCALE - BOAT_BOX.width / 2;
      const y = (py + 0.5) / BOAT_SCALE - BOAT_BOX.height / 2;

      const hull = polygonDistance(HULL, x, y);
      const cabin = polygonDistance(CABIN, x, y);
      const flag = polygonDistance(FLAG, x, y);

      // A soft shadow falling on the water
      const shade = polygonDistance(HULL, x - 2.6, y - 3.4);
      let color = hex("#0d4a56");
      let alpha = ss(3.4, -1.6, shade) * 0.46;

      if (hull < 0.7) {
        const inset = -hull;
        const grain = fbm(x, y + 400, 0.7, 15, 3, 3);
        // Planks run parallel to the outline, like a real hull
        const planks = Math.abs((Math.max(inset, 0) % 2.5) - 1.25);
        let wood = mix(WOOD, WOOD_LIGHT, grain * 0.72);
        wood = mul(wood, 0.87 + 0.13 * ss(0.04, 0.32, planks));
        // The rim rounds over: sunlit on the near side, shaded on the far side
        const rim = ss(2.2, 1.1, inset);
        const facing = clamp(0.5 - x * 0.05 - y * 0.012);
        wood = mix(mul(wood, 0.62 + 0.2 * clamp(inset / 8)), mul(mix(wood, WOOD_LIGHT, 0.55), 0.74 + facing * 0.5), rim);
        wood = mix(wood, WOOD_DARK, ss(0.5, 0, inset) * 0.85);
        const coverage = ss(0.7, 0.1, hull);
        color = mix(color, wood, coverage);
        alpha = Math.max(alpha, coverage);
      }

      if (cabin < 0.7) {
        const inset = -cabin;
        const straw = fbm(x + 300, y, 12, 0.6, 3, 7);
        let roof = mix(THATCH_DARK, THATCH_LIGHT, straw * 0.8 + 0.2);
        // A barrel roof: light on the near slope, falling off over the ridge
        const across = clamp((x + 12) / 22);
        roof = mul(roof, 1.14 - ss(0.2, 0.95, across) * 0.5);
        roof = mul(roof, 0.66 + 0.34 * ss(0, 1.5, inset));
        const coverage = ss(0.7, 0.1, cabin);
        color = mix(color, roof, coverage);
        alpha = Math.max(alpha, coverage);
      }

      for (const [[ax, ay], [bx, by]] of SEAMS) {
        const vx = bx - ax;
        const vy = by - ay;
        const t = clamp(((x - ax) * vx + (y - ay) * vy) / (vx * vx + vy * vy));
        const dist = Math.hypot(x - ax - vx * t, y - ay - vy * t);
        if (hull < 0) color = mix(color, WOOD_DARK, ss(0.6, 0.12, dist) * 0.42);
      }

      if (flag < 0.7) {
        const folds = fbm(x * 0.6 - y * 0.8 + 200, y * 0.2, 2.6, 30, 2, 11);
        const cloth = ramp([CLOTH_DARK, CLOTH, CLOTH_LIGHT], 0.34 + folds * 0.5 - y * 0.006);
        const coverage = ss(0.7, 0.1, flag);
        color = mix(color, mix(cloth, CLOTH_DARK, ss(0.5, 0, -flag) * 0.7), coverage);
        alpha = Math.max(alpha, coverage);
      }

      if (alpha <= 0) continue;
      const finished = gouache(color, x + 300, y + 300);
      const i = (py * width + px) * 4;
      for (let c = 0; c < 3; c++) data[i + c] = Math.round(finished[c] * 255);
      data[i + 3] = Math.round(clamp(alpha) * 255);
    }
  }
  return { data, width, height };
}

/** Ripples and foam trailing upstream of the boat's center. */
function paintWake() {
  const width = WAKE_BOX.width * BOAT_SCALE;
  const height = WAKE_BOX.height * BOAT_SCALE;
  const data = Buffer.alloc(width * height * 4);
  const rings = [
    { x: 0, y: -49, rx: 6, ry: 2.8 },
    { x: 1, y: -64, rx: 9.5, ry: 4 },
    { x: -1, y: -82, rx: 13.5, ry: 5.4 },
  ];

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const x = (px + 0.5) / BOAT_SCALE - WAKE_BOX.width / 2;
      const y = (py + 0.5) / BOAT_SCALE - WAKE_BOX.height / 2;
      if (y > -30 || y < -108) continue;

      const along = clamp((-y - 34) / 66);
      const arm = 6 + along * 21;
      const thickness = 0.65 + along * 0.9;
      let foam = ss(thickness + 0.8, thickness * 0.25, Math.abs(Math.abs(x) - arm));
      foam *= ss(0.32, 0.54, fbm(x + 500, y, 2.6, 7, 3, 5));
      foam *= ss(1, 0.55, along);

      for (const r of rings) {
        const dist = Math.hypot((x - r.x) / r.rx, (y - r.y) / r.ry);
        const ring = ss(0.2, 0.03, Math.abs(dist - 1));
        foam = Math.max(foam, ring * ss(0.3, 0.5, fbm(x + 700, y, 4, 4, 2, 9)) * 0.8);
      }

      if (foam <= 0) continue;
      const i = (py * width + px) * 4;
      data[i] = 244;
      data[i + 1] = 255;
      data[i + 2] = 251;
      data[i + 3] = Math.round(clamp(foam) * 245);
    }
  }
  return { data, width, height };
}

// ---- Output

const write = (name, data, width, height, quality) =>
  sharp(data, { raw: { width, height, channels: 4 } })
    .webp({ quality, alphaQuality: 90, effort: 6, smartSubsample: true })
    .toFile(path.join(OUT, name))
    .then((info) => console.log(name, `${Math.round(info.size / 1024)}KB`));

const started = Date.now();
const river = paintRiver();
await write("river-day.webp", river.day, river.width, river.height, 74);
await write("river-night.webp", river.night, river.width, river.height, 72);
const boat = paintBoat();
await write("boat.webp", boat.data, boat.width, boat.height, 88);
const wake = paintWake();
await write("wake.webp", wake.data, wake.width, wake.height, 80);
console.log(`done in ${Math.round((Date.now() - started) / 1000)}s`);
