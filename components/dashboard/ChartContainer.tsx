import type { ReactNode } from "react";

type ChartContainerProps = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function ChartContainer({
  title,
  subtitle,
  children,
}: ChartContainerProps) {
  return (
    <section className="rounded-3xl border border-white/10 bg-zinc-950/50 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
      <div className="border-b border-white/5 px-5 py-4 sm:px-6">
        <h3 className="text-lg font-semibold text-zinc-50">{title}</h3>
        {subtitle ? (
          <p className="mt-1 text-sm text-zinc-500">{subtitle}</p>
        ) : null}
      </div>
      <div className="p-5 sm:p-6">{children}</div>
    </section>
  );
}
