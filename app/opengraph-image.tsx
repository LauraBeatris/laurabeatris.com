import { ImageResponse } from "next/og";
import { loadOgFonts, OG_SIZE, ogCard, SITE_CARD, signatureSvg } from "@/lib/og-card";

export const alt = "Laura Beatris";
export const size = OG_SIZE;
export const contentType = "image/png";

/** The still version of the site card; `scripts/og-video.ts` writes the signature in. */
export default async function Image() {
  return new ImageResponse(ogCard({ ...SITE_CARD, signature: signatureSvg() }), {
    ...size,
    fonts: await loadOgFonts(SITE_CARD),
  });
}
