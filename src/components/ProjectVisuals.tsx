import type { ReactElement } from "react";

/**
 * One animated, purely illustrative visual per project. Each uses a different visual language
 * (waveform, chat, kanban, stock grid, NFC ripples, workflow, browser build, support hand-off).
 * They are decorative: no numbers or results are implied.
 */

const bars = Array.from({ length: 38 });
function Voice() {
  return (
    <div className="flex h-full items-center justify-center gap-[3px]">
      {bars.map((_, i) => (
        <span
          key={i}
          className="w-[5px] animate-wave rounded-full bg-gradient-to-t from-violet-400 to-cyan-300 group-hover:[animation-duration:.45s]"
          style={{ height: `${28 + ((i * 37) % 72)}%`, animationDelay: `${(i % 13) * 0.09}s` }}
        />
      ))}
    </div>
  );
}

function WhatsApp() {
  return (
    <div className="flex h-full flex-col justify-center gap-2.5">
      <div className="max-w-[80%] animate-bubble rounded-2xl rounded-bl-sm bg-ink/10 px-3.5 py-2 font-mono text-[11px]">
        Hi, can I book a slot?
      </div>
      <div className="ml-auto max-w-[80%] animate-bubble rounded-2xl rounded-br-sm bg-ink px-3.5 py-2 font-mono text-[11px] text-acid" style={{ animationDelay: "1.2s" }}>
        Sure — what time suits you?
      </div>
      <div className="ml-auto flex animate-bubble gap-1 rounded-2xl bg-ink px-3.5 py-3" style={{ animationDelay: "2.4s" }}>
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" style={{ animationDelay: `${i * 0.2}s` }} />
        ))}
      </div>
    </div>
  );
}

function Crm() {
  return (
    <div className="relative grid h-full grid-cols-3 content-center gap-2">
      {["Lead", "Follow-up", "Engaged"].map((c) => (
        <div key={c} className="space-y-1.5 rounded-xl bg-white/10 p-2">
          <p className="font-mono text-[9px] uppercase tracking-wider opacity-70">{c}</p>
          <div className="h-5 rounded-md bg-white/15" />
          <div className="h-5 rounded-md bg-white/10" />
        </div>
      ))}
      <div
        className="absolute left-0 top-[calc(50%-8px)] h-7 animate-crmMove rounded-md bg-acid shadow-lg group-hover:[animation-duration:3s]"
        style={{ width: "calc((100% - 16px) / 3)" }}
      />
    </div>
  );
}

function Inventory() {
  return (
    <div className="grid h-full grid-cols-6 grid-rows-3 gap-1.5">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="relative overflow-hidden rounded-md bg-ink/10">
          <span
            className={`absolute inset-0 origin-bottom animate-fillPulse group-hover:[animation-duration:1s] ${i === 4 || i === 13 ? "bg-cobalt" : "bg-ink"}`}
            style={{ animationDelay: `${(i * 0.37) % 3}s` }}
          />
        </div>
      ))}
    </div>
  );
}

function Nfc() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="30" y="40" width="92" height="64" rx="10" />
        <rect x="40" y="52" width="20" height="16" rx="3" fill="currentColor" opacity=".5" />
        <rect x="218" y="14" width="46" height="112" rx="10" />
        {[0, 1, 2, 3].map((i) => (
          <circle
            key={i}
            cx="150"
            cy="72"
            r="34"
            className="animate-pulseRing"
            style={{ transformOrigin: "150px 72px", animationDelay: `${i * 0.7}s` }}
          />
        ))}
      </g>
      <circle cx="241" cy="116" r="2.5" fill="currentColor" />
    </svg>
  );
}

function Automation() {
  return (
    <svg viewBox="0 0 300 150" className="h-full w-full" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="1.6">
        <path d="M44 75 H110 M110 75 C150 75 150 35 190 35 H236 M110 75 C150 75 150 115 190 115 H236" strokeDasharray="5 5" className="animate-dash" />
        <circle cx="30" cy="75" r="14" />
        <rect x="96" y="58" width="34" height="34" rx="9" />
        <rect x="236" y="20" width="40" height="30" rx="8" />
        <rect x="236" y="100" width="40" height="30" rx="8" />
        <path d="M107 75 l6 6 l10 -12" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

function Website() {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/20 bg-white/5">
      <div className="flex items-center gap-1.5 border-b border-white/15 px-3 py-2">
        {[0, 1, 2].map((i) => (
          <span key={i} className="h-2 w-2 rounded-full bg-white/30" />
        ))}
        <span className="ml-2 h-3.5 flex-1 rounded-full bg-white/10" />
      </div>
      <div className="grid flex-1 grid-cols-3 content-start gap-2 p-3">
        <span className="col-span-3 h-5 origin-left animate-build rounded bg-acid" />
        <span className="col-span-2 h-12 origin-left animate-build rounded bg-white/20" style={{ animationDelay: ".4s" }} />
        <span className="h-12 origin-left animate-build rounded bg-cobalt" style={{ animationDelay: ".7s" }} />
        <span className="col-span-3 h-3 origin-left animate-build rounded bg-white/15" style={{ animationDelay: "1s" }} />
      </div>
    </div>
  );
}

function Support() {
  return (
    <div className="flex h-full items-center gap-4">
      <div className="flex-1 space-y-2">
        <div className="max-w-[85%] animate-bubble rounded-2xl rounded-bl-sm bg-white/15 px-3.5 py-2 font-mono text-[11px]">Where is my order?</div>
        <div className="ml-auto max-w-[85%] animate-bubble rounded-2xl rounded-br-sm bg-acid px-3.5 py-2 font-mono text-[11px] text-ink" style={{ animationDelay: "1.2s" }}>
          Let me check that for you…
        </div>
      </div>
      <div className="flex flex-col items-center gap-1.5 font-mono text-[9px] uppercase tracking-wider opacity-80">
        <span>escalate</span>
        <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/40">
          <span className="absolute inset-0 animate-pulseRing rounded-full border border-acid" />
          <span className="h-3 w-3 rounded-full bg-acid" />
        </span>
        <span>human</span>
      </div>
    </div>
  );
}

const visuals: Record<string, () => ReactElement> = {
  "ai-voice-agent-systems": Voice,
  "whatsapp-ai-chatbots": WhatsApp,
  "ai-powered-crm": Crm,
  "inventory-management-systems": Inventory,
  "nfc-digital-business-card-platform": Nfc,
  "automated-business-management-systems": Automation,
  "website-development-projects": Website,
  "intelligent-customer-support-systems": Support,
};

export function ProjectVisual({ slug }: { slug: string }) {
  const V = visuals[slug] ?? Voice;
  return <V />;
}

/** Surface + layout for each project in the bento grid. */
export const projectThemes: Record<string, { bg: string; fg: string; span: string; wide?: boolean }> = {
  "ai-voice-agent-systems": { bg: "bg-navy-900", fg: "text-paper", span: "lg:col-span-4", wide: true },
  "whatsapp-ai-chatbots": { bg: "bg-acid", fg: "text-ink", span: "lg:col-span-2" },
  "ai-powered-crm": { bg: "bg-cobalt", fg: "text-white", span: "lg:col-span-2" },
  "inventory-management-systems": { bg: "bg-paper-dark", fg: "text-ink", span: "lg:col-span-2" },
  "nfc-digital-business-card-platform": { bg: "bg-violet-600", fg: "text-white", span: "lg:col-span-2" },
  "automated-business-management-systems": { bg: "bg-cyan-300", fg: "text-ink", span: "lg:col-span-3" },
  "website-development-projects": { bg: "bg-navy-950", fg: "text-paper", span: "lg:col-span-3" },
  "intelligent-customer-support-systems": { bg: "bg-ink", fg: "text-paper", span: "lg:col-span-6", wide: true },
};
