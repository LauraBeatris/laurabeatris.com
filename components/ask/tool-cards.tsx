import type { CSSProperties, ReactNode } from "react";
import { AnyLink } from "@/components/ask/any-link";
import type { AskLauraUIMessage } from "@/lib/ask/agent";

type Part = AskLauraUIMessage["parts"][number];
export type ToolPart = Extract<Part, { type: `tool-${string}` }>;

export type Source = {
  /** What the status line says while this is being fetched. */
  working: string;
  /** How the source is named once the answer has used it. */
  name: string;
  /** Where it really lives, so a visitor can check the answer against it. */
  href: string;
  /** Questions that go one step further from an answer that used this. */
  followUps: string[];
};

const REPOSITORY = "https://github.com/LauraBeatris/laurabeatris.com/blob/master";

/** Every answer starts from the notes; a tool adds its own source on top. */
export const NOTES_SOURCE: Source = {
  working: "Thinking",
  name: "My notes",
  href: `${REPOSITORY}/content/laura.ts`,
  followUps: [
    "Where are you from?",
    "How did you get into software?",
    "What stack do you reach for?",
    "How do you think about taste?",
    "Show me your talks",
    "Where can I find you?",
  ],
};

export const TOOL_SOURCES: Record<ToolPart["type"], Source> = {
  "tool-showTalks": {
    working: "Pulling out my talks",
    name: "My talks and podcasts",
    href: "/talks",
    followUps: [
      "Which topics do you speak about most?",
      "Which podcasts have you been on?",
      "What have you written?",
    ],
  },
  "tool-showWriting": {
    working: "Finding my writing",
    name: "My blog",
    href: "/blog",
    followUps: [
      "Where do you disagree with Rick Rubin?",
      "How do you think about taste?",
      "Show me your talks",
    ],
  },
  "tool-showCareer": {
    working: "Sketching my career",
    name: "My career",
    href: `${REPOSITORY}/content/laura.ts`,
    followUps: [
      "Why did you join Resend?",
      "How did you get into software?",
      "What advice do you give engineers?",
    ],
  },
  "tool-showContact": {
    working: "Looking up where to find me",
    name: "My links",
    href: `${REPOSITORY}/content/laura.ts`,
    followUps: [
      "Where are you based?",
      "What are you building at Resend?",
      "What have you written?",
    ],
  },
  "tool-showGithubActivity": {
    working: "Checking GitHub",
    name: "GitHub, live",
    href: "https://github.com/LauraBeatris",
    followUps: [
      "How was this agent built?",
      "What is this site built with?",
      "Show me your talks",
    ],
  },
};

export function isToolPart(part: Part): part is ToolPart {
  return part.type.startsWith("tool-");
}

/**
 * What the agent pulls out mid-answer. Ruled like the lists on /talks and
 * /blog, and written on the same page as the answer it belongs to.
 */
function Card({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section aria-label={label} className="ask-card ask-rise">
      {children}
    </section>
  );
}

function CardHeading({ children, index }: { children: ReactNode; index: number }) {
  return (
    <h3
      className="ask-rise font-mono text-[11px] uppercase tracking-widest text-muted [&:not(:first-child)]:mt-5"
      style={{ "--item": index } as CSSProperties}
    >
      {children}
    </h3>
  );
}

function CardRow({
  href,
  title,
  detail,
  note,
  index,
}: {
  href?: string;
  title: string;
  detail?: string | null;
  note?: string | null;
  index: number;
}) {
  const content = (
    <>
      <span className="flex flex-col gap-x-4 gap-y-0.5 sm:flex-row sm:items-baseline sm:justify-between">
        <span className="text-pretty text-[15px] underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent group-active:decoration-accent">
          {title}
        </span>
        {detail && (
          <span className="shrink-0 font-mono text-xs text-muted sm:text-right">
            {detail}
          </span>
        )}
      </span>
      {note && (
        <span className="mt-1 block text-pretty text-sm text-muted">{note}</span>
      )}
    </>
  );
  const className = "group block py-2.5";

  return (
    <li
      className="ask-rise border-t border-border"
      style={{ "--item": index } as CSSProperties}
    >
      {href ? (
        <AnyLink href={href} className={className}>
          {content}
        </AnyLink>
      ) : (
        <div className={className}>{content}</div>
      )}
    </li>
  );
}

export function ToolCard({ part }: { part: ToolPart }) {
  // Until the data lands, the composer's status line says what's happening
  if (part.state !== "output-available") return null;

  switch (part.type) {
    case "tool-showTalks": {
      const { talks, podcasts } = part.output;
      const hasBoth = talks.length > 0 && podcasts.length > 0;

      return (
        <Card label="Talks and podcasts">
          {hasBoth && <CardHeading index={0}>Talks</CardHeading>}
          <ul className={hasBoth ? "mt-2" : undefined}>
            {talks.map((talk, index) => (
              <CardRow
                key={talk.url}
                href={talk.url}
                title={talk.title}
                detail={talk.subtitle}
                index={index + 1}
              />
            ))}
          </ul>
          {hasBoth && (
            <CardHeading index={talks.length + 1}>Podcasts</CardHeading>
          )}
          <ul className={hasBoth ? "mt-2" : undefined}>
            {podcasts.map((podcast, index) => (
              <CardRow
                key={podcast.url}
                href={podcast.url}
                title={podcast.title}
                detail={podcast.subtitle}
                index={talks.length + index + 2}
              />
            ))}
          </ul>
        </Card>
      );
    }

    case "tool-showWriting":
      if (part.output.posts.length === 0) return null;

      return (
        <Card label="Writing">
          <ul>
            {part.output.posts.map((post, index) => (
              <CardRow
                key={post.href}
                href={post.href}
                title={post.title}
                detail={post.publishedAt}
                note={post.description}
                index={index}
              />
            ))}
          </ul>
        </Card>
      );

    case "tool-showCareer":
      return (
        <Card label="Career">
          <ol className="ask-timeline border-t border-border pt-3.5">
            {part.output.career.map((entry, index) => (
              <li
                key={entry.company}
                className="ask-rise relative pb-4 pl-6 last:pb-0"
                style={{ "--item": index } as CSSProperties}
              >
                <span aria-hidden className="ask-timeline-dot" />
                <p className="flex items-baseline justify-between gap-4 text-[15px]">
                  <span>
                    {entry.role}
                    <span className="text-muted"> at </span>
                    {entry.url ? (
                      <AnyLink
                        href={entry.url}
                        className="underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent active:decoration-accent"
                      >
                        {entry.company}
                      </AnyLink>
                    ) : (
                      entry.company
                    )}
                  </span>
                  {entry.period && (
                    <span className="shrink-0 font-mono text-xs text-muted">
                      {entry.period}
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-pretty text-sm text-muted">
                  {entry.summary}
                </p>
              </li>
            ))}
          </ol>
        </Card>
      );

    case "tool-showContact":
      return (
        <Card label="Where to find me">
          <ul>
            {part.output.socials.map((social, index) => (
              <CardRow
                key={social.url}
                href={social.url}
                title={social.label}
                detail={social.handle}
                index={index}
              />
            ))}
          </ul>
        </Card>
      );

    case "tool-showGithubActivity":
      if (part.output.repos.length === 0) return null;

      return (
        <Card label="Recent GitHub activity">
          <ul>
            {part.output.repos.map((repo, index) => (
              <CardRow
                key={repo.url}
                href={repo.url}
                title={repo.name}
                detail={repo.language}
                note={repo.description}
                index={index}
              />
            ))}
          </ul>
        </Card>
      );
  }
}
