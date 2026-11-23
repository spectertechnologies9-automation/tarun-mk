import { ArrowUpRight, Download, MessageCircle, Phone } from "lucide-react";
import { links, site } from "@/config/site";
import { ContactForm } from "./ContactForm";
import { Heading } from "./Heading";
import { Magnetic } from "./Magnetic";
import { Reveal } from "./Reveal";
import { Socials } from "./Socials";

export function Contact() {
  return (
    <section id="contact" className="sheet overflow-hidden bg-navy-950 pb-24 pt-24 sm:pb-32 sm:pt-32">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_50%_at_30%_20%,#000,transparent)]" aria-hidden="true" />
      <div className="container-x relative">
        <p className="eyebrow mb-5 flex items-center gap-3 text-acid">
          <span className="h-[3px] w-8 bg-acid" aria-hidden="true" /> contact
        </p>
        <Heading
          className="font-display text-[clamp(2.8rem,9vw,8rem)] font-bold leading-[0.9] tracking-[-0.035em]"
          lines={[{ text: "Let’s build" }, { text: "something", className: "outline-text [--stroke:#f2eee4]" }, { text: "intelligent.", className: "text-acid" }]}
        />

        <div className="mt-14 grid gap-10 lg:mt-20 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
          <Reveal>
            <p className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{site.name}</p>
            <a href={links.tel} className="mt-1 inline-block font-mono text-xl text-acid transition hover:text-white sm:text-2xl">
              {site.contact.phoneDisplay}
            </a>

            <div className="mt-9 grid gap-3">
              <Magnetic className="block" strength={0.12}>
                <a
                  href={links.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-h-20 items-center justify-between rounded-3xl bg-[#25d366] px-6 font-display text-xl font-bold text-ink transition hover:bg-acid sm:text-2xl"
                >
                  <span className="flex items-center gap-3">
                    <MessageCircle size={26} aria-hidden="true" /> Let’s Talk on WhatsApp
                  </span>
                  <ArrowUpRight size={26} className="transition group-hover:rotate-45" aria-hidden="true" />
                </a>
              </Magnetic>
              <div className="grid gap-3 sm:grid-cols-2">
                <Magnetic className="block" strength={0.15}>
                  <a href={links.tel} className="flex min-h-16 items-center gap-3 rounded-3xl bg-cobalt px-6 font-display text-lg font-bold transition hover:bg-cobalt-400">
                    <Phone size={22} aria-hidden="true" /> Call Me
                  </a>
                </Magnetic>
                <Magnetic className="block" strength={0.15}>
                  <a
                    href={links.vcard}
                    download={links.vcardFilename}
                    type="text/vcard"
                    className="flex min-h-16 items-center gap-3 rounded-3xl bg-paper px-6 font-display text-lg font-bold text-ink transition hover:bg-acid"
                  >
                    <Download size={22} aria-hidden="true" /> Save My Contact
                  </a>
                </Magnetic>
              </div>
            </div>

            <div className="mt-10 border-t border-white/10 pt-7">
              <p className="eyebrow mb-4 text-paper/45">find me online</p>
              <Socials />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="relative">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
