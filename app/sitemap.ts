import type { MetadataRoute } from "next";
import { getPosts } from "@/lib/blog";
import { SITE_URL } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts();
  const latestPost = posts[0]?.metadata.publishedAt;

  return [
    { url: SITE_URL, priority: 1 },
    { url: `${SITE_URL}/blog`, lastModified: latestPost, priority: 0.8 },
    ...posts.map(({ slug, metadata }) => ({
      url: `${SITE_URL}/blog/${slug}`,
      lastModified: metadata.publishedAt,
      priority: 0.7,
    })),
    { url: `${SITE_URL}/talks`, priority: 0.6 },
    { url: `${SITE_URL}/ask`, priority: 0.5 },
  ];
}
