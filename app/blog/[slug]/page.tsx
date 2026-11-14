import type { Metadata } from "next";
import { BackHeader } from "@/components/back-header";
import { formatPostDate, getPost, getPosts } from "@/lib/blog";
import { OG_SIZE } from "@/lib/og-card";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts();

  return posts.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const { metadata: post } = await getPost(slug);
  const title = `${post.title} — Laura Beatris`;

  return {
    title,
    description: post.description,
    openGraph: {
      title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      // Written by scripts/og-video.ts: the card, with the signature writing
      // itself. Absolute, since Next doesn't resolve video URLs like images.
      videos: [
        {
          url: `https://laurabeatris.com/og/${slug}.mp4`,
          type: "video/mp4",
          width: OG_SIZE.width,
          height: OG_SIZE.height,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: post.description,
      creator: "@lauradotjs",
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { Content, metadata: post } = await getPost(slug);

  return (
    <>
      <BackHeader href="/blog" label="Blog" />

      <main className="flex-1 pb-16 pt-8">
        <article>
          <header className="mb-12">
            <h1 className="title-depth text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
              <span>{post.title}</span>
            </h1>
            <time
              dateTime={post.publishedAt}
              className="mt-4 block font-mono text-sm text-muted"
            >
              {formatPostDate(post.publishedAt)}
            </time>
            <p className="mt-4 text-pretty text-xl leading-relaxed text-muted">
              {post.description}
            </p>
          </header>

          <Content />
        </article>
      </main>
    </>
  );
}
