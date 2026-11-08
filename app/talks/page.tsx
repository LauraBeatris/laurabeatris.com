import type { Metadata } from "next";
import { BackHeader } from "@/components/back-header";
import { SiteFooter } from "@/components/site-footer";
import { podcasts, talks, type Appearance } from "@/content/talks";

export const metadata: Metadata = {
  title: "Talks & Podcasts — Laura Beatris",
  description:
    "Talks and podcast appearances by Laura Beatris on React, TypeScript, GraphQL, testing, and continuous learning.",
};

function ContentSection({
  title,
  items,
}: {
  title: string;
  items: Appearance[];
}) {
  return (
    <section className="w-full">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted">
        {title}
      </h2>
      <ul className="mt-6 flex flex-col">
        {items.map((item) => (
          <li key={item.url} className="border-t border-border">
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-baseline justify-between gap-4 py-4"
            >
              <span className="text-pretty text-lg font-medium underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
                {item.title}
              </span>
              <span className="shrink-0 text-right font-mono text-sm text-muted">
                {item.subtitle}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function TalksPage() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col px-6">
      <BackHeader href="/" label="@lauradotjs" />

      <main className="flex flex-1 flex-col gap-16 py-8">
        <div>
          <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
            Talks &amp; Podcasts
          </h1>
          <p className="mt-4 text-pretty text-lg text-muted">
            Conversations and conference talks on React, TypeScript, GraphQL,
            and learning in the open.
          </p>
        </div>

        <ContentSection title="Talks" items={talks} />
        <ContentSection title="Podcasts" items={podcasts} />
      </main>

      <SiteFooter />
    </div>
  );
}
