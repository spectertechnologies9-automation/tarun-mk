import type { Status } from "@/data/types";

const dots: Record<Status, string> = {
  Exploring: "bg-violet-400",
  "In Development": "bg-cobalt-400",
  Prototype: "bg-amber-400",
  Completed: "bg-emerald-400",
  "Coming Soon": "bg-zinc-400",
};

/** `dark` = for use on dark surfaces; otherwise for light surfaces. */
export function StatusBadge({ status, dark = false }: { status: Status; dark?: boolean }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider ${
        dark ? "border-white/20 bg-white/10 text-white" : "border-ink/15 bg-ink/5 text-ink"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dots[status]}`} aria-hidden="true" />
      {status}
    </span>
  );
}
