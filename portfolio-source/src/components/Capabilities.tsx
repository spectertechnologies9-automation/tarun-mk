"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { capabilities, focusAreas, type Capability } from "@/data/capabilities";
import { techStack } from "@/data/tech-stack";
import { Icon } from "@/lib/icons";
import { CapabilityVisual } from "./CapabilityVisual";
import { Heading } from "./Heading";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";

const theme: Record<Capability["id"], { bg: string; fg: string; pill: string }> = {
  ai: { bg: "bg-cobalt", fg: "text-white", pill: "bg-white/15 text-white" },
  voice: { bg: "bg-violet-600", fg: "text-white", pill: "bg-white/15 text-white" },
  whatsapp: { bg: "bg-acid", fg: "text-ink", pill: "bg-ink/10 text-ink" },
  software: { bg: "bg-cyan-300", fg: "text-ink", pill: "bg-ink/10 text-ink" },
  automation: { bg: "bg-paper", fg: "text-ink", pill: "bg-ink/10 text-ink" },
  connected: { bg: "bg-navy-700", fg: "text-white", pill: "bg-white/10 text-white" },
};

function Detail({ c }: { c: Capability }) {
  const t = theme[c.id];
  return (
    <div className="flex h-full flex-col">
      <div className="mb-5 h-20 opacity-90 [&_*]:!stroke-current">
        <CapabilityVisual id={c.id} />
      </div>
      <p className="max-w-md text-[15px] leading-relaxed opacity-85">{c.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2">
        {c.items.map((it) => (
          <li key={it} className={`rounded-full px-3 py-1.5 text-[12.5px] font-medium ${t.pill}`}>
            {it}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Capabilities() {
  const [open, setOpen] = useState<Capability["id"]>("ai");
  const stack = techStack.filter((g) => g.items.length > 0);

  return (
    <section id="expertise" className="sheet overflow-hidden bg-navy-950 pb-0 pt-24 sm:pt-32">
      <div className="container-x">
        <div className="mb-12 grid items-end gap-6 sm:mb-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-acid">
              <span className="h-[3px] w-8 bg-acid" aria-hidden="true" /> what I build
            </p>
            <Heading
              className="font-display text-[clamp(2.6rem,7.4vw,6.2rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              lines={[{ text: "Systems," }, { text: "not slide decks.", className: "outline-text [--stroke:#f2eee4]" }]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-paper/65">
              The kinds of products and intelligent systems I design, engineer and integrate. Pick a domain.
            </p>
          </Reveal>
        </div>

        {/* desktop: expanding panels */}
        <Reveal>
          <div className="hidden h-[560px] gap-3 lg:flex" role="tablist" aria-label="Capability domains" aria-orientation="horizontal">
            {capabilities.map((c) => {
              const on = open === c.id;
              const t = theme[c.id];
              return (
                <div
                  key={c.id}
                  role="tab"
                  tabIndex={0}
                  aria-selected={on}
                  onMouseEnter={() => setOpen(c.id)}
                  onFocus={() => setOpen(c.id)}
                  onClick={() => setOpen(c.id)}
                  className={`relative min-w-0 overflow-hidden rounded-[1.75rem] p-6 transition-[flex-grow] duration-700 ease-[cubic-bezier(.2,.7,.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${t.bg} ${t.fg}`}
                  style={{ flexGrow: on ? 5 : 1, flexBasis: 0 }}
                >
                  <span className="font-mono text-xs opacity-60">{c.letter}</span>
                  {/* collapsed */}
                  <div className={`absolute inset-x-0 bottom-6 flex flex-col items-center gap-5 transition-opacity duration-300 ${on ? "pointer-events-none opacity-0" : "opacity-100 delay-300"}`}>
                    <span className="font-display text-xl font-semibold [text-orientation:mixed] [writing-mode:vertical-rl] rotate-180">
                      {c.title}
                    </span>
                    <Icon name={c.icon} size={26} />
                  </div>
                  {/* expanded */}
                  <div className={`absolute inset-0 w-[560px] p-6 pt-14 transition-opacity duration-500 ${on ? "opacity-100 delay-300" : "pointer-events-none opacity-0"}`}>
                    <div className="mb-6 flex items-center gap-3">
                      <Icon name={c.icon} size={30} />
                      <h3 className="font-display text-3xl font-bold tracking-tight">{c.title}</h3>
                    </div>
                    <Detail c={c} />
                  </div>
                </div>
              );
            })}
          </div>
        </Reveal>

        {/* mobile / tablet: accordion */}
        <div className="grid gap-3 lg:hidden">
          {capabilities.map((c) => {
            const on = open === c.id;
            const t = theme[c.id];
            return (
              <Reveal key={c.id}>
                <div className={`overflow-hidden rounded-3xl ${t.bg} ${t.fg}`}>
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={() => setOpen(on ? ("" as Capability["id"]) : c.id)}
                    className="flex min-h-[72px] w-full items-center gap-4 p-5 text-left"
                  >
                    <Icon name={c.icon} size={26} className="flex-none" />
                    <span className="flex-1 font-display text-xl font-semibold tracking-tight">{c.title}</span>
                    <Plus size={22} className={`flex-none transition-transform duration-300 ${on ? "rotate-45" : ""}`} />
                  </button>
                  <AnimatePresence initial={false}>
                    {on ? (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 pb-6">
                          <Detail c={c} />
                        </div>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>

        {stack.length > 0 ? (
          <Reveal className="mt-12">
            <div className="rounded-3xl border border-white/10 p-6 sm:p-8">
              <h3 className="eyebrow mb-6 text-acid">Technology stack</h3>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {stack.map((g) => (
                  <div key={g.group}>
                    <p className="mb-3 font-display text-sm font-semibold">{g.group}</p>
                    <ul className="flex flex-wrap gap-2">
                      {g.items.map((it) => (
                        <li key={it} className="rounded-full border border-white/15 px-3 py-1 font-mono text-xs text-paper/80">
                          {it}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ) : null}
      </div>

      <div className="mt-20 border-y border-white/10 py-6 font-display text-[clamp(2rem,5vw,4rem)] font-bold uppercase leading-none tracking-tight text-paper sm:py-8">
        <Marquee items={focusAreas} speed={70} sep="/" />
      </div>
    </section>
  );
}
