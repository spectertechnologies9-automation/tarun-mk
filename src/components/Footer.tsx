import { Download, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { links, site } from "@/config/site";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "./BrandIcons";

function FooterLink({ href, children, external, download }: { href: string; children: ReactNode; external?: boolean; download?: string }) {
  if (!href) {
    return (
      <span className="flex min-h-9 cursor-not-allowed items-center gap-2 text-sm text-paper/25" title="Coming soon">
        {children}
      </span>
    );
  }
  return (
    <a
      href={href}
      download={download}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="flex min-h-9 items-center gap-2 text-sm text-paper/70 transition hover:text-acid"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const social = [
    { label: "LinkedIn", href: site.socials.linkedin, icon: <LinkedinIcon width={16} height={16} /> },
    { label: "GitHub", href: site.socials.github, icon: <GithubIcon width={16} height={16} /> },
    { label: "Instagram", href: site.socials.instagram, icon: <InstagramIcon width={16} height={16} /> },
  ].filter((s) => !site.hideUnsetLinks || s.href);

  return (
    <footer className="relative overflow-hidden bg-ink">
      <div className="container-x pt-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">{site.name}</p>
            <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-acid">{site.roles.join(" | ")}</p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-paper/55">“{site.footerQuote}”</p>
          </div>
          <div>
            <p className="eyebrow mb-3 text-paper/40">Contact</p>
            <FooterLink href={links.whatsapp} external>
              <MessageCircle size={16} aria-hidden="true" /> WhatsApp
            </FooterLink>
            <FooterLink href={links.tel}>
              <Phone size={16} aria-hidden="true" /> {site.contact.phoneDisplay}
            </FooterLink>
            <FooterLink href={links.vcard} download={links.vcardFilename}>
              <Download size={16} aria-hidden="true" /> Save Contact
            </FooterLink>
          </div>
          <div>
            <p className="eyebrow mb-3 text-paper/40">Elsewhere</p>
            {social.map((s) => (
              <FooterLink key={s.label} href={s.href} external>
                {s.icon} {s.label}
              </FooterLink>
            ))}
          </div>
        </div>
        <div className="mt-12 flex items-center justify-between border-t border-white/10 pt-5 font-mono text-[11px] text-paper/35">
          <span>{site.copyright}</span>
          <span className="hidden sm:inline">{site.tagline}</span>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="outline-text pointer-events-none mt-6 translate-y-[18%] select-none whitespace-nowrap text-center font-display text-[19.5vw] font-bold leading-[0.8] tracking-[-0.05em] [--stroke:rgba(242,238,228,.18)]"
      >
        TARUN M K
      </p>
    </footer>
  );
}
