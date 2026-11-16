import { getPosts } from "@/lib/blog";
import { FEED_PATH, SITE_NAME } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

// Built once per deploy, like the posts it lists
export const dynamic = "force-static";

function escapeXml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** The blog as RSS, for feed readers and for Search Console to find new posts sooner. */
export async function GET() {
  const posts = await getPosts();

  const items = posts
    .map(({ slug, metadata }) => {
      const url = `${SITE_URL}/blog/${slug}`;

      return `    <item>
      <title>${escapeXml(metadata.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(metadata.description)}</description>
      <pubDate>${new Date(metadata.publishedAt).toUTCString()}</pubDate>
    </item>`;
    })
    .join("\n");

  const lastBuildDate = posts[0]
    ? new Date(posts[0].metadata.publishedAt).toUTCString()
    : new Date().toUTCString();

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_NAME} — Blog</title>
    <link>${SITE_URL}/blog</link>
    <description>Writing by Laura Beatris on product engineering, developer tools, and building software with taste.</description>
    <language>en</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}${FEED_PATH}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
