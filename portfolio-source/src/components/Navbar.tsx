"use client";

import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { links, nav, site } from "@/config/site";
import { Magnetic } from "./Magnetic";

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("");
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.3 });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    setOpen(false);
    if (pathname !== "/") {
      setActive("");
      return;
    }
    const els = nav
      .map((n) => document.getElementById(n.href.replace("/#", "")))
      .filter((el): el is HTMLElement => Boolean(el));
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [pathname]);

  return (
    <>
      {/* scroll progress */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-x-0 top-0 z-[210] h-[3px] origin-left bg-acid"
        style={{ scaleX: progress }}
      />

      <header className="pointer-events-none fixed inset-x-0 top-3 z-[200] flex justify-center px-3 sm:top-5">
        <div className="pointer-events-auto flex w-full max-w-[920px] items-center justify-between gap-2 rounded-full border border-white/10 bg-navy-900/80 p-1.5 pl-2 shadow-[0_10px_40px_-10px_rgba(0,0,0,.6)] backdrop-blur-xl">
          <Link href="/" aria-label={`${site.name} — home`} className="flex items-center gap-2.5 rounded-full pr-2">
            <span className="flex h-10 items-center rounded-full bg-acid px-3.5 font-display text-sm font-bold tracking-tight text-ink">
              TMK
            </span>
            <span className="hidden font-display text-sm font-medium sm:block">{site.name}</span>
          </Link>

          <nav aria-label="Primary" className="relative hidden items-center lg:flex">
            {nav.map((n) => {
              const id = n.href.replace("/#", "");
              const isActive = active === id;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={isActive ? "location" : undefined}
                  className={`relative rounded-full px-4 py-2 font-mono text-[12px] uppercase tracking-wider transition-colors ${
                    isActive ? "text-ink" : "text-paper/65 hover:text-paper"
                  }`}
                >
                  {isActive ? (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-paper"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  ) : null}
                  <span className="relative">{n.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5">
            <Link href="/#contact" className="btn btn-acid hidden min-h-10 px-5 text-sm lg:inline-flex">
              Let’s Connect
            </Link>
            <button
              type="button"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((o) => !o)}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: "circle(0% at 92% 4%)" }}
            animate={{ clipPath: "circle(150% at 92% 4%)" }}
            exit={{ clipPath: "circle(0% at 92% 4%)" }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[190] flex flex-col overflow-y-auto bg-cobalt px-6 pb-10 pt-28 lg:hidden"
          >
            <nav aria-label="Mobile" className="flex flex-col">
              {nav.map((n, i) => (
                <motion.div
                  key={n.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25 + 0.06 * i, duration: 0.5 }}
                >
                  <Link
                    href={n.href}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline justify-between border-b border-white/20 py-3 font-display text-[2.4rem] font-semibold leading-none tracking-tight"
                  >
                    {n.label}
                    <span className="font-mono text-xs text-white/60">0{i + 1}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="mt-auto grid gap-3 pt-10">
              <a href={links.whatsapp} target="_blank" rel="noopener noreferrer" className="btn btn-acid">
                Let’s Talk on WhatsApp
              </a>
              <a href={links.tel} className="btn border border-white/40 text-white">
                Call {site.contact.phoneDisplay}
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
