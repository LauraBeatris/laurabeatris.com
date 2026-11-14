/**
 * Uploads a blog post's video files (the video, its poster, its captions) to
 * Vercel Blob and prints the URLs to paste into `<VideoNote>`.
 *
 *   pnpm video:upload ~/Movies/rfcs.mp4 ~/Movies/rfcs.jpg ~/Movies/rfcs.vtt
 *
 * Needs BLOB_READ_WRITE_TOKEN, read from the environment or `.env.local`.
 * Each upload gets a random suffix, so a new recording gets a new URL and the
 * old one can be cached forever.
 */
import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";
import { put } from "@vercel/blob";

const ONE_YEAR = 60 * 60 * 24 * 365;
/** Above this, upload in parallel parts that retry on their own. */
const MULTIPART_FROM_BYTES = 20 * 1024 * 1024;
const CONTENT_TYPES: Record<string, string> = {
  ".mp4": "video/mp4",
  ".webm": "video/webm",
  ".mov": "video/quicktime",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".vtt": "text/vtt",
};

const envFile = path.join(import.meta.dirname, "../.env.local");
if (!process.env.BLOB_READ_WRITE_TOKEN && existsSync(envFile)) process.loadEnvFile(envFile);

const files = process.argv.slice(2);

if (!files.length) {
  console.error("Usage: pnpm video:upload <file> [more files]");
  process.exit(1);
}

if (!process.env.BLOB_READ_WRITE_TOKEN) {
  console.error("BLOB_READ_WRITE_TOKEN is missing. Add it to .env.local (it's in the Blob store's settings on Vercel).");
  process.exit(1);
}

for (const file of files) {
  const extension = path.extname(file).toLowerCase();
  const { size } = await stat(file);
  const blob = await put(`blog-videos/${path.basename(file)}`, await readFile(file), {
    access: "public",
    addRandomSuffix: true,
    cacheControlMaxAge: ONE_YEAR,
    contentType: CONTENT_TYPES[extension],
    multipart: size > MULTIPART_FROM_BYTES,
  });

  console.log(`${path.basename(file)}  ${blob.url}`);
}
