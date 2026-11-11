/**
 * Renders the site's share card and each blog post's as a short MP4 where the
 * signature writes itself, then blinks, into `public/og/site.mp4` and
 * `public/og/<slug>.mp4`. Pages point `og:video` at them, so link previews that
 * play video animate.
 *
 * Runs before `next build`; run it alone with `pnpm og:video`.
 */
import { spawn } from "node:child_process";
import { mkdir, readdir, readFile } from "node:fs/promises";
import path from "node:path";
import vm from "node:vm";
import ffmpeg from "@ffmpeg-installer/ffmpeg";
import { ImageResponse } from "next/og.js";
import {
  loadOgFonts,
  OG_SIZE,
  ogCard,
  type SignaturePose,
  SITE_CARD,
  signatureSvg,
} from "../lib/og-card.ts";
import { SIGNATURE_STROKES } from "../lib/signature-strokes.ts";
import { pathLength } from "../lib/svg-path-length.ts";

const FPS = 30;
const POSTS_DIRECTORY = path.join(import.meta.dirname, "../content/blog");
const OUTPUT_DIRECTORY = path.join(import.meta.dirname, "../public/og");

/** The site's hover blink: 3.2s cycle, eyes shut at 2.5% and open again by 7%. */
const BLINK = { closeMs: 80, openMs: 144, easing: cubicBezier(0.23, 1, 0.32, 1) };

const strokes = SIGNATURE_STROKES.map((stroke) => ({
  ...stroke,
  length: pathLength(stroke.d),
  ease: parseEasing(stroke.easing),
}));
const writtenAtMs = Math.max(...strokes.map((s) => s.delayMs + s.durationMs));
const blinkAtMs = writtenAtMs + 700;
const totalMs = blinkAtMs + BLINK.closeMs + BLINK.openMs + 1500;

function poseAt(ms: number): SignaturePose {
  const drawn = strokes.map((stroke) => {
    const progress = clamp((ms - stroke.delayMs) / stroke.durationMs);
    return progress >= 1 ? undefined : stroke.length * stroke.ease(progress);
  });

  const blinkMs = ms - blinkAtMs;
  let eyeOpenness = 1;
  if (blinkMs >= 0 && blinkMs < BLINK.closeMs) {
    eyeOpenness = 1 - 0.8 * BLINK.easing(blinkMs / BLINK.closeMs);
  } else if (blinkMs >= BLINK.closeMs && blinkMs < BLINK.closeMs + BLINK.openMs) {
    eyeOpenness = 0.2 + 0.8 * BLINK.easing((blinkMs - BLINK.closeMs) / BLINK.openMs);
  }

  return { drawn, eyeOpenness };
}

async function renderVideo(slug: string, post: { title: string; description: string }) {
  const fonts = await loadOgFonts(post);
  const output = path.join(OUTPUT_DIRECTORY, `${slug}.mp4`);
  const encoder = spawn(
    ffmpeg.path,
    [
      ...["-y", "-loglevel", "error"],
      ...["-f", "image2pipe", "-framerate", String(FPS), "-c:v", "png", "-i", "-"],
      ...["-c:v", "libx264", "-preset", "slow", "-crf", "20", "-pix_fmt", "yuv420p"],
      // Lets players start before the whole file has downloaded
      ...["-movflags", "+faststart", "-an", output],
    ],
    { stdio: ["pipe", "inherit", "inherit"] },
  );
  const encoded = new Promise<void>((resolve, reject) => {
    encoder.on("error", reject);
    encoder.on("close", (code) =>
      code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`)),
    );
  });

  // Most frames repeat (before the pen lands, and while the signature rests)
  const frames = new Map<string, Buffer>();
  const frameCount = Math.ceil((totalMs / 1000) * FPS);

  for (let frame = 0; frame < frameCount; frame++) {
    const signature = signatureSvg(poseAt((frame / FPS) * 1000));
    let png = frames.get(signature);
    if (!png) {
      const image = new ImageResponse(ogCard({ ...post, signature }), { ...OG_SIZE, fonts });
      png = Buffer.from(await image.arrayBuffer());
      frames.set(signature, png);
    }
    if (!encoder.stdin.write(png)) {
      await new Promise((resolve) => encoder.stdin.once("drain", resolve));
    }
  }
  encoder.stdin.end();
  await encoded;

  console.log(`og:video  ${path.relative(process.cwd(), output)}  (${frameCount} frames)`);
}

/** Reads `export const metadata = {...}` from a post without compiling its MDX. */
async function readPostMetadata(slug: string) {
  const source = await readFile(path.join(POSTS_DIRECTORY, slug, "post.mdx"), "utf8");
  const literal = source.match(/^export const metadata = (\{[\s\S]*?^\});?$/m)?.[1];
  if (!literal) throw new Error(`No metadata export in content/blog/${slug}/post.mdx`);

  return vm.runInNewContext(`(${literal})`) as { title: string; description: string };
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value));
}

/** CSS `linear` or `linear(a, b, ...)` with evenly spaced stops. */
function parseEasing(easing: string): (t: number) => number {
  const stops = easing.match(/^linear\((.+)\)$/)?.[1].split(",").map(Number);
  if (!stops) return (t) => t;

  return (t) => {
    const position = t * (stops.length - 1);
    const index = Math.min(Math.floor(position), stops.length - 2);
    return stops[index] + (stops[index + 1] - stops[index]) * (position - index);
  };
}

function cubicBezier(x1: number, y1: number, x2: number, y2: number) {
  const at = (a: number, b: number, t: number) =>
    3 * a * t * (1 - t) ** 2 + 3 * b * t ** 2 * (1 - t) + t ** 3;

  return (x: number) => {
    // Bisect for the t whose x matches, then read off y
    let low = 0;
    let high = 1;
    for (let i = 0; i < 30; i++) {
      const mid = (low + high) / 2;
      if (at(x1, x2, mid) < x) low = mid;
      else high = mid;
    }
    return at(y1, y2, (low + high) / 2);
  };
}

await mkdir(OUTPUT_DIRECTORY, { recursive: true });
await renderVideo("site", SITE_CARD);

const entries = await readdir(POSTS_DIRECTORY, { withFileTypes: true });
for (const entry of entries.filter((entry) => entry.isDirectory())) {
  await renderVideo(entry.name, await readPostMetadata(entry.name));
}
