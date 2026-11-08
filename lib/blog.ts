import { readdir } from "node:fs/promises";
import path from "node:path";
import type { MDXContent } from "mdx/types";

export type PostMetadata = {
  title: string;
  description: string;
  /** ISO date, e.g. "2026-11-08". */
  publishedAt: string;
  /** Drafts appear in `next dev` and Vercel previews, but not in production. */
  draft?: boolean;
};

type PostModule = {
  default: MDXContent;
  metadata: PostMetadata;
};

const POSTS_DIRECTORY = path.join(process.cwd(), "content/blog");

const showDrafts =
  process.env.NODE_ENV !== "production" || process.env.VERCEL_ENV === "preview";

export async function getPost(slug: string) {
  const post = (await import(`@/content/blog/${slug}/post.mdx`)) as PostModule;

  return { slug, Content: post.default, metadata: post.metadata };
}

export async function getPosts() {
  const entries = await readdir(POSTS_DIRECTORY, { withFileTypes: true });
  const posts = await Promise.all(
    entries.filter((entry) => entry.isDirectory()).map((entry) => getPost(entry.name)),
  );

  return posts
    .filter((post) => showDrafts || !post.metadata.draft)
    .sort((a, b) => b.metadata.publishedAt.localeCompare(a.metadata.publishedAt));
}

export function formatPostDate(publishedAt: string) {
  return new Intl.DateTimeFormat("en", {
    dateStyle: "long",
    timeZone: "UTC",
  }).format(new Date(publishedAt));
}
