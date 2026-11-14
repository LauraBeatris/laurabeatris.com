import type { ReactNode } from "react";
import { AnyLink } from "@/components/ask/any-link";

type Token = { text: string; isBold: boolean; href?: string };

const linkClassName =
  "font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent";

/**
 * The only formatting the agent is asked for: **bold** and [links](url).
 *
 * It reads left to right and never looks back, so while an answer is still
 * streaming, the tokens already on the page keep their shape as more text
 * arrives. Bold that hasn't closed yet is already bold.
 */
function tokenize(paragraph: string, isStreaming: boolean): Token[] {
  const tokens: Token[] = [];
  let isBold = false;
  let rest = paragraph;

  const push = (text: string, href?: string) => {
    if (text) tokens.push({ text, isBold, href });
  };

  while (rest) {
    const next = rest.search(/\*\*|\[/);

    if (next === -1) {
      push(rest);
      break;
    }

    push(rest.slice(0, next));
    rest = rest.slice(next);

    if (rest.startsWith("**")) {
      isBold = !isBold;
      rest = rest.slice(2);
      continue;
    }

    const link = rest.match(/^\[([^\]]*)\]\(([^)\s]*)\)/);

    if (link) {
      push(link[1], safeHref(link[2]));
      rest = rest.slice(link[0].length);
      continue;
    }

    // Still arriving: hold the link back until it's whole, then ink it in at once
    if (isStreaming && /^\[[^\]]*(\]\(?[^)\s]*)?$/.test(rest)) break;

    push("[");
    rest = rest.slice(1);
  }

  return tokens;
}

/** The model writes the address, so only let through what a link should be. */
function safeHref(href: string) {
  if (href.startsWith("/") && !href.startsWith("//")) return href;
  if (/^https?:\/\//i.test(href)) return href;
  return undefined;
}

function Words({ text }: { text: string }) {
  // Each word is its own element, so it's inked in once, when it arrives
  return text.split(/(\s+)/).map((piece, index) =>
    /^\s*$/.test(piece) ? (
      piece.includes("\n") ? (
        <br key={index} />
      ) : (
        piece
      )
    ) : (
      <span key={index} className="ink-word">
        {piece}
      </span>
    ),
  );
}

function InkToken({ token }: { token: Token }) {
  let content: ReactNode = <Words text={token.text} />;

  if (token.isBold) {
    content = <strong className="font-semibold">{content}</strong>;
  }

  if (!token.href) return content;

  return (
    <AnyLink href={token.href} className={linkClassName}>
      {content}
    </AnyLink>
  );
}

export function InkText({
  text,
  isStreaming,
}: {
  text: string;
  isStreaming: boolean;
}) {
  // A lone asterisk at the very end is half of a ** that's still on its way
  const visible = isStreaming ? text.replace(/\*$/, "") : text;
  const paragraphs = visible.split(/\n{2,}/).filter((paragraph) => paragraph.trim());

  return paragraphs.map((paragraph, index) => (
    <p key={index} className="mt-3 text-pretty text-base leading-7 first:mt-0">
      {tokenize(paragraph.trim(), isStreaming).map((token, tokenIndex) => (
        <InkToken key={tokenIndex} token={token} />
      ))}
    </p>
  ));
}
