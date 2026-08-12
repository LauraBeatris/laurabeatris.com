import type { Metadata } from "next";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { getTalksPage, type Content } from "@/lib/cms";

export const metadata: Metadata = {
  title: "Talks & Podcasts — Laura Beatris",
  description:
    "Talks and podcast appearances by Laura Beatris on React, TypeScript, GraphQL, testing, and continuous learning.",
};

const socials = [
  { label: "X", href: "https://x.com/lauradotjs" },
  { label: "GitHub", href: "https://github.com/LauraBeatris" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/laurabeatris" },
];

function ContentSection({
  title,
  items,
}: {
  title: string;
  items: Content[];
}) {
  if (items.length === 0) return null;

  return (
    <section className="w-full">
      <h2 className="font-mono text-sm uppercase tracking-widest text-muted">
        {title}
      </h2>
      <ul className="mt-6 flex flex-col">
        {items.map((item) => (
          <li key={item.id} className="border-t border-border">
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

export default async function TalksPage() {
  const { talks, podcasts } = await getTalksPage();

  return (
    <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col px-6">
      <header className="flex items-center justify-between py-8">
        <Link
          href="/"
          className="font-mono text-sm text-muted transition-colors hover:text-foreground"
        >
          ← @lauradotjs
        </Link>
        <ThemeToggle />
      </header>

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

      <footer className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-sm text-muted">
          © {new Date().getFullYear()} Laura Beatris
        </p>
        <nav aria-label="Social links">
          <ul className="flex items-center gap-5">
            {socials.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </footer>
    </div>
  );
}
