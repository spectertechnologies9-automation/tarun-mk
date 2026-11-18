/** Decorative technology visuals for each venture (pure SVG + CSS, no JS). */
export function VentureVisual({ id, stroke }: { id: string; stroke: string }) {
  if (id === "spectre") {
    // NFC-style radiating signal + connected grid
    return (
      <svg viewBox="0 0 320 160" className="h-full w-full" role="img" aria-label="NFC signal illustration">
        <defs>
          <radialGradient id="sp-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.35" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="160" cy="80" r="70" fill="url(#sp-glow)" />
        {[0, 1, 2].map((i) => (
          <path
            key={i}
            d={`M ${160 + 22 + i * 18} ${80 - 14 - i * 12} A ${24 + i * 18} ${24 + i * 18} 0 0 1 ${160 + 22 + i * 18} ${80 + 14 + i * 12}`}
            fill="none"
            stroke={stroke}
            strokeWidth="2"
            strokeLinecap="round"
            opacity={1 - i * 0.25}
          />
        ))}
        <rect x="96" y="52" width="48" height="56" rx="8" fill="none" stroke={stroke} strokeWidth="1.5" opacity="0.8" />
        <circle cx="120" cy="80" r="6" fill={stroke} />
        {Array.from({ length: 6 }).map((_, r) =>
          Array.from({ length: 12 }).map((__, c) => (
            <circle key={`${r}-${c}`} cx={20 + c * 26} cy={14 + r * 26} r="1.2" fill="#fff" opacity="0.14" />
          )),
        )}
        <circle cx="160" cy="80" r="30" fill="none" stroke={stroke} strokeWidth="1" className="origin-center animate-pulseRing" style={{ transformOrigin: "160px 80px" }} />
      </svg>
    );
  }

  // Tachyon: orbital paths with travelling particles
  return (
    <svg viewBox="0 0 320 160" className="h-full w-full" role="img" aria-label="Orbital systems illustration">
      <defs>
        <radialGradient id="ta-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.4" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="80" r="70" fill="url(#ta-glow)" />
      <g style={{ transformOrigin: "160px 80px" }} className="animate-spinSlow">
        <ellipse cx="160" cy="80" rx="110" ry="38" fill="none" stroke={stroke} strokeWidth="1" opacity="0.45" />
        <circle cx="270" cy="80" r="4" fill="#fff" />
      </g>
      <g style={{ transformOrigin: "160px 80px", transform: "rotate(60deg)" }}>
        <g style={{ transformOrigin: "160px 80px" }} className="animate-spinSlow [animation-direction:reverse] [animation-duration:20s]">
          <ellipse cx="160" cy="80" rx="100" ry="30" fill="none" stroke={stroke} strokeWidth="1" opacity="0.35" />
          <circle cx="260" cy="80" r="3.5" fill={stroke} />
        </g>
      </g>
      <g style={{ transformOrigin: "160px 80px", transform: "rotate(-60deg)" }}>
        <g style={{ transformOrigin: "160px 80px" }} className="animate-spinSlow [animation-duration:36s]">
          <ellipse cx="160" cy="80" rx="95" ry="26" fill="none" stroke={stroke} strokeWidth="1" opacity="0.3" />
          <circle cx="255" cy="80" r="3" fill="#fff" opacity="0.8" />
        </g>
      </g>
      <circle cx="160" cy="80" r="9" fill={stroke} />
      <circle cx="160" cy="80" r="18" fill="none" stroke={stroke} strokeWidth="1" opacity="0.5" />
    </svg>
  );
}
