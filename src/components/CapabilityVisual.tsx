import type { Capability } from "@/data/capabilities";

/** Small technical illustration per capability. Pure SVG/CSS. */
export function CapabilityVisual({ id }: { id: Capability["id"] }) {
  const gid = `cv-${id}`;
  const defs = (
    <defs>
      <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%" stopColor="#6b93ff" />
        <stop offset="100%" stopColor="#a78bfa" />
      </linearGradient>
    </defs>
  );
  const s = `url(#${gid})`;
  const common = { viewBox: "0 0 240 72", className: "h-full w-full", "aria-hidden": true } as const;

  switch (id) {
    case "ai": {
      const nodes = [
        [24, 36], [70, 14], [70, 36], [70, 58], [120, 22], [120, 50], [170, 36], [216, 36],
      ];
      const edges = [[0,1],[0,2],[0,3],[1,4],[2,4],[2,5],[3,5],[4,6],[5,6],[6,7]];
      return (
        <svg {...common}>
          {defs}
          {edges.map(([a, b], i) => (
            <line key={i} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} stroke={s} strokeWidth="1" opacity="0.5" />
          ))}
          {nodes.map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 7 ? 5 : 3.5} fill={i === 7 ? s : "#0e1015"} stroke={s} strokeWidth="1.5" />
          ))}
        </svg>
      );
    }
    case "voice":
      return (
        <svg {...common}>
          {defs}
          {Array.from({ length: 28 }).map((_, i) => (
            <rect
              key={i}
              x={10 + i * 8}
              y={12}
              width="3"
              height="48"
              rx="1.5"
              fill={s}
              opacity={0.35 + ((i * 7) % 10) / 16}
              className="origin-center animate-wave"
              style={{ transformOrigin: "center", transformBox: "fill-box", animationDelay: `${(i % 9) * 0.12}s` }}
            />
          ))}
        </svg>
      );
    case "whatsapp":
      return (
        <svg {...common}>
          {defs}
          <rect x="14" y="8" width="108" height="26" rx="13" fill="none" stroke={s} strokeWidth="1.5" />
          <line x1="30" y1="21" x2="100" y2="21" stroke={s} strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <rect x="118" y="38" width="108" height="26" rx="13" fill={s} opacity="0.2" />
          <rect x="118" y="38" width="108" height="26" rx="13" fill="none" stroke={s} strokeWidth="1.5" />
          <line x1="134" y1="51" x2="206" y2="51" stroke={s} strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <circle cx="212" cy="12" r="3" fill={s} className="animate-pulse" />
        </svg>
      );
    case "software":
      return (
        <svg {...common}>
          {defs}
          <path d="M44 20 L22 36 L44 52" fill="none" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M196 20 L218 36 L196 52" fill="none" stroke={s} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M132 14 L108 58" stroke={s} strokeWidth="2.5" strokeLinecap="round" />
          {[0, 1, 2].map((i) => (
            <line key={i} x1="58" y1={26 + i * 10} x2={90 - i * 6} y2={26 + i * 10} stroke={s} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          ))}
          {[0, 1, 2].map((i) => (
            <line key={i} x1="148" y1={26 + i * 10} x2={178 - i * 8} y2={26 + i * 10} stroke={s} strokeWidth="2" strokeLinecap="round" opacity="0.4" />
          ))}
        </svg>
      );
    case "automation":
      return (
        <svg {...common}>
          {defs}
          <line x1="48" y1="36" x2="96" y2="36" stroke={s} strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
          <line x1="144" y1="36" x2="192" y2="36" stroke={s} strokeWidth="1.5" strokeDasharray="4 4" className="animate-dash" />
          <rect x="16" y="20" width="32" height="32" rx="8" fill="none" stroke={s} strokeWidth="1.5" />
          <rect x="96" y="14" width="48" height="44" rx="10" fill={s} opacity="0.15" />
          <rect x="96" y="14" width="48" height="44" rx="10" fill="none" stroke={s} strokeWidth="1.5" />
          <rect x="192" y="20" width="32" height="32" rx="8" fill="none" stroke={s} strokeWidth="1.5" />
          <path d="M112 36 l6 6 l12 -12" fill="none" stroke={s} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );
    case "connected":
      return (
        <svg {...common}>
          {defs}
          <rect x="30" y="14" width="64" height="44" rx="8" fill="none" stroke={s} strokeWidth="1.5" />
          <rect x="40" y="24" width="14" height="11" rx="2" fill={s} opacity="0.5" />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M ${110 + i * 16} ${36 - 8 - i * 4} A ${14 + i * 8} ${14 + i * 8} 0 0 1 ${110 + i * 16} ${36 + 8 + i * 4}`}
              fill="none"
              stroke={s}
              strokeWidth="2"
              strokeLinecap="round"
              opacity={1 - i * 0.2}
              className="animate-pulse"
              style={{ animationDelay: `${i * 0.25}s` }}
            />
          ))}
          <rect x="196" y="10" width="26" height="52" rx="6" fill="none" stroke={s} strokeWidth="1.5" />
          <circle cx="209" cy="54" r="1.8" fill={s} />
        </svg>
      );
  }
}
