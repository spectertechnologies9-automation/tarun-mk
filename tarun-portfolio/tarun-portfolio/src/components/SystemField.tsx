"use client";

import { useEffect, useRef, useState } from "react";

type Hub = { id: string; label: string; desc: string; color: string; angle: number };

export const HUBS: Hub[] = [
  { id: "llm", label: "LLM", desc: "reasoning & language", color: "#8fadff", angle: -90 },
  { id: "voice", label: "VOICE", desc: "speech in → speech out", color: "#a78bfa", angle: -30 },
  { id: "wa", label: "WHATSAPP", desc: "business API conversations", color: "#c8ff3d", angle: 30 },
  { id: "crm", label: "CRM", desc: "leads, follow-ups, pipeline", color: "#22d3ee", angle: 90 },
  { id: "nfc", label: "NFC", desc: "tap → web → action", color: "#f2eee4", angle: 150 },
  { id: "iot", label: "IoT", desc: "devices feeding systems", color: "#5b86ff", angle: 210 },
];

const MONO = '"JetBrains Mono Variable", ui-monospace, monospace';

/**
 * Interactive canvas of AI systems orbiting an agent core.
 * Hover a node to inspect it, click to send data through the graph. Pointer pushes nodes away.
 */
export default function SystemField() {
  const wrap = useRef<HTMLDivElement>(null);
  const cv = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState<Hub | null>(null);

  useEffect(() => {
    const canvas = cv.current;
    const box = wrap.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !box || !ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let W = 0,
      H = 0,
      raf = 0,
      last = performance.now(),
      t = 0,
      spawn = 0.3,
      visible = true,
      hoverIdx = -1;
    const mouse = { x: -999, y: -999 };

    const sats = Array.from({ length: 34 }, (_, i) => ({
      r: 0.25 + Math.random() * 0.75,
      a: Math.random() * Math.PI * 2,
      s: (0.03 + Math.random() * 0.07) * (i % 2 ? 1 : -1),
      size: 1 + Math.random() * 1.5,
      ox: 0,
      oy: 0,
      x: 0,
      y: 0,
    }));
    const hubOff = HUBS.map(() => ({ ox: 0, oy: 0 }));
    const hubPos = HUBS.map(() => ({ x: 0, y: 0 }));
    const packets: { a: number; b: number; p: number }[] = [];

    const resize = () => {
      const r = box.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = r.width;
      H = r.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      draw(0);
    };

    const lerp = (a: number, b: number, k: number) => a + (b - a) * k;

    function draw(dt: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      const cx = W / 2;
      const cy = H / 2;
      const m = Math.min(W, H);
      const R = m * 0.34;

      // positions
      HUBS.forEach((h, i) => {
        const a = (h.angle * Math.PI) / 180 + t * 0.06;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R * 0.92;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        const push = d < 130 ? (1 - d / 130) * 14 : 0;
        hubOff[i].ox += ((dx / d) * push - hubOff[i].ox) * 0.1;
        hubOff[i].oy += ((dy / d) * push - hubOff[i].oy) * 0.1;
        hubPos[i] = { x: x + hubOff[i].ox, y: y + hubOff[i].oy };
      });
      sats.forEach((s) => {
        const a = s.a + t * s.s;
        const x = cx + Math.cos(a) * s.r * m * 0.5;
        const y = cy + Math.sin(a) * s.r * m * 0.45;
        const dx = x - mouse.x;
        const dy = y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        const push = d < 110 ? (1 - d / 110) * 22 : 0;
        s.ox += ((dx / d) * push - s.ox) * 0.12;
        s.oy += ((dy / d) * push - s.oy) * 0.12;
        s.x = x + s.ox;
        s.y = y + s.oy;
      });

      // satellite → nearest hub links
      ctx.lineWidth = 1;
      sats.forEach((s) => {
        let bi = 0,
          bd = 1e9;
        hubPos.forEach((h, i) => {
          const d = Math.hypot(h.x - s.x, h.y - s.y);
          if (d < bd) {
            bd = d;
            bi = i;
          }
        });
        if (bd > R * 0.95) return;
        const near = Math.hypot(s.x - mouse.x, s.y - mouse.y) < 120;
        ctx.globalAlpha = near ? 0.55 : 0.12;
        ctx.strokeStyle = HUBS[bi].color;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(hubPos[bi].x, hubPos[bi].y);
        ctx.stroke();
      });

      // hub ↔ core spokes
      hubPos.forEach((h, i) => {
        ctx.globalAlpha = hoverIdx === i ? 0.9 : 0.3;
        ctx.strokeStyle = HUBS[i].color;
        ctx.lineWidth = hoverIdx === i ? 1.6 : 1;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(h.x, h.y);
        ctx.stroke();
      });
      ctx.lineWidth = 1;

      // packets
      spawn -= dt;
      if (spawn <= 0 && !reduced) {
        const a = Math.floor(Math.random() * HUBS.length);
        let b = Math.floor(Math.random() * HUBS.length);
        if (b === a) b = (b + 1) % HUBS.length;
        packets.push({ a, b, p: 0 });
        spawn = 0.6 + Math.random() * 0.9;
      }
      for (let i = packets.length - 1; i >= 0; i--) {
        const k = packets[i];
        k.p += dt * 0.75;
        if (k.p >= 2) {
          packets.splice(i, 1);
          continue;
        }
        if (k.p < 0) continue;
        const from = k.p < 1 ? hubPos[k.a] : { x: cx, y: cy };
        const to = k.p < 1 ? { x: cx, y: cy } : hubPos[k.b];
        const q = k.p < 1 ? k.p : k.p - 1;
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#c8ff3d";
        ctx.shadowColor = "#c8ff3d";
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.arc(lerp(from.x, to.x, q), lerp(from.y, to.y, q), 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // satellites
      sats.forEach((s) => {
        ctx.globalAlpha = 0.65;
        ctx.fillStyle = "#cfd8ff";
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      });

      // core
      ctx.globalAlpha = 1;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 46);
      g.addColorStop(0, "rgba(42,91,255,.9)");
      g.addColorStop(1, "rgba(42,91,255,0)");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(cx, cy, 46, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = "#f2eee4";
      ctx.lineWidth = 1.2;
      ctx.beginPath();
      ctx.arc(cx, cy, 24, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([3, 7]);
      ctx.lineDashOffset = -t * 14;
      ctx.beginPath();
      ctx.arc(cx, cy, 36, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#f2eee4";
      ctx.font = `600 9px ${MONO}`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText("AGENT", cx, cy);

      // hubs
      HUBS.forEach((h, i) => {
        const p = hubPos[i];
        const on = hoverIdx === i;
        ctx.globalAlpha = on ? 0.3 : 0.14;
        ctx.fillStyle = h.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, on ? 20 : 14, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();
        if (on) {
          ctx.strokeStyle = h.color;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(p.x, p.y, 25, 0, Math.PI * 2);
          ctx.stroke();
        }
        const ang = Math.atan2(p.y - cy, p.x - cx);
        const lx = p.x + Math.cos(ang) * 30;
        const ly = p.y + Math.sin(ang) * 26;
        ctx.font = `600 11px ${MONO}`;
        ctx.fillStyle = on ? "#ffffff" : h.color;
        ctx.textAlign = Math.cos(ang) > 0.35 ? "left" : Math.cos(ang) < -0.35 ? "right" : "center";
        ctx.fillText(h.label, lx, ly);
      });
      ctx.globalAlpha = 1;
    }

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      t += dt;
      draw(dt);
      if (visible && !reduced) raf = requestAnimationFrame(frame);
    };

    const pick = (x: number, y: number) => {
      let idx = -1;
      hubPos.forEach((h, i) => {
        if (Math.hypot(h.x - x, h.y - y) < 30) idx = i;
      });
      return idx;
    };
    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
      const idx = pick(mouse.x, mouse.y);
      if (idx !== hoverIdx) {
        hoverIdx = idx;
        setActive(idx >= 0 ? HUBS[idx] : null);
      }
      if (reduced) draw(0);
    };
    const onLeave = () => {
      mouse.x = mouse.y = -999;
      hoverIdx = -1;
      setActive(null);
      if (reduced) draw(0);
    };
    const onClick = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      const idx = pick(e.clientX - r.left, e.clientY - r.top);
      if (idx < 0) return;
      for (let i = 0; i < 5; i++) packets.push({ a: idx, b: (idx + 1 + Math.floor(Math.random() * 5)) % HUBS.length, p: -i * 0.18 });
    };

    const ro = new ResizeObserver(resize);
    ro.observe(box);
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible && !reduced) {
        cancelAnimationFrame(raf);
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    });
    io.observe(box);
    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerleave", onLeave);
    box.addEventListener("pointerdown", onClick);
    resize();
    if (!reduced) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerleave", onLeave);
      box.removeEventListener("pointerdown", onClick);
    };
  }, []);

  return (
    <div
      ref={wrap}
      className="relative h-full w-full"
      role="img"
      aria-label="Interactive diagram: an AI agent core connected to LLM, voice, WhatsApp, CRM, NFC and IoT systems"
    >
      <canvas ref={cv} className="absolute inset-0 h-full w-full" />
      <p className="pointer-events-none absolute bottom-3 left-4 right-4 font-mono text-[11px] text-paper/60">
        {active ? (
          <>
            <span style={{ color: active.color }}>■ {active.label}</span> — {active.desc}
          </>
        ) : (
          <>hover a node · tap to send data</>
        )}
      </p>
    </div>
  );
}
