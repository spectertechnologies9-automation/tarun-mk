"use client";

import { useEffect, useRef } from "react";

/** Custom cursor — only for fine pointers (mouse) and when motion is allowed. */
export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const d = dot.current!;
    const r = ring.current!;
    document.documentElement.classList.add("cursor-on");
    d.style.opacity = "0";
    r.style.opacity = "0";

    let x = -100,
      y = -100,
      rx = -100,
      ry = -100,
      raf = 0,
      shown = false;

    const move = (e: PointerEvent) => {
      x = e.clientX;
      y = e.clientY;
      if (!shown) {
        shown = true;
        rx = x;
        ry = y;
        d.style.opacity = "1";
        r.style.opacity = "1";
      }
      const t = e.target as HTMLElement | null;
      const field = !!t?.closest?.("input,textarea,select");
      const hover = !!t?.closest?.("a,button,[role='button'],[data-cursor]");
      const state = field ? "hidden" : hover ? "hover" : "idle";
      r.dataset.state = state;
      d.dataset.state = state;
    };
    const tick = () => {
      rx += (x - rx) * 0.18;
      ry += (y - ry) * 0.18;
      d.style.transform = `translate3d(${x}px,${y}px,0)`;
      r.style.transform = `translate3d(${rx}px,${ry}px,0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", move, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", move);
      document.documentElement.classList.remove("cursor-on");
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="cursor-ring pointer-events-none fixed left-0 top-0 z-[400] -ml-[18px] -mt-[18px] mix-blend-difference transition-opacity"
      >
        <div className="cursor-ring-inner h-9 w-9 rounded-full border border-white transition-transform duration-300" />
      </div>
      <div
        ref={dot}
        aria-hidden="true"
        className="cursor-dot pointer-events-none fixed left-0 top-0 z-[400] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-white mix-blend-difference transition-opacity"
      />
    </>
  );
}
