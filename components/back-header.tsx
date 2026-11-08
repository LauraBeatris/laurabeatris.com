import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export function BackHeader({ href, label }: { href: string; label: string }) {
  return (
    <header className="flex items-center justify-between py-8">
      <Link
        href={href}
        className="font-mono text-sm text-muted transition-colors hover:text-foreground"
      >
        ← {label}
      </Link>
      <ThemeToggle />
    </header>
  );
}
