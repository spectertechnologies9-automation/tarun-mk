import { Globe, Mail } from "lucide-react";
import type { ReactNode } from "react";
import { links, site } from "@/config/site";
import { ventures } from "@/data/ventures";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./BrandIcons";

type Item = { label: string; href: string; icon: ReactNode };

/**
 * Editable social links (src/config/site.ts, src/data/ventures.ts).
 * Entries without a URL render as inactive placeholders, or are hidden if `hideUnsetLinks`.
 */
export function Socials() {
  const items: Item[] = [
    { label: "LinkedIn", href: site.socials.linkedin, icon: <LinkedinIcon /> },
    { label: "GitHub", href: site.socials.github, icon: <GithubIcon /> },
    { label: "Instagram", href: site.socials.instagram, icon: <InstagramIcon /> },
    { label: "Email", href: links.email, icon: <Mail size={20} aria-hidden="true" /> },
    ...ventures.map((v) => ({ label: `${v.name} website`, href: v.website, icon: <Globe size={20} aria-hidden="true" /> })),
  ];
  const visible = site.hideUnsetLinks ? items.filter((i) => i.href) : items;

  return (
    <ul className="flex flex-wrap items-center gap-2.5">
      {visible.map((i) => (
        <li key={i.label}>
          {i.href ? (
            <a
              href={i.href}
              target={i.href.startsWith("mailto:") ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={i.label}
              title={i.label}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-paper transition hover:-translate-y-1 hover:border-acid hover:bg-acid hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid"
            >
              {i.icon}
            </a>
          ) : (
            <span
              aria-label={`${i.label} (coming soon)`}
              title={`${i.label} — coming soon`}
              className="flex h-12 w-12 cursor-not-allowed items-center justify-center rounded-full border border-dashed border-white/15 text-paper/30"
            >
              {i.icon}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
