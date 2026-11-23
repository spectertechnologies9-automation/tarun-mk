"use client";

import { useState } from "react";
import { architectures } from "@/data/architectures";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";
import { SystemDiagram } from "./SystemDiagram";

const colors: Record<string, string> = {
  "voice-agent": "#7c3aed",
  "whatsapp-chatbot": "#0f766e",
  "intelligent-crm": "#2a5bff",
  "business-automation": "#0e7490",
};

export function Architecture() {
  const [id, setId] = useState(architectures[0].id);
  const arch = architectures.find((a) => a.id === id) ?? architectures[0];

  return (
    <section id="systems" className="sheet overflow-hidden bg-gradient-to-b from-navy-900 to-navy-950 pb-28 pt-24 sm:pb-36 sm:pt-32">
      <div className="hud-grid pointer-events-none absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_30%,#000,transparent)]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="mb-12 grid items-end gap-6 sm:mb-16 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-acid">
              <span className="h-[3px] w-8 bg-acid" aria-hidden="true" /> system architecture
            </p>
            <Heading
              className="font-display text-[clamp(2.6rem,7.4vw,6.2rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              lines={[{ text: "How I engineer" }, { text: "intelligent systems.", className: "text-cobalt-300" }]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-paper/65">
              I don’t just use AI tools — I build the systems around them. Choose a system and watch the data move.
            </p>
          </Reveal>
        </div>

        <Reveal>
          <div className="rounded-[1.75rem] border border-white/10 bg-navy-950/70 p-5 backdrop-blur sm:p-8">
            <div role="tablist" aria-label="Architecture examples" className="hide-scrollbar -mx-1 mb-8 flex gap-2 overflow-x-auto px-1 pb-1">
              {architectures.map((a, i) => {
                const on = a.id === id;
                return (
                  <button
                    key={a.id}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    aria-controls="arch-panel"
                    onClick={() => setId(a.id)}
                    className={`flex min-h-12 flex-none items-center gap-3 rounded-full border px-5 font-display text-[15px] font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-acid ${
                      on ? "border-acid bg-acid text-ink" : "border-white/15 text-paper/70 hover:border-white/40 hover:text-white"
                    }`}
                  >
                    <span className={`font-mono text-[10px] ${on ? "text-ink/60" : "text-paper/40"}`}>0{i + 1}</span>
                    {a.title}
                  </button>
                );
              })}
            </div>

            <div id="arch-panel" role="tabpanel">
              <p className="mb-8 max-w-xl text-sm text-paper/55 sm:text-base">{arch.subtitle}</p>
              <SystemDiagram nodes={arch.nodes} color={colors[arch.id]} />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
