const socials = [
  { label: "X", href: "https://x.com/lauradotjs" },
  { label: "GitHub", href: "https://github.com/LauraBeatris" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/laurabeatris" },
];

export function SiteFooter() {
  return (
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
  );
}
