import type { Metadata } from "next";
import { BackHeader } from "@/components/back-header";
import { formatPostDate, getPost, getPosts } from "@/lib/blog";

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
            <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
              {post.title}
            </h1>
            <time
              dateTime={post.publishedAt}
              className="mt-4 block font-mono text-sm text-muted"
            >
              {formatPostDate(post.publishedAt)}
            </time>
          </header>

          <Content />
        </article>
      </main>
    </>
  );
}
