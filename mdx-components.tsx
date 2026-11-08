import type { ComponentProps } from "react";
import type { MDXComponents } from "mdx/types";
import Link from "next/link";
import { Demo } from "@/components/demo";

const linkClassName =
  "font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent";

function MdxLink({ href = "", children }: ComponentProps<"a">) {
  if (href.startsWith("/") || href.startsWith("#")) {
    return (
      <Link href={href} className={linkClassName}>
        {children}
      </Link>
    );
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={linkClassName}
    >
      {children}
    </a>
  );
}

const components = {
  Demo,
  a: MdxLink,
  h2: (props) => (
    <h2
      className="mt-12 text-pretty text-2xl font-semibold tracking-tight"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 text-pretty text-xl font-semibold tracking-tight"
      {...props}
    />
  ),
  p: (props) => (
    <p
      className="mt-5 text-pretty text-lg leading-relaxed first:mt-0"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-lg leading-relaxed"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-lg leading-relaxed"
      {...props}
    />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-5 border-l-2 border-border pl-4 text-muted"
      {...props}
    />
  ),
  hr: () => <hr className="my-12 border-border" />,
  code: (props) => (
    <code
      className="rounded bg-border/60 px-1.5 py-0.5 font-mono text-[0.875em]"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-5 overflow-x-auto rounded-xl border border-border p-4 font-mono text-sm leading-relaxed [&>code]:bg-transparent [&>code]:p-0 [&>code]:text-[1em]"
      {...props}
    />
  ),
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
