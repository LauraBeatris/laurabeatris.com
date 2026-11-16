import type { Metadata } from "next";
import { BackHeader } from "@/components/back-header";
import { formatPostDate, getPost, getPosts } from "@/lib/blog";
import { jsonLdScript, pageMetadata, personJsonLd } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

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

  return pageMetadata({
    title: `${post.title} — Laura Beatris`,
    description: post.description,
    path: `/blog/${slug}`,
    card: slug,
    openGraph: {
      type: "article",
      publishedTime: post.publishedAt,
      authors: [SITE_URL],
    },
  });
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const { Content, metadata: post } = await getPost(slug);
  const url = `${SITE_URL}/blog/${slug}`;
  const jsonLd = {
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    url,
    mainEntityOfPage: url,
    image: `${url}/opengraph-image`,
    author: personJsonLd,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
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
