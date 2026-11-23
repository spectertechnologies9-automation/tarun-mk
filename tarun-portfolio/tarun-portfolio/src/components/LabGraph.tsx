"use client";

import { useState } from "react";

/** Animated node graph for the lab workbench: glowing nodes, links and data packets. */
export function LabGraph({ nodes, color }: { nodes: string[]; color: string }) {
  const [hover, setHover] = useState(-1);
  const n = nodes.length;
  const W = 440;
  const H = 260;
  const pts = nodes.map((_, i) => ({ x: 44 + (i * (W - 88)) / (n - 1), y: H / 2 + (i % 2 ? -48 : 48) }));
  const path = pts.map((p, i) => `${i ? "L" : "M"}${p.x},${p.y}`).join(" ");

  // ambient background nodes (static positions so there is no layout shift)
  const amb = Array.from({ length: 16 }, (_, i) => ({ x: 20 + ((i * 97) % 400), y: 16 + ((i * 53) % 230), r: 1 + (i % 3) * 0.6 }));

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" role="img" aria-label={`Diagram: ${nodes.join(" to ")}`} key={nodes.join()}>
      <defs>
        <filter id="lab-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>
      {amb.map((a, i) => (
        <circle key={i} cx={a.x} cy={a.y} r={a.r} fill={color} opacity=".25" className="animate-pulse" style={{ animationDelay: `${(i % 6) * 0.4}s` }} />
      ))}
      <path d={path} fill="none" stroke={color} strokeOpacity=".35" strokeWidth="1.5" strokeDasharray="4 6" className="animate-dash" />
      {pts.slice(0, -1).map((p, i) => (
        <circle key={i} r="3" fill="#c8ff3d">
          <animateMotion dur={`${2.2 + i * 0.1}s`} begin={`${i * 0.55}s`} repeatCount="indefinite" path={`M${p.x},${p.y} L${pts[i + 1].x},${pts[i + 1].y}`} />
        </circle>
      ))}
      {pts.map((p, i) => (
        <g key={i} onMouseEnter={() => setHover(i)} onMouseLeave={() => setHover(-1)} style={{ cursor: "default" }}>
          <circle cx={p.x} cy={p.y} r={hover === i ? 22 : 16} fill={color} opacity=".35" filter="url(#lab-glow)" />
          <circle cx={p.x} cy={p.y} r="9" fill="#050914" stroke={color} strokeWidth="2" />
          <circle cx={p.x} cy={p.y} r="3.5" fill={color}>
            <animate attributeName="opacity" values="1;.3;1" dur="2.4s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
          </circle>
          <text x={p.x} y={p.y + (i % 2 ? -22 : 30)} textAnchor="middle" fontSize="11" fill={hover === i ? "#fff" : "#cfd8ff"} fontFamily='"JetBrains Mono Variable", monospace'>
            {nodes[i]}
          </text>
        </g>
      ))}
    </svg>
  );
}
