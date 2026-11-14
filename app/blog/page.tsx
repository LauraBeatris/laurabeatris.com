import type { Metadata } from "next";
import Link from "next/link";
import { BackHeader } from "@/components/back-header";
import { formatPostDate, getPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — Laura Beatris",
  description: "Writing by Laura Beatris.",
};

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <>
      <BackHeader href="/" label="@lauradotjs" />

      <main className="flex flex-1 flex-col gap-16 py-8">
        <h1 className="title-depth text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
          <span>Blog</span>
        </h1>

        {posts.length === 0 ? (
          <p className="text-lg text-muted">No posts yet.</p>
        ) : (
          <ul className="flex flex-col">
            {posts.map(({ slug, metadata: post }) => (
              <li key={slug} className="border-t border-border">
                <Link
                  href={`/blog/${slug}`}
                  className="group flex items-baseline justify-between gap-4 py-4"
                >
                  <span className="text-pretty text-lg font-medium underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
                    {post.title}
                  </span>
                  <time
                    dateTime={post.publishedAt}
                    className="shrink-0 text-right font-mono text-sm text-muted"
                  >
                    {formatPostDate(post.publishedAt)}
                  </time>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </>
  );
}
