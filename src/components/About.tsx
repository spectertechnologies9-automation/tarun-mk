import { GraduationCap } from "lucide-react";
import { site } from "@/config/site";
import { Heading } from "./Heading";
import { Reveal } from "./Reveal";

const principles = ["Learn by building", "Experiment with emerging tech", "Turn ideas into practical products"];

export function About() {
  const [lead, ...rest] = site.intro;
  return (
    <section id="about" className="sheet bg-paper pb-24 pt-24 text-ink sm:pb-32 sm:pt-32">
      <div className="container-x">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <p className="eyebrow mb-5 flex items-center gap-3 text-cobalt">
              <span className="h-[3px] w-8 bg-cobalt" aria-hidden="true" /> about
            </p>
            <Heading
              className="font-display text-[clamp(2.6rem,7vw,5.6rem)] font-bold leading-[0.92] tracking-[-0.03em]"
              lines={[{ text: "Learning" }, { text: "by building.", className: "text-cobalt" }]}
            />
            <ul className="mt-10 grid gap-3">
              {principles.map((p, i) => (
                <Reveal key={p} delay={i * 0.08}>
                  <li className="flex items-center gap-4 border-t border-ink/15 pt-3 font-display text-lg font-semibold">
                    <span className="font-mono text-xs text-cobalt">0{i + 1}</span>
                    {p}
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>

          <div className="lg:pt-24">
            <Reveal>
              <p className="font-display text-2xl font-medium leading-snug tracking-tight sm:text-[1.9rem]">{lead}</p>
            </Reveal>
            {rest.map((t, i) => (
              <Reveal key={i} delay={0.08 * (i + 1)}>
                <p className="mt-6 text-[16px] leading-relaxed text-ink/70">{t}</p>
              </Reveal>
            ))}

            {/* secondary: education */}
            <Reveal delay={0.2}>
              <div className="mt-12 flex items-start gap-4 rounded-2xl border border-ink/15 p-5">
                <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-ink text-acid">
                  <GraduationCap size={20} aria-hidden="true" />
                </span>
                <div>
                  <p className="eyebrow text-ink/45">Engineering background</p>
                  <p className="mt-1 font-display text-[17px] font-semibold">Dayananda Sagar College of Engineering (DSCE)</p>
                  <p className="text-sm text-ink/60">Electronics and Telecommunication Engineering · Second Year, Third Semester</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-ink/60">
                    My engineering background complements my practical interests in software development, AI, electronics, automation and
                    connected technology.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
