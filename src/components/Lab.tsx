"use client";

import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { labCategories, labItems, labScenes } from "@/data/lab";
import { Icon } from "@/lib/icons";
import { GithubIcon } from "./BrandIcons";
import { Heading } from "./Heading";
import { LabGraph } from "./LabGraph";
import { Reveal } from "./Reveal";
import { StatusBadge } from "./StatusBadge";

const isDev = process.env.NODE_ENV !== "production";

function Terminal({ lines, color }: { lines: string[]; color: string }) {
  const [shown, setShown] = useState(1);
  useEffect(() => {
    setShown(1);
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShown(lines.length);
      return;
    }
    const id = setInterval(() => setShown((s) => (s >= lines.length + 3 ? 1 : s + 1)), 900);
    return () => clearInterval(id);
  }, [lines]);
  return (
    <div className="h-full rounded-xl border border-white/10 bg-black/50 p-4 font-mono text-[12px] leading-relaxed" aria-label="Illustrative terminal output">
      <p className="mb-2 text-[10px] uppercase tracking-[0.2em] text-paper/35">illustrative output</p>
      {lines.slice(0, shown).map((l, i) => (
        <p key={l} className={l.startsWith("✓") ? "text-acid" : l.startsWith("$") ? "text-paper" : "text-paper/60"}>
          {l}
          {i === Math.min(shown, lines.length) - 1 ? <span className="ml-1 inline-block h-3 w-[6px] animate-blink bg-current align-middle" style={{ color }} /> : null}
        </p>
      ))}
    </div>
  );
}

export function Lab() {
  const [sel, setSel] = useState(0);
  const item = labItems[sel];
  const scene = labScenes[item.category] ?? labScenes.ai;
  const cat = labCategories.find((c) => c.id === item.category);

  return (
    <section id="lab" className="sheet overflow-hidden bg-[#03060f] pb-28 pt-24 sm:pb-36 sm:pt-32">
      <div className="hud-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000,transparent)]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="mb-12 grid items-end gap-6 sm:mb-16 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-acid">
              <span className="h-[3px] w-8 bg-acid" aria-hidden="true" /> engineering lab
            </p>
            <Heading
              className="font-display text-[clamp(2.6rem,7.4vw,6.2rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              lines={[{ text: "Inside" }, { text: "My Lab.", className: "text-acid" }]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-paper/65">Experiments, ideas, systems, and products in development.</p>
          </Reveal>
        </div>

        <Reveal>
          <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-navy-950/80">
            {/* title bar */}
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3 font-mono text-[11px] text-paper/50 sm:px-6">
              <div className="flex items-center gap-1.5" aria-hidden="true">
                <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-300/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <span className="truncate">lab://workbench/{item.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}</span>
              <span className="flex items-center gap-2 text-acid">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" aria-hidden="true" /> sandbox
              </span>
            </div>

            <div className="grid lg:grid-cols-[300px_1fr]">
              {/* process list */}
              <div className="border-b border-white/10 lg:border-b-0 lg:border-r">
                <p className="px-5 pb-2 pt-4 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/35">experiments</p>
                <ul className="hide-scrollbar flex gap-1 overflow-x-auto px-3 pb-3 lg:block lg:space-y-1 lg:overflow-visible" role="tablist" aria-label="Lab experiments" aria-orientation="vertical">
                  {labItems.map((it, i) => {
                    const c = labCategories.find((x) => x.id === it.category);
                    const on = i === sel;
                    return (
                      <li key={it.name} className="flex-none lg:flex-auto">
                        <button
                          role="tab"
                          type="button"
                          aria-selected={on}
                          onClick={() => setSel(i)}
                          className={`flex w-full min-w-[190px] items-center gap-3 rounded-xl px-3 py-2.5 text-left transition lg:min-w-0 ${
                            on ? "bg-white/10 text-white" : "text-paper/55 hover:bg-white/5 hover:text-white"
                          }`}
                        >
                          <span className="font-mono text-[10px] opacity-50">{String(i + 1).padStart(2, "0")}</span>
                          {c ? <Icon name={c.icon} size={15} className={on ? "text-acid" : ""} /> : null}
                          <span className="flex-1 truncate text-[13px]">{it.name}</span>
                          <span className={`h-1.5 w-1.5 rounded-full ${on ? "animate-pulse bg-acid" : "bg-white/25"}`} aria-hidden="true" />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* workbench */}
              <div className="p-5 sm:p-8">
                <div className="grid gap-5 lg:grid-cols-[1.35fr_1fr]">
                  <div className="relative overflow-hidden rounded-xl border border-white/10 bg-black/40 p-2">
                    <div className="hud-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
                    <div className="relative aspect-[440/260]">
                      <LabGraph nodes={scene.nodes} color={scene.color} />
                    </div>
                  </div>
                  <Terminal lines={scene.log} color={scene.color} />
                </div>

                <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
                  <div className="min-w-0 max-w-xl">
                    <p className="eyebrow mb-2 flex items-center gap-2 text-paper/45">
                      {cat ? <Icon name={cat.icon} size={13} /> : null} {cat?.label}
                    </p>
                    <h3 className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {item.name}
                      {isDev && item.sample ? <span className="ml-2 align-middle font-mono text-[9px] uppercase text-amber-300">sample</span> : null}
                    </h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-paper/65">{item.description}</p>
                  </div>
                  <StatusBadge status={item.status} dark />
                </div>

                {item.screenshot ? (
                  <Image src={item.screenshot} alt={`${item.name} screenshot`} width={800} height={450} className="mt-5 aspect-video w-full rounded-xl border border-white/10 object-cover" />
                ) : null}
                {item.stack.length > 0 ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {item.stack.map((s) => (
                      <li key={s} className="rounded-md bg-white/10 px-2.5 py-1 font-mono text-[11px] text-paper/80">
                        {s}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {item.demo || item.github ? (
                  <div className="mt-5 flex gap-5 text-sm">
                    {item.demo ? (
                      <a href={item.demo} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-acid hover:text-white">
                        Demo <ArrowUpRight size={14} />
                      </a>
                    ) : null}
                    {item.github ? (
                      <a href={item.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-paper/70 hover:text-white">
                        <GithubIcon width={15} height={15} /> Code
                      </a>
                    ) : null}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
