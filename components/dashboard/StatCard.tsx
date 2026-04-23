import { type LucideIcon } from "lucide-react";

type StatCardProps = {
  label: string;
  value: string;
  meta: string;
  icon: LucideIcon;
  tone?: "neutral" | "positive" | "negative" | "gold";
};

const toneClasses: Record<NonNullable<StatCardProps["tone"]>, string> = {
  neutral: "text-[#F0F0F0]",
  positive: "text-[#4ADE80]",
  negative: "text-[#F87171]",
  gold: "text-[#F0C040]",
};

export function StatCard({
  label,
  value,
  meta,
  icon: Icon,
  tone = "gold",
}: StatCardProps) {
  return (
    <article className="group rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] p-5 shadow-[0_16px_40px_rgba(0,0,0,0.32)] transition-all duration-200 hover:-translate-y-1 hover:border-[#F0C040]/35 hover:shadow-[0_18px_50px_rgba(0,0,0,0.44)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[#888888]">
            {label}
          </p>
          <p className="mt-3 truncate text-3xl font-semibold tabular-nums text-[#F0F0F0]">
            {value}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-[#2A2A2A] bg-[#111111] text-[#F0C040] transition group-hover:border-[#F0C040]/35 group-hover:bg-[#F0C040]/10">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      <p className={`mt-4 text-sm ${toneClasses[tone]}`}>{meta}</p>
    </article>
  );
}
