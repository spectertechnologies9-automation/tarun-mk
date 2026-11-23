"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { markIntroDone } from "@/lib/intro";

const KEY = "tmk-intro-seen";
const LOGS = [
  { at: 5, t: "boot  tmk.kernel" },
  { at: 30, t: "load  ai.agents · voice · whatsapp" },
  { at: 60, t: "link  crm · nfc · automation" },
  { at: 90, t: "ready." },
];

/** Boot-sequence intro. Plays once per session, then wipes up to reveal the site. */
export function Loader() {
  const [show, setShow] = useState(true);
  const [pct, setPct] = useState(0);

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (seen) {
      setShow(false);
      markIntroDone();
      return;
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dur = reduced ? 400 : 1700;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(markIntroDone, 350);
        setTimeout(() => {
          setShow(false);
          try {
            sessionStorage.setItem(KEY, "1");
          } catch {
            /* ignore */
          }
        }, 650);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const name = "TARUN M K".split("");

  return (
    <>
      <noscript>
        <style>{`#intro-loader{display:none!important}`}</style>
      </noscript>
      <AnimatePresence>
        {show ? (
          <motion.div
            id="intro-loader"
            key="loader"
            role="status"
            aria-label="Loading"
            className="fixed inset-0 z-[300] flex flex-col justify-between bg-navy-950 p-6 text-paper sm:p-10"
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
            style={{ clipPath: "inset(0 0 0% 0)" }}
          >
            <div className="hud-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="relative flex justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-paper/50">
              <span>tmk://boot</span>
              <span>v2026</span>
            </div>

            <div className="relative">
              <h1 className="font-display text-[clamp(2.6rem,13vw,9rem)] font-bold leading-none tracking-tight" aria-label="Tarun M K">
                {name.map((c, i) => (
                  <motion.span
                    key={i}
                    aria-hidden="true"
                    className="inline-block"
                    initial={{ y: 60, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.08 * i, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
                    style={i === name.length - 1 ? { color: "#c8ff3d" } : undefined}
                  >
                    {c === " " ? " " : c}
                  </motion.span>
                ))}
              </h1>
              <ul className="mt-6 space-y-1 font-mono text-xs text-paper/60">
                {LOGS.filter((l) => pct >= l.at).map((l) => (
                  <li key={l.t}>
                    <span className="text-acid">›</span> {l.t}
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative">
              <div className="mb-3 flex items-end justify-between font-mono text-xs text-paper/60">
                <span>initialising intelligent systems</span>
                <span className="font-display text-4xl font-semibold tabular-nums text-paper sm:text-6xl">
                  {String(pct).padStart(3, "0")}
                </span>
              </div>
              <div className="h-[3px] w-full overflow-hidden bg-white/10">
                <div className="h-full bg-acid" style={{ width: `${pct}%` }} />
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
