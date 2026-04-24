"use client";

import { Briefcase, Wallet } from "lucide-react";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { usePortfolio } from "@/hooks/usePortfolio";
import { formatCurrency, formatDate } from "@/lib/utils/format";

export default function PositionsPage() {
  const { portfolio, summary, isLoading, error } = usePortfolio();
  const totalValue = summary?.totalValue ?? 0;

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-2">
        <StatCard
          label="Portfolio value"
          value={isLoading ? "—" : formatCurrency(totalValue)}
          meta="Live value from the connected Bayse account"
          icon={Wallet}
        />
        <StatCard
          label="Open positions"
          value={isLoading ? "—" : String(summary?.positionsCount ?? 0)}
          meta="Rows currently tracked in the portfolio feed"
          icon={Briefcase}
          tone="neutral"
        />
      </section>

      {error ? (
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-6 text-sm text-red-400">
          {error}
        </div>
      ) : null}

      <DataTable
        title="Positions"
        description="Open outcome positions from your Bayse portfolio."
        emptyState={
          isLoading ? (
            <div className="space-y-3 p-5">
              <div className="h-12 rounded-2xl bg-white/6" />
              <div className="h-12 rounded-2xl bg-white/6" />
              <div className="h-12 rounded-2xl bg-white/6" />
            </div>
          ) : !portfolio?.length ? (
            <div className="p-8 text-center text-sm text-zinc-500">
              No open positions.
            </div>
          ) : undefined
        }
      >
        {portfolio && portfolio.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b border-white/5 text-xs uppercase tracking-[0.22em] text-zinc-500">
                <tr>
                  <th className="px-5 py-4 font-medium sm:px-6">Market</th>
                  <th className="px-5 py-4 font-medium sm:px-6">Side</th>
                  <th className="px-5 py-4 font-medium text-right sm:px-6">
                    Qty
                  </th>
                  <th className="px-5 py-4 font-medium text-right sm:px-6">
                    Value
                  </th>
                  <th className="px-5 py-4 font-medium text-right sm:px-6">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {portfolio.map((position) => (
                  <tr
                    key={position.id}
                    className="bg-zinc-950/50 transition hover:bg-white/[0.025]"
                  >
                    <td className="px-5 py-4 sm:px-6">
                      <div className="min-w-0">
                        <p className="truncate font-medium text-zinc-50">
                          {position.assetName}
                        </p>
                        <p className="mt-1 text-xs text-zinc-500">
                          {position.symbol}
                        </p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-zinc-500 sm:px-6">
                      {position.symbol.includes("·")
                        ? position.symbol.split("·").pop()?.trim()
                        : "—"}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-zinc-50 sm:px-6">
                      {position.quantity.toLocaleString("en-US", {
                        maximumFractionDigits: 4,
                      })}
                    </td>
                    <td className="px-5 py-4 text-right tabular-nums text-zinc-50 sm:px-6">
                      {formatCurrency(position.totalValue)}
                    </td>
                    <td className="px-5 py-4 text-right text-zinc-500 sm:px-6">
                      {formatDate(position.lastUpdated)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </DataTable>
    </div>
  );
}
