import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { getArchitecture } from "@/data/architectures";
import { projects } from "@/data/projects";
import { Heading } from "./Heading";
import { ProjectVisual, projectThemes } from "./ProjectVisuals";
import { Reveal } from "./Reveal";
import { StatusBadge } from "./StatusBadge";

const legend = [
  { label: "Completed", dot: "bg-emerald-500" },
  { label: "In development", dot: "bg-cobalt" },
  { label: "Prototype", dot: "bg-amber-500" },
  { label: "Exploring", dot: "bg-violet-500" },
  { label: "Coming soon", dot: "bg-zinc-400" },
];

export function Projects() {
  return (
    <section id="projects" className="sheet bg-paper pb-28 pt-24 text-ink sm:pb-36 sm:pt-32">
      <div className="container-x">
        <div className="mb-10 grid items-end gap-6 lg:grid-cols-[1.4fr_1fr]">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-cobalt">
              <span className="h-[3px] w-8 bg-cobalt" aria-hidden="true" /> featured projects
            </p>
            <Heading
              className="font-display text-[clamp(2.6rem,7.4vw,6.2rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              lines={[{ text: "Technology" }, { text: "in the making.", className: "text-cobalt" }]}
            />
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-lg leading-relaxed text-ink/65">
              Eight product areas, each with its own case study. Every project is labelled with its real status.
            </p>
          </Reveal>
        </div>

        <Reveal className="mb-10">
          <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 border-y border-ink/15 py-3 font-mono text-[11px] uppercase tracking-wider text-ink/60">
            <li className="text-ink">Status key</li>
            {legend.map((l) => (
              <li key={l.label} className="flex items-center gap-2">
                <span className={`h-2 w-2 rounded-full ${l.dot}`} aria-hidden="true" /> {l.label}
              </li>
            ))}
          </ul>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {projects.map((p, i) => {
            const t = projectThemes[p.slug];
            const nodes = p.architecture ?? (p.architectureId ? getArchitecture(p.architectureId)?.nodes : undefined) ?? [];
            const dark = t.fg !== "text-ink";
            return (
              <Reveal key={p.slug} delay={(i % 3) * 0.07} className={`${t.span} ${t.wide ? "sm:col-span-2" : ""}`}>
                <Link
                  href={`/projects/${p.slug}`}
                  className={`group relative flex h-full min-h-[340px] flex-col overflow-hidden rounded-[1.75rem] p-5 transition duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-24px_rgba(10,16,32,.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cobalt focus-visible:ring-offset-2 sm:p-7 ${t.bg} ${t.fg} ${t.wide ? "lg:flex-row lg:gap-10" : ""}`}
                >
                  <div className={`relative mb-6 h-40 sm:h-44 ${t.wide ? "lg:order-2 lg:mb-0 lg:h-auto lg:min-h-[220px] lg:w-[46%]" : ""}`} aria-hidden="true">
                    <ProjectVisual slug={p.slug} />
                  </div>

                  <div className="flex flex-1 flex-col">
                    <div className="mb-3 flex items-center justify-between gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.18em] opacity-60">
                        {String(i + 1).padStart(2, "0")} · {p.category}
                      </span>
                      <StatusBadge status={p.status} dark={dark} />
                    </div>
                    <h3 className="font-display text-2xl font-bold leading-tight tracking-tight sm:text-[1.7rem]">{p.title}</h3>
                    <p className="mt-3 text-[14px] leading-relaxed opacity-75">
                      <span className="font-mono text-[10px] uppercase tracking-wider opacity-70">Problem · </span>
                      {p.problem}
                    </p>

                    {nodes.length > 0 ? (
                      <p className="mt-4 flex flex-wrap gap-x-1.5 gap-y-1 font-mono text-[10.5px] uppercase tracking-wide opacity-65">
                        {nodes.slice(0, 5).map((n, k) => (
                          <span key={n.label + k}>
                            {k > 0 ? "→ " : ""}
                            {n.label}
                          </span>
                        ))}
                      </p>
                    ) : null}

                    <span className="mt-auto flex items-center justify-between pt-6 font-display text-[15px] font-semibold">
                      View case study
                      <span className="flex h-10 w-10 items-center justify-center rounded-full border border-current transition duration-300 group-hover:rotate-45 group-hover:bg-current">
                        <ArrowUpRight size={18} className="group-hover:invert" />
                      </span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <p className="mt-8 max-w-2xl font-mono text-[11px] leading-relaxed text-ink/50">
          Nothing here is presented as a finished client product unless it is marked “Completed”. Visuals are illustrations of how each
          system works.
        </p>
      </div>
    </section>
  );
}
