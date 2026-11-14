import { Signature } from "@/components/signature";

const links = [
  { label: "X", href: "https://x.com/lauradotjs" },
  { label: "GitHub", href: "https://github.com/LauraBeatris" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/laurabeatris" },
  { label: "Email", href: "mailto:contato@laurabeatris.com" },
];

export function SiteFooter({
  showSignature = true,
}: {
  showSignature?: boolean;
}) {
  return (
    <footer>
      {showSignature && <Signature className="mb-6 w-[7.5rem]" />}
      <div className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-sm text-muted">
          © {new Date().getFullYear()} Laura Beatris
        </p>
        <nav aria-label="Contact and social links">
          <ul className="flex items-center gap-5">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  // A mailto opens the mail app, so it has no tab to open.
                  {...(link.href.startsWith("http") && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
}
