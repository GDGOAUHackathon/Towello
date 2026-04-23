import { type LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  meta: string;
  icon: LucideIcon;
  tone?: "neutral" | "positive" | "negative" | "accent";
};

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  neutral: "text-zinc-50",
  positive: "text-emerald-400",
  negative: "text-red-400",
  accent: "text-emerald-400",
};

export function StatCard({
  label,
  value,
  meta,
  icon: Icon,
  tone = "accent",
}: StatCardProps) {
  return (
    <article className="group rounded-3xl border border-white/10 bg-zinc-950/50 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.32)] transition-all duration-200 hover:-translate-y-1 hover:border-emerald-500/35 hover:shadow-[0_18px_50px_rgba(0,0,0,0.44)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-zinc-500">
            {label}
          </p>
          <p className="mt-3 truncate text-3xl font-semibold tabular-nums text-zinc-50">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-emerald-400 transition group-hover:border-emerald-500/35 group-hover:bg-emerald-500/10">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className={`mt-4 text-sm ${toneClasses[tone]}`}>{meta}</p>
    </article>
  );
}
