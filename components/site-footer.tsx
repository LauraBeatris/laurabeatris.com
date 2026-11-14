import { EmailMe } from "@/components/email-me";
import { Signature } from "@/components/signature";
import { socials } from "@/content/laura";

export function SiteFooter({
  showSignature = true,
}: {
  showSignature?: boolean;
}) {
  return (
    <footer>
      {showSignature && <Signature className="mb-6 w-[7.5rem]" />}
      <div
        data-composer-anchor
        className="relative flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between"
      >
        <p className="font-mono text-sm text-muted">
          © {new Date().getFullYear()} Laura Beatris
        </p>
        <nav aria-label="Contact and social links">
          <ul className="flex items-center gap-5">
            {socials.map((link) => (
              <li key={link.label}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <EmailMe />
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
