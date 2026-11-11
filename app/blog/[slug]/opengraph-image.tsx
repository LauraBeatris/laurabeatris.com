import { ImageResponse } from "next/og";
import { getPost, getPosts } from "@/lib/blog";
import { loadOgFonts, OG_SIZE, ogCard, signatureSvg } from "@/lib/og-card";

export const alt = "A post by Laura Beatris";
export const size = OG_SIZE;
export const contentType = "image/png";
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map(({ slug }) => ({ slug }));
}

/** The still version of the card; `scripts/og-video.ts` writes the signature in. */
export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { metadata: post } = await getPost(slug);

  return new ImageResponse(ogCard({ ...post, signature: signatureSvg() }), {
    ...size,
    fonts: await loadOgFonts(post),
  });
}
