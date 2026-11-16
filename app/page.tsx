import type { Metadata } from "next";
import Link from "next/link";
import { Greeting } from "@/components/greeting";
import { ResendLink } from "@/components/resend-link";
import { Signature } from "@/components/signature";
import { SiteFooter } from "@/components/site-footer";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  jsonLdScript,
  pageMetadata,
  personJsonLd,
  SITE_NAME,
} from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

export const metadata: Metadata = pageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
});

const jsonLd = {
  "@graph": [
    personJsonLd,
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      author: { "@id": personJsonLd["@id"] },
    },
  ],
};

export default function Home() {
  return (
    <div className="mx-auto flex min-h-svh max-w-[640px] flex-col px-6">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdScript(jsonLd) }}
      />
      <header className="flex items-center justify-between py-8">
        <span className="font-mono text-sm text-muted">@lauradotjs</span>
        <ThemeToggle />
      </header>

      {/* Clipped here, where the paper plane flies off, and not on the whole page:
          the footer's composer casts a shadow past this edge */}
      <main className="-mx-6 flex flex-1 flex-col justify-center overflow-x-clip px-6 py-16">
        <p className="mb-6 font-mono text-sm">
          <Greeting />
        </p>

        <h1 className="title-depth text-pretty text-4xl font-semibold tracking-tight sm:text-5xl">
          <span>I&apos;m Laura Beatris</span>
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
            through{" "}
            <Link
              href="/blog"
              className="font-normal text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent active:decoration-accent"
            >
              <span className="paper-word">writing</span>
            </Link>
            ,{" "}
            <Link
              href="/talks"
              className="font-normal text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent active:decoration-accent"
            >
              <span className="paper-word">talks and podcasts</span>
            </Link>
            . Curious about anything else?{" "}
            <Link
              href="/ask"
              className="font-normal text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
            >
              <span className="paper-word">Ask me</span>
            </Link>
            .
          </p>
        </div>

        <Signature className="mt-10 w-[7.5rem]" />
      </main>

      <SiteFooter showSignature={false} />
    </div>
  );
}
