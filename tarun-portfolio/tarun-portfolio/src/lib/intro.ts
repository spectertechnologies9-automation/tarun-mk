declare global {
  interface Window {
    __tmkIntro?: boolean;
  }
}

/** Called by the loader when the intro is finished (or skipped) so the hero can start animating. */
export function markIntroDone() {
  if (typeof window === "undefined") return;
  window.__tmkIntro = true;
  window.dispatchEvent(new Event("tmk:intro"));
}

export function onIntro(cb: () => void) {
  if (window.__tmkIntro) {
    cb();
    return () => {};
  }
  const h = () => cb();
  window.addEventListener("tmk:intro", h);
  return () => window.removeEventListener("tmk:intro", h);
}
