import type { CSSProperties, ReactNode } from "react";
import { AnyLink } from "@/components/ask/any-link";
import type { AskLauraUIMessage } from "@/lib/ask/agent";

type Part = AskLauraUIMessage["parts"][number];
export type ToolPart = Extract<Part, { type: `tool-${string}` }>;

/** What the agent is doing while a card's data is on its way. */
export const TOOL_LABELS: Record<ToolPart["type"], string> = {
  "tool-showTalks": "Pulling out my talks",
  "tool-showWriting": "Finding my writing",
  "tool-showCareer": "Sketching my career",
  "tool-showContact": "Looking up where to find me",
  "tool-showGithubActivity": "Checking GitHub",
};

export function isToolPart(part: Part): part is ToolPart {
  return part.type.startsWith("tool-");
}

/** A sheet the agent pulls out mid-answer. Its outline is drawn on, like the post sketches. */
function Card({ label, children }: { label: string; children: ReactNode }) {
  return (
    <section aria-label={label} className="ask-card relative mt-5 p-5 first:mt-0">
      <svg aria-hidden className="ask-card-outline">
        <rect pathLength={1} className="pen-draw" />
      </svg>
      {children}
    </section>
  );
}

function CardHeading({ children, index }: { children: ReactNode; index: number }) {
  return (
    <h3
      className="ask-rise font-mono text-xs uppercase tracking-widest text-muted [&:not(:first-child)]:mt-5"
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
      <span className="flex items-baseline justify-between gap-4">
        <span className="text-pretty font-medium underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-accent">
          {title}
        </span>
        {detail && (
          <span className="shrink-0 text-right font-mono text-xs text-muted">
            {detail}
          </span>
        )}
      </span>
      {note && <span className="mt-1 block text-pretty text-sm text-muted">{note}</span>}
    </>
  );
  const className = "group block py-3";

  return (
    <li
      className="ask-rise border-t border-border first:border-t-0"
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
  // Until the data lands, the status line under the question says what's happening
  if (part.state !== "output-available") return null;

  switch (part.type) {
    case "tool-showTalks": {
      const { talks, podcasts } = part.output;
      const hasBoth = talks.length > 0 && podcasts.length > 0;

      return (
        <Card label="Talks and podcasts">
          {hasBoth && <CardHeading index={0}>Talks</CardHeading>}
          <ul className={hasBoth ? "mt-1" : "-my-3"}>
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
          <ul className={hasBoth ? "-mb-3 mt-1" : "-my-3"}>
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
          <ul className="-my-3">
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
          <ol className="ask-timeline">
            {part.output.career.map((entry, index) => (
              <li
                key={entry.company}
                className="ask-rise relative pb-5 pl-6 last:pb-0"
                style={{ "--item": index } as CSSProperties}
              >
                <span aria-hidden className="ask-timeline-dot" />
                <p className="flex items-baseline justify-between gap-4">
                  <span className="font-medium">
                    {entry.role}
                    <span className="font-normal text-muted"> at </span>
                    {entry.url ? (
                      <AnyLink
                        href={entry.url}
                        className="underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
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
                <p className="mt-1 text-pretty text-sm text-muted">
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
          <ul className="-my-3">
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
          <ul className="-my-3">
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
