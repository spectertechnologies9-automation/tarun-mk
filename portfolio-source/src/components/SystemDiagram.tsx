"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";
import type { FlowNode } from "@/data/types";
import { Icon } from "@/lib/icons";

function useWide() {
  const [wide, setWide] = useState<boolean | null>(null);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const f = () => setWide(mq.matches);
    f();
    mq.addEventListener("change", f);
    return () => mq.removeEventListener("change", f);
  }, []);
  return wide;
}

function wrap(label: string): string[] {
  if (label.length <= 13 || !label.includes(" ")) return [label];
  const words = label.split(" ");
  let best = 1;
  let diff = 99;
  for (let i = 1; i < words.length; i++) {
    const d = Math.abs(words.slice(0, i).join(" ").length - words.slice(i).join(" ").length);
    if (d < diff) {
      diff = d;
      best = i;
    }
  }
  return [words.slice(0, best).join(" "), words.slice(best).join(" ")];
}

/**
 * Interactive architecture diagram: components as nodes, with data packets travelling along the
 * connections. Click a node to inspect it; play/pause the walkthrough.
 */
export function SystemDiagram({ nodes, color = "#2a5bff", autoPlay = true }: { nodes: FlowNode[]; color?: string; autoPlay?: boolean }) {
  const reduce = useReducedMotion();
  const wide = useWide();
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(autoPlay);
  const running = playing && !reduce;
  const n = nodes.length;

  useEffect(() => setActive(0), [nodes]);
  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), 1900);
    return () => clearInterval(id);
  }, [running, n]);

  if (wide === null) return <div className="h-[260px]" aria-hidden="true" />;

  const spacing = (1000 - 160) / (n - 1);
  const nw = wide ? Math.min(118, spacing - 30) : 268;
  const nh = wide ? 104 : 76;
  const pos = nodes.map((_, i) => (wide ? { x: 80 + i * spacing, y: 112 } : { x: 160, y: 50 + i * 108 }));
  const vb = wide ? "0 0 1000 224" : `0 0 320 ${(n - 1) * 108 + 100}`;
  const cur = nodes[Math.min(active, n - 1)];
  const prev = nodes[active - 1];
  const next = nodes[active + 1];

  const edge = (i: number) =>
    wide
      ? { x1: pos[i].x + nw / 2, y1: pos[i].y, x2: pos[i + 1].x - nw / 2, y2: pos[i + 1].y }
      : { x1: pos[i].x, y1: pos[i].y + nh / 2, x2: pos[i + 1].x, y2: pos[i + 1].y - nh / 2 };

  const choose = (i: number) => {
    setActive(i);
    setPlaying(false);
  };

  return (
    <div>
      <svg viewBox={vb} className="h-auto w-full" role="group" aria-label="System architecture diagram">
        {nodes.slice(0, -1).map((_, i) => {
          const e = edge(i);
          const passed = i < active;
          const live = i === active;
          return (
            <g key={i}>
              <line {...e} stroke="rgba(255,255,255,.14)" strokeWidth="2" />
              <line {...e} stroke={color} strokeWidth="2.5" opacity={passed ? 1 : 0} style={{ transition: "opacity .4s" }} />
              {live ? <line {...e} stroke="#c8ff3d" strokeWidth="2" strokeDasharray="4 6" className="animate-dash" /> : null}
            </g>
          );
        })}

        {running && active < n - 1 ? (
          <motion.circle
            key={active}
            r="6"
            fill="#c8ff3d"
            style={{ filter: "drop-shadow(0 0 8px #c8ff3d)" }}
            initial={{ cx: edge(active).x1, cy: edge(active).y1 }}
            animate={{ cx: edge(active).x2, cy: edge(active).y2 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
        ) : null}

        {nodes.map((nd, i) => {
          const p = pos[i];
          const on = i === active;
          const lines = wrap(nd.label);
          const x = p.x - nw / 2;
          const y = p.y - nh / 2;
          return (
            <g
              key={nd.label + i}
              role="button"
              tabIndex={0}
              aria-label={`Step ${i + 1}: ${nd.label}`}
              aria-pressed={on}
              onClick={() => choose(i)}
              onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), choose(i))}
              style={{ cursor: "pointer", outline: "none" }}
            >
              <rect
                x={x}
                y={y}
                width={nw}
                height={nh}
                rx="20"
                fill={on ? color : "#111c3a"}
                stroke={on ? "#c8ff3d" : "rgba(255,255,255,.16)"}
                strokeWidth={on ? 2 : 1}
                style={{ filter: on ? `drop-shadow(0 0 18px ${color})` : undefined, transition: "all .3s" }}
              />
              <Icon
                name={nd.icon}
                x={wide ? p.x - 11 : x + 18}
                y={wide ? y + 16 : p.y - 11}
                width={22}
                height={22}
                stroke={on ? "#fff" : "#8fadff"}
                strokeWidth={1.8}
              />
              <text x={wide ? x + 10 : x + nw - 16} y={wide ? y + 20 : p.y + 4} textAnchor={wide ? "start" : "end"} fontSize="10" fill="rgba(255,255,255,.4)" fontFamily='"JetBrains Mono Variable", monospace'>
                {String(i + 1).padStart(2, "0")}
              </text>
              <text
                textAnchor={wide ? "middle" : "start"}
                x={wide ? p.x : x + 54}
                y={wide ? y + 62 : p.y - (lines.length - 1) * 7 + 4}
                fontSize={wide ? 12 : 14}
                fontWeight="600"
                fill="#fff"
                fontFamily='"Space Grotesk Variable", sans-serif'
              >
                {lines.map((l, k) => (
                  <tspan key={k} x={wide ? p.x : x + 54} dy={k === 0 ? 0 : wide ? 15 : 16}>
                    {l}
                  </tspan>
                ))}
              </text>
            </g>
          );
        })}
      </svg>

      <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-white/10 bg-white/[0.04] p-5 sm:flex-row sm:items-start sm:justify-between sm:p-7">
        <div aria-live="polite" className="min-w-0">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-acid">
            step {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")} · {cur.label}
          </p>
          <p className="mt-3 max-w-2xl text-[16px] leading-relaxed text-paper/80">{cur.detail}</p>
          <p className="mt-4 font-mono text-[11px] text-paper/45">
            {prev ? `receives from → ${prev.label}` : "entry point"} {" · "} {next ? `sends to → ${next.label}` : "end of flow"}
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          disabled={Boolean(reduce)}
          className="btn btn-line min-h-11 flex-none px-5 text-sm disabled:opacity-40"
          aria-label={running ? "Pause walkthrough" : "Play walkthrough"}
        >
          {running ? <Pause size={14} /> : <Play size={14} />}
          {running ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
}
