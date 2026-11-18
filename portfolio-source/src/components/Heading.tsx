"use client";

import { motion } from "framer-motion";

export type HeadingLine = { text: string; className?: string };

/** Word-by-word masked reveal for section headings. */
export function Heading({
  lines,
  as = "h2",
  className = "",
}: {
  lines: HeadingLine[];
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const Tag = as;
  let i = 0;
  return (
    <Tag className={className} aria-label={lines.map((l) => l.text).join(" ")}>
      {lines.map((l, li) => (
        <span key={li} className="block" aria-hidden="true">
          {l.text.split(" ").map((w, wi) => {
            const idx = i++;
            return (
              <span key={wi} className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                <motion.span
                  className={`inline-block ${l.className ?? ""}`}
                  initial={{ y: "112%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                  transition={{ duration: 0.85, delay: idx * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
                >
                  {w}
                </motion.span>
              </span>
            );
          })}
        </span>
      ))}
    </Tag>
  );
}
