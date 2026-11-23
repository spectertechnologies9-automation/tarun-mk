"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { site } from "@/config/site";
import { Marquee } from "./Marquee";
import { Reveal } from "./Reveal";

export function Vision() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const a = useTransform(scrollYProgress, [0, 1], ["8%", "-22%"]);
  const b = useTransform(scrollYProgress, [0, 1], ["-22%", "8%"]);

  return (
    <section id="vision" ref={ref} className="grain sheet overflow-hidden bg-cobalt pt-24 text-white sm:pt-32">
      <div className="container-x relative">
        <p className="eyebrow mb-8 flex items-center gap-3 text-acid">
          <span className="h-[3px] w-8 bg-acid" aria-hidden="true" /> my vision
        </p>
      </div>

      <div className="relative select-none font-display text-[clamp(3.6rem,15vw,13rem)] font-bold uppercase leading-[0.86] tracking-[-0.04em]" aria-hidden="true">
        <motion.div style={reduce ? undefined : { x: a }} className="whitespace-nowrap">
          Building what’s
        </motion.div>
        <motion.div style={reduce ? undefined : { x: b }} className="whitespace-nowrap text-acid">
          next — <span className="outline-text [--stroke:#fff]">next —</span> next
        </motion.div>
      </div>
      <h2 className="sr-only">Building What’s Next.</h2>

      <div className="container-x relative mt-16 grid gap-8 pb-24 sm:mt-24 lg:grid-cols-3 lg:gap-12">
        <Reveal>
          <p className="text-lg leading-relaxed text-white/90">
            My ambition is to develop intelligent technology products that make businesses more efficient, connected, and future-ready.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <p className="text-lg leading-relaxed text-white/90">
            I want to continue exploring emerging technologies, building practical software products, architecting intelligent systems, and
            transforming ambitious ideas into meaningful solutions.
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="font-display text-xl font-semibold leading-snug">
            For me, innovation is not just about imagining what technology can do. It is about building it, testing it, and making it work in
            the real world.
          </p>
        </Reveal>
      </div>

      <div className="border-t border-white/25 bg-ink py-5 font-display text-xl font-semibold uppercase tracking-tight text-acid sm:text-2xl">
        <Marquee items={[site.tagline, site.tagline, site.tagline]} speed={45} sep="●" />
      </div>
    </section>
  );
}
