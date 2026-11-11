/**
 * The social share card, shared by each post's Open Graph image and its
 * Open Graph video (`scripts/og-video.ts`). No JSX, and only relative imports
 * with extensions, so Node can run this file directly.
 */
import React from "react";
import { SIGNATURE_STROKES } from "./signature-strokes.ts";

export const OG_SIZE = { width: 1200, height: 630 };

const SITE = "laurabeatris.com";
const INK = "#1a1a1a";
const MUTED = "#707070";
const SIGNATURE_VIEWBOX = { width: 257.1, height: 145.5 };
const SIGNATURE_WIDTH = 176;

export type SignaturePose = {
  /** Length of each stroke drawn so far, in viewBox units. Omit for fully drawn. */
  drawn?: (number | undefined)[];
  /** 1 is open, 0.2 is mid-blink. */
  eyeOpenness?: number;
};

/** The signature as a standalone SVG document, at any point while it's written. */
export function signatureSvg({ drawn, eyeOpenness = 1 }: SignaturePose = {}) {
  const paths = SIGNATURE_STROKES.map((stroke, index) => {
    const length = drawn?.[index];
    if (length !== undefined && length <= 0) return "";

    const dash = length === undefined ? "" : ` stroke-dasharray="${length} 10000"`;
    const blink =
      stroke.isEye && eyeOpenness < 1 ? ` transform="${eyeTransform(stroke.d, eyeOpenness)}"` : "";

    return `<path d="${stroke.d}"${dash}${blink}/>`;
  }).join("");

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${SIGNATURE_VIEWBOX.width} ${SIGNATURE_VIEWBOX.height}" fill="none" stroke="${INK}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
}

/** Squashes an eye along the face's 33deg tilt, like the site's hover blink. */
function eyeTransform(d: string, openness: number) {
  // Each eye is drawn as `M<x> <y>a<r> ...`, starting at its rightmost point
  const [x, y, r] = d.match(/^M([\d.]+) ([\d.]+)a([\d.]+)/)!.slice(1).map(Number);
  const cx = x - r;

  return `translate(${cx} ${y}) rotate(-33) scale(1 ${openness}) rotate(33) translate(${-cx} ${-y})`;
}

export function ogCard({
  title,
  description,
  signature,
}: {
  title: string;
  description: string;
  /** An SVG document from `signatureSvg`. */
  signature: string;
}) {
  const h = React.createElement;

  return h(
    "div",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "76px 84px",
        backgroundColor: "#ffffff",
        fontFamily: "Geist",
      },
    },
    h(
      "div",
      { style: { display: "flex", flexDirection: "column" } },
      h(
        "div",
        {
          style: {
            fontSize: 78,
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.08,
            color: INK,
          },
        },
        title,
      ),
      h(
        "div",
        {
          style: {
            marginTop: 30,
            fontSize: 36,
            fontWeight: 400,
            lineHeight: 1.35,
            color: MUTED,
          },
        },
        description,
      ),
    ),
    h(
      "div",
      {
        style: {
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
        },
      },
      h("img", {
        src: `data:image/svg+xml;base64,${Buffer.from(signature).toString("base64")}`,
        width: SIGNATURE_WIDTH,
        height: (SIGNATURE_WIDTH * SIGNATURE_VIEWBOX.height) / SIGNATURE_VIEWBOX.width,
      }),
      h("div", { style: { fontFamily: "Geist Mono", fontSize: 26, color: MUTED } }, SITE),
    ),
  );
}

export async function loadOgFonts({ title, description }: { title: string; description: string }) {
  const fonts = await Promise.all([
    loadFont("Geist", "Geist", 600, title),
    loadFont("Geist", "Geist", 400, description),
    loadFont("Geist Mono", "Geist+Mono", 400, SITE),
  ]);

  return fonts.flat();
}

/** Falls back to the default typeface if Google Fonts can't be reached. */
async function loadFont(name: string, family: string, weight: 400 | 600, text: string) {
  try {
    const query = `family=${family}:wght@${weight}&text=${encodeURIComponent(text)}`;
    const css = await (await fetch(`https://fonts.googleapis.com/css2?${query}`)).text();
    const url = css.match(/src: url\((.+?)\) format\('(?:opentype|truetype)'\)/)?.[1];
    if (!url) return [];

    return [{ name, weight, data: await (await fetch(url)).arrayBuffer() }];
  } catch {
    return [];
  }
}
