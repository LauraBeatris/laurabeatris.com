import { SweepLink } from "@/components/sweep-link";
import { ThemeToggle } from "@/components/theme-toggle";

export function BackHeader({ href, label }: { href: string; label: string }) {
  return (
    <header className="flex items-center justify-between py-8">
      <SweepLink
        href={href}
        back
        className="font-mono text-sm text-muted transition-colors hover:text-foreground"
      >
        ← {label}
      </SweepLink>
      <ThemeToggle />
    </header>
  );
}
