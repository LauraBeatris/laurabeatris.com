import Link from "next/link";
import { Greeting } from "@/components/greeting";
import { ResendLink } from "@/components/resend-link";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import { getPosts } from "@/lib/blog";

export default async function Home() {
  const posts = await getPosts();

  return (
    <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col overflow-x-clip px-6">
      <header className="flex items-center justify-between py-8">
        <span className="font-mono text-sm text-muted">@lauradotjs</span>
        <ThemeToggle />
      </header>

      <main className="flex flex-1 flex-col justify-center py-16">
        <p className="mb-6 font-mono text-sm">
          <Greeting />
        </p>

        <h1 className="text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
          I&apos;m Laura Beatris
        </h1>

        <p className="mt-4 text-lg text-muted">
          Product Engineer at <ResendLink />
        </p>

        <div className="mt-10 space-y-5 text-pretty text-lg leading-relaxed">
          <p>
            I build developer tools — the kind of infrastructure that stays out
            of the way so people can ship. I care about{" "}
            <span className="font-medium">immersion</span> and{" "}
            <span className="font-medium">freedom</span> as expressions of art,
            and I try to bring that same intention into the software I make.
          </p>
          <p className="text-muted">
            When I&apos;m not building, I&apos;m usually learning in the open
            and sharing what I find in{" "}
            <Link
              href="/talks"
              className="font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
            >
              talks and podcasts
            </Link>
            .
          </p>
          {posts.length > 0 && (
            <p className="text-muted">
              I also write on my{" "}
              <Link
                href="/blog"
                className="font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
              >
                blog
              </Link>
              .
            </p>
          )}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
