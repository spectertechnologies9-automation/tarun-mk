import type { ReactNode } from "react";
import { Reveal } from "./Reveal";

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  subtitle?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={`mb-12 max-w-3xl sm:mb-16 ${align === "center" ? "mx-auto text-center" : ""}`}>
      <p className="eyebrow mb-4 flex items-center gap-3">
        <span className="h-px w-8 bg-gradient-to-r from-electric to-violet-500" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl sm:leading-[1.05]">{title}</h2>
      {subtitle ? <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{subtitle}</p> : null}
    </Reveal>
  );
}
