/** Infinite CSS marquee (pauses on hover, stops for reduced motion via global CSS). */
export function Marquee({
  items,
  className = "",
  speed = 40,
  sep = "✦",
}: {
  items: string[];
  className?: string;
  speed?: number;
  sep?: string;
}) {
  return (
    <div className={`overflow-hidden ${className}`}>
      <div
        className="flex w-max animate-marquee hover:[animation-play-state:paused]"
        style={{ animationDuration: `${speed}s` }}
      >
        {[0, 1].map((k) => (
          <ul key={k} className="flex shrink-0 items-center" aria-hidden={k === 1}>
            {items.map((it) => (
              <li key={it} className="flex items-center whitespace-nowrap">
                <span>{it}</span>
                <span className="mx-8 opacity-50 sm:mx-12">{sep}</span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
