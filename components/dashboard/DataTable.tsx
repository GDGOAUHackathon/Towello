import type { ReactNode } from "react";

type DataTableProps = {
  title: string;
  description?: string;
  emptyState?: ReactNode;
  children: ReactNode;
};

export function DataTable({
  title,
  description,
  emptyState,
  children,
}: DataTableProps) {
  return (
    <section className="rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
      <div className="flex items-start justify-between gap-4 border-b border-white/5 px-5 py-4 sm:px-6">
        <div>
          <h3 className="text-lg font-semibold text-[#F0F0F0]">{title}</h3>
          {description ? (
            <p className="mt-1 text-sm text-[#888888]">{description}</p>
          ) : null}
        </div>
      </div>

      <div className="overflow-hidden">{emptyState ?? children}</div>
    </section>
  );
}
