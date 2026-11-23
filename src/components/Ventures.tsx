"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ventures, type Venture } from "@/data/ventures";
import { Icon } from "@/lib/icons";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { VentureVisual } from "./VentureVisual";

const skin = {
  blue: {
    card: "bg-cobalt text-white",
    sub: "text-white/70",
    rule: "border-white/20",
    chip: "bg-acid text-ink",
    stroke: "#ffffff",
    mono: "text-white/15",
    panel: "bg-white/10 border-white/15",
    btn: "bg-white text-ink hover:bg-acid",
  },
  violet: {
    card: "bg-navy-900 text-white",
    sub: "text-white/60",
    rule: "border-white/15",
    chip: "bg-violet-400 text-ink",
    stroke: "#a78bfa",
    mono: "text-white/[0.06]",
    panel: "bg-white/5 border-white/10",
    btn: "bg-acid text-ink hover:bg-white",
  },
} as const;

function VentureCard({ v, className = "" }: { v: Venture; className?: string }) {
  const [open, setOpen] = useState(false);
  const s = skin[v.accent];
  const panelId = `venture-panel-${v.id}`;

  return (
    <Reveal className={className}>
      <article className={`group relative overflow-hidden rounded-[2rem] p-6 sm:p-9 ${s.card}`}>
        <span
          aria-hidden="true"
          className={`pointer-events-none absolute -right-6 -top-10 select-none font-display text-[16rem] font-bold leading-none sm:text-[22rem] ${s.mono}`}
        >
          {v.monogram}
        </span>

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            {v.logo ? (
              <Image src={v.logo} alt={`${v.name} logo`} width={52} height={52} className="h-[52px] w-[52px] rounded-2xl bg-white/10 object-contain p-1.5" />
            ) : (
              <div
                className="flex h-[52px] w-[52px] items-center justify-center rounded-2xl border border-dashed border-white/40 font-display text-2xl font-bold"
                title="Logo placeholder — set `logo` in src/data/ventures.ts"
              >
                {v.monogram}
              </div>
            )}
            <span className={`eyebrow ${s.sub}`}>Venture {v.index}</span>
          </div>
          <span className={`rounded-full px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-wider ${s.chip}`}>
            {v.designation}
          </span>
        </div>

        <div className="relative my-6 h-40 sm:h-48" aria-hidden="false">
          <VentureVisual id={v.id} stroke={s.stroke} />
        </div>

        <h3 className="relative font-display text-4xl font-bold leading-[0.98] tracking-tight sm:text-5xl">{v.name}</h3>
        <p className={`relative mt-2 font-mono text-xs uppercase tracking-wider ${s.sub}`}>{v.category}</p>
        <p className={`relative mt-6 max-w-lg text-[15px] leading-relaxed ${s.sub}`}>{v.description}</p>

        <h4 className={`eyebrow relative mb-3 mt-9 ${s.sub}`}>Areas of work</h4>
        <ol className={`relative grid gap-x-8 sm:grid-cols-2`}>
          {v.areas.map((a, i) => (
            <li
              key={a.label}
              className={`group/row flex items-center gap-3 border-t py-3 text-[14px] transition-transform duration-300 hover:translate-x-1.5 ${s.rule}`}
            >
              <span className={`font-mono text-[10px] ${s.sub}`}>{String(i + 1).padStart(2, "0")}</span>
              <span className="flex-1">{a.label}</span>
              <Icon name={a.icon} size={15} className="opacity-60 transition group-hover/row:opacity-100" />
            </li>
          ))}
        </ol>

        <div className="relative mt-8 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls={panelId}
            className={`btn min-h-12 ${s.btn}`}
          >
            Explore Company
            <ChevronDown size={16} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>
          {v.website ? (
            <a href={v.website} target="_blank" rel="noopener noreferrer" className="btn border border-white/40 text-white hover:bg-white/10">
              Visit website <ArrowUpRight size={16} />
            </a>
          ) : null}
        </div>

        <AnimatePresence initial={false}>
          {open ? (
            <motion.div
              id={panelId}
              key="panel"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
              className="relative overflow-hidden"
            >
              <div className="mt-8 grid gap-8">
                <div>
                  <h4 className={`eyebrow mb-3 ${s.sub}`}>Technology highlights</h4>
                  <div className="grid gap-3 sm:grid-cols-3">
                    {v.highlights.map((h) => (
                      <div key={h.title} className={`rounded-2xl border p-4 ${s.panel}`}>
                        <p className="font-display text-[15px] font-semibold">{h.title}</p>
                        <p className={`mt-1.5 text-[13px] leading-relaxed ${s.sub}`}>{h.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className={`eyebrow mb-3 ${s.sub}`}>{v.showcaseTitle}</h4>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {v.showcase.map((x) => (
                      <div key={x.title} className={`flex items-start gap-3 rounded-2xl border p-4 ${s.panel}`}>
                        <Icon name={x.icon} size={20} className="mt-0.5 flex-none" />
                        <div>
                          <p className="font-display text-[15px] font-semibold">{x.title}</p>
                          <p className={`mt-0.5 text-[13px] ${s.sub}`}>{x.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </article>
    </Reveal>
  );
}

export function Ventures() {
  return (
    <section id="ventures" className="sheet bg-paper pb-28 pt-24 text-ink sm:pb-36 sm:pt-32">
      <div className="container-x">
        <div className="mb-14 grid items-end gap-6 sm:mb-20 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-cobalt">
              <span className="h-[3px] w-8 bg-cobalt" aria-hidden="true" /> 02 ventures
            </p>
            <Heading
              className="font-display text-[clamp(2.6rem,7.4vw,6.2rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              lines={[{ text: "Companies" }, { text: "I’m building.", className: "text-cobalt" }]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-ink/65">
              Two ventures, one mission: put intelligent technology to work for real businesses.
            </p>
          </Reveal>
        </div>

        <div className="grid items-start gap-6 lg:grid-cols-2">
          <VentureCard v={ventures[0]} />
          <VentureCard v={ventures[1]} className="lg:mt-24" />
        </div>
      </div>
    </section>
  );
}
