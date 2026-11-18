import { ArrowLeft, ArrowRight, ArrowUpRight, ImageIcon } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { GithubIcon } from "@/components/BrandIcons";
import { ProjectVisual, projectThemes } from "@/components/ProjectVisuals";
import { StatusBadge } from "@/components/StatusBadge";
import { SystemDiagram } from "@/components/SystemDiagram";
import { getArchitecture } from "@/data/architectures";
import { getProject, projects } from "@/data/projects";
import { Icon } from "@/lib/icons";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) return {};
  return {
    title: p.title,
    description: p.summary,
    alternates: { canonical: `/projects/${p.slug}` },
    openGraph: { title: p.title, description: p.summary, type: "article" },
  };
}

function videoEmbed(url: string) {
  const yt = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]{6,})/);
  if (yt) return { kind: "iframe" as const, src: `https://www.youtube-nocookie.com/embed/${yt[1]}` };
  if (/\.(mp4|webm)(\?.*)?$/i.test(url)) return { kind: "video" as const, src: url };
  return { kind: "link" as const, src: url };
}

function Block({ n, title, children }: { n: string; title: string; children: React.ReactNode }) {
  return (
    <section className="grid gap-6 border-t border-white/10 py-10 sm:py-14 lg:grid-cols-[220px_1fr]">
      <h2 className="eyebrow flex gap-3 text-acid">
        <span className="text-paper/40">{n}</span> {title}
      </h2>
      <div>{children}</div>
    </section>
  );
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const p = getProject(slug);
  if (!p) notFound();

  const idx = projects.findIndex((x) => x.slug === p.slug);
  const next = projects[(idx + 1) % projects.length];
  const flow = p.architecture ?? (p.architectureId ? getArchitecture(p.architectureId)?.nodes : undefined);
  const demo = p.demoVideo ? videoEmbed(p.demoVideo) : null;
  const theme = projectThemes[p.slug];
  const dark = theme.fg !== "text-ink";
  let n = 0;
  const num = () => String(++n).padStart(2, "0");

  return (
    <article className="bg-navy-950 pb-24">
      <header className={`${theme.bg} ${theme.fg} relative overflow-hidden rounded-b-[2.5rem] pb-12 pt-32 sm:rounded-b-[4rem] sm:pb-16 sm:pt-40`}>
        <div className="container-x grid items-end gap-10 lg:grid-cols-[1.2fr_1fr]">
          <div>
            <Link href="/#projects" className="mb-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider opacity-70 transition hover:opacity-100">
              <ArrowLeft size={14} /> All projects
            </Link>
            <div className="mb-5 flex flex-wrap items-center gap-3">
              <Icon name={p.icon} size={22} />
              <span className="eyebrow opacity-70">{p.category}</span>
              <StatusBadge status={p.status} dark={dark} />
            </div>
            <h1 className="font-display text-[clamp(2.4rem,7vw,5.6rem)] font-bold leading-[0.95] tracking-[-0.03em]">{p.title}</h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed opacity-80">{p.overview}</p>
            {(p.liveUrl || p.github) && (
              <div className="mt-8 flex flex-wrap gap-3">
                {p.liveUrl ? (
                  <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ink">
                    Live project <ArrowUpRight size={16} />
                  </a>
                ) : null}
                {p.github ? (
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="btn border border-current">
                    <GithubIcon /> GitHub
                  </a>
                ) : null}
              </div>
            )}
          </div>
          <div className="group relative h-56 sm:h-72" aria-hidden="true">
            <ProjectVisual slug={p.slug} />
          </div>
        </div>
      </header>

      <div className="container-x mt-10 text-paper">
        {p.template ? (
          <p className="max-w-3xl rounded-2xl border border-dashed border-white/20 p-4 font-mono text-xs leading-relaxed text-paper/60">
            This is a case-study template. Detailed write-ups, screenshots and demos will be added as each project is documented.
          </p>
        ) : null}

        <Block n={num()} title="Problem">
          <p className="max-w-2xl font-display text-2xl leading-snug tracking-tight sm:text-3xl">{p.problem}</p>
        </Block>

        <Block n={num()} title="Solution">
          <p className="max-w-2xl text-lg leading-relaxed text-paper/75">{p.solution}</p>
        </Block>

        {flow ? (
          <Block n={num()} title="Architecture">
            <SystemDiagram nodes={flow} color="#2a5bff" autoPlay={false} />
          </Block>
        ) : null}

        {p.technologies.length > 0 || p.template ? (
          <Block n={num()} title="Technologies">
            {p.technologies.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {p.technologies.map((t) => (
                  <li key={t} className="rounded-full border border-white/20 px-4 py-1.5 font-mono text-xs text-paper/85">
                    {t}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="font-mono text-sm text-paper/40">Technology stack to be added.</p>
            )}
          </Block>
        ) : null}

        {p.features.length > 0 ? (
          <Block n={num()} title="Features">
            <ul className="grid gap-x-8 sm:grid-cols-2">
              {p.features.map((f, i) => (
                <li key={f} className="flex items-center gap-4 border-t border-white/10 py-4 font-display text-lg">
                  <span className="font-mono text-xs text-acid">{String(i + 1).padStart(2, "0")}</span>
                  {f}
                </li>
              ))}
            </ul>
          </Block>
        ) : null}

        {p.screenshots.length > 0 || p.template ? (
          <Block n={num()} title="Screenshots">
            <div className="grid gap-4 sm:grid-cols-2">
              {p.screenshots.length > 0
                ? p.screenshots.map((s) => (
                    <Image key={s.src} src={s.src} alt={s.alt} width={1280} height={720} className="aspect-video w-full rounded-2xl border border-white/10 object-cover" />
                  ))
                : [0, 1].map((i) => (
                    <div key={i} className="flex aspect-video items-center justify-center rounded-2xl border border-dashed border-white/20 text-white/25">
                      <ImageIcon size={28} aria-label="Screenshot placeholder" />
                    </div>
                  ))}
            </div>
          </Block>
        ) : null}

        {demo ? (
          <Block n={num()} title="Demo">
            {demo.kind === "iframe" ? (
              <iframe src={demo.src} title={`${p.title} demo`} className="aspect-video w-full rounded-2xl border border-white/10" allow="accelerometer; encrypted-media; picture-in-picture" allowFullScreen loading="lazy" />
            ) : demo.kind === "video" ? (
              <video src={demo.src} controls preload="metadata" className="aspect-video w-full rounded-2xl border border-white/10" />
            ) : (
              <a href={demo.src} target="_blank" rel="noopener noreferrer" className="btn btn-line">
                Watch demo <ArrowUpRight size={16} />
              </a>
            )}
          </Block>
        ) : null}

        <Link href={`/projects/${next.slug}`} className="group mt-10 flex items-center justify-between rounded-[1.75rem] bg-paper p-6 text-ink transition hover:bg-acid sm:p-9">
          <div>
            <p className="eyebrow mb-2 text-ink/50">Next project</p>
            <p className="font-display text-2xl font-bold tracking-tight sm:text-4xl">{next.title}</p>
          </div>
          <ArrowRight size={32} className="transition group-hover:translate-x-2" />
        </Link>
      </div>
    </article>
  );
}
