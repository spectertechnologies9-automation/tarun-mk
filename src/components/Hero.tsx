"use client";

import { AnimatePresence, motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type PointerEvent } from "react";
import { site } from "@/config/site";
import { onIntro } from "@/lib/intro";
import { Magnetic } from "./Magnetic";
import { Marquee } from "./Marquee";
import SystemField from "./SystemField";

function RotatingWord({ words }: { words: string[] }) {
  const [i, setI] = useState(0);
  const reduce = useReducedMotion();
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setI((n) => (n + 1) % words.length), 2200);
    return () => clearInterval(id);
  }, [reduce, words.length]);
  return (
    <span className="relative inline-flex h-[1.5em] min-w-[12ch] items-center overflow-hidden align-bottom text-acid">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={words[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
          className="whitespace-nowrap"
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
      <span className="ml-1 inline-block h-[1.1em] w-[2px] animate-blink bg-acid" aria-hidden="true" />
    </span>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [go, setGo] = useState(false);
  useEffect(() => onIntro(() => setGo(true)), []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const textY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const visY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);

  const onMove = (e: PointerEvent<HTMLElement>) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty("--mx", `${(x * 100).toFixed(1)}%`);
    ref.current.style.setProperty("--my", `${(y * 100).toFixed(1)}%`);
    ref.current.style.setProperty("--px", (x * 2 - 1).toFixed(3));
    ref.current.style.setProperty("--py", (y * 2 - 1).toFixed(3));
  };

  const reveal = (delay: number) => ({
    initial: { opacity: 0, y: 24 },
    animate: go ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
    transition: { delay, duration: 0.8, ease: [0.2, 0.7, 0.2, 1] as const },
  });

  let w = 0;
  const lines = [
    { text: site.headline.line1, cls: ["text-paper", "outline-text [--stroke:#c8ff3d]"] },
    { text: site.headline.line2, cls: ["text-cobalt-300", "text-cobalt-300", "text-cobalt-300"] },
  ];

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onMove}
      className="grain relative overflow-hidden bg-navy-950 pt-28 sm:pt-32"
      style={{ ["--mx" as string]: "70%", ["--my" as string]: "30%", ["--px" as string]: 0, ["--py" as string]: 0 }}
    >
      {/* atmosphere */}
      <div className="hud-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_60%_35%,#000,transparent)]" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: "radial-gradient(520px circle at var(--mx) var(--my), rgba(42,91,255,.28), transparent 60%)" }}
      />

      <div className="container-x relative grid min-h-[calc(100svh-7rem)] items-center gap-10 pb-16 lg:grid-cols-[1.12fr_1fr]">
        <motion.div style={{ y: textY, opacity: fade }} className="relative z-10">
          <motion.div {...reveal(0)} className="mb-7 flex flex-wrap items-center gap-3">
            <span className="flex items-center gap-2.5 rounded-full border border-white/15 bg-white/5 py-1.5 pl-3 pr-4 font-mono text-[11px] uppercase tracking-[0.16em] text-paper/80">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-acid" />
              </span>
              {site.currentlyBuilding}
            </span>
          </motion.div>

          <h1 aria-label={`${site.name}. ${site.headline.line1} ${site.headline.line2}`}>
            <motion.span {...reveal(0.05)} className="mb-5 block font-mono text-sm uppercase tracking-[0.42em] text-paper/70 sm:text-base">
              {site.name}
            </motion.span>
            {lines.map((l, li) => (
              <span
                key={li}
                aria-hidden="true"
                className="block font-display text-[clamp(2.7rem,9.4vw,7.4rem)] font-bold leading-[0.93] tracking-[-0.03em]"
              >
                {l.text.split(" ").map((word) => {
                  const i = w++;
                  return (
                    <span key={i} className="mr-[0.2em] inline-block overflow-hidden pb-[0.1em] align-bottom">
                      <motion.span
                        className={`inline-block ${l.cls[Math.min(i - (li ? 2 : 0), l.cls.length - 1)] ?? ""}`}
                        initial={{ y: "115%" }}
                        animate={{ y: go ? 0 : "115%" }}
                        transition={{ duration: 0.95, delay: 0.1 + i * 0.09, ease: [0.2, 0.7, 0.2, 1] }}
                      >
                        {word}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.p {...reveal(0.55)} className="mt-8 max-w-xl text-base leading-relaxed text-paper/70 sm:text-lg">
            {site.heroDescription}
          </motion.p>

          <motion.p {...reveal(0.65)} className="mt-6 font-mono text-[13px] text-paper/80 sm:text-sm">
            <span className="text-paper/45">// right now → </span>
            building <RotatingWord words={site.rotating} />
          </motion.p>

          <motion.ul
            {...reveal(0.72)}
            aria-label="Roles"
            className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] uppercase tracking-[0.16em] text-cobalt-300 sm:text-xs"
          >
            {site.roles.map((r, i) => (
              <li key={r} className="flex items-center gap-3">
                {i > 0 ? <span className="text-acid" aria-hidden="true">/</span> : null}
                {r}
              </li>
            ))}
          </motion.ul>

          <motion.div {...reveal(0.8)} className="mt-10 flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href="/#projects" className="btn btn-acid group min-h-14 px-7 text-base">
                Explore My Work
                <ArrowUpRight size={18} className="transition group-hover:rotate-45" />
              </Link>
            </Magnetic>
            <Magnetic>
              <Link href="/#ventures" className="btn btn-line min-h-14 px-7 text-base">
                Explore My Ventures
              </Link>
            </Magnetic>
            <Link
              href="/#contact"
              className="group ml-1 inline-flex min-h-12 items-center gap-2 font-mono text-sm uppercase tracking-wider text-paper/80 hover:text-acid"
            >
              <span className="border-b border-current pb-0.5">Let’s Connect</span>
              <span aria-hidden="true" className="transition group-hover:translate-x-1">→</span>
            </Link>
          </motion.div>
        </motion.div>

        {/* interactive system */}
        <motion.div style={{ y: visY }} className="relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            animate={go ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.94 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative aspect-square w-full max-w-[640px] lg:ml-auto"
          >
            {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "bottom-0 left-0 border-b border-l", "bottom-0 right-0 border-b border-r"].map((c) => (
              <span key={c} className={`absolute h-5 w-5 border-acid/70 ${c}`} aria-hidden="true" />
            ))}
            <span className="absolute left-7 top-3 font-mono text-[10px] uppercase tracking-[0.2em] text-paper/40" aria-hidden="true">
              system.map
            </span>
            <SystemField />

            {/* floating technical chips (mouse parallax) */}
            <div
              aria-hidden="true"
              className="absolute -right-2 top-10 hidden rounded-xl border border-white/15 bg-navy-900/90 px-3.5 py-2.5 font-mono text-[11px] shadow-xl backdrop-blur sm:block"
              style={{ transform: "translate3d(calc(var(--px) * -16px), calc(var(--py) * -12px), 0)" }}
            >
              <span className="text-acid">$</span> agent.run(<span className="text-cobalt-300">&quot;book_slot&quot;</span>)
              <span className="ml-0.5 inline-block h-3 w-[6px] animate-blink bg-paper/70 align-middle" />
            </div>
            <div
              aria-hidden="true"
              className="absolute -left-2 bottom-14 hidden rounded-xl border border-white/15 bg-navy-900/90 px-3.5 py-2.5 font-mono text-[11px] text-paper/80 shadow-xl backdrop-blur md:block"
              style={{ transform: "translate3d(calc(var(--px) * 18px), calc(var(--py) * 14px), 0)" }}
            >
              call <span className="text-acid">→</span> stt <span className="text-acid">→</span> llm <span className="text-acid">→</span> tools <span className="text-acid">→</span> tts
            </div>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <div className="absolute bottom-3 left-5 hidden items-center gap-3 sm:left-8 lg:left-12 lg:flex" aria-hidden="true">
          <span className="relative block h-12 w-px overflow-hidden bg-white/15">
            <span className="absolute inset-x-0 top-0 h-1/2 animate-scrollCue bg-acid" />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-paper/50">scroll</span>
        </div>
      </div>

      <div className="relative border-y border-white/10 py-4 font-mono text-[12px] uppercase tracking-[0.18em] text-paper/55">
        <Marquee
          speed={50}
          items={["AI agents", "Voice AI", "WhatsApp automation", "CRM systems", "Inventory systems", "NFC", "IoT", "Workflow automation", "Full-stack"]}
        />
      </div>
    </section>
  );
}
