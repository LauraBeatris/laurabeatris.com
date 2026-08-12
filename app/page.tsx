import { Greeting } from "@/components/greeting";
import { FlowVerbs } from "@/components/flow-verbs";
import { ThemeToggle } from "@/components/theme-toggle";

const socials = [
  { label: "X", href: "https://x.com/lauradotjs" },
  { label: "GitHub", href: "https://github.com/LauraBeatris" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/laurabeatris" },
];

export default function Home() {
  return (
    <div className="mx-auto flex min-h-dvh max-w-[640px] flex-col px-6">
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
          Product Engineer at{" "}
          <a
            href="https://resend.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-foreground underline decoration-border decoration-2 underline-offset-4 transition-colors hover:decoration-accent"
          >
            Resend
          </a>
        </p>

        <div className="mt-10 space-y-5 text-pretty text-lg leading-relaxed">
          <p>
            I build developer tools — the kind of infrastructure that stays out
            of the way so people can ship. I care about{" "}
            <span className="font-medium">immersion</span> and{" "}
            <span className="font-medium">freedom</span> as expressions of art,
            and I try to bring that same intention into the software I make.
          </p>
          <p className="flex flex-wrap items-baseline gap-x-1.5">
            <span className="text-muted">Following the flow of</span>
            <FlowVerbs />
          </p>
        </div>
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
