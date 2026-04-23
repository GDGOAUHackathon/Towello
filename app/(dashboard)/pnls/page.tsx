"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, LineChart } from "lucide-react";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { StatCard } from "@/components/dashboard/StatCard";
import { TabSwitcher } from "@/components/dashboard/TabSwitcher";
import { PnLChart } from "@/components/charts/PnLChart";
import { usePnL } from "@/hooks/usePnL";
import { formatCurrency } from "@/lib/utils/format";
import type { PnLTimeframe } from "@/types/pnl";

const TIMEFRAMES: PnLTimeframe[] = ["1D", "1W", "1M", "1Y", "ALL"];

export default function PnLsPage() {
  const [tf, setTf] = useState<PnLTimeframe>("1M");
  const { pnl, isLoading, error } = usePnL(tf);

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        <StatCard
          label="Settlement P&L"
          value={
            pnl?.settlementPnl !== undefined
              ? formatCurrency(pnl.settlementPnl)
              : "—"
          }
          meta="Cash settled profit and loss"
          icon={ArrowUpRight}
          tone="positive"
        />
        <StatCard
          label="Trade P&L"
          value={
            pnl?.tradePnl !== undefined ? formatCurrency(pnl.tradePnl) : "—"
          }
          meta="Execution-driven realized performance"
          icon={ArrowDownRight}
          tone="neutral"
        />
        <StatCard
          label="Timeframe"
          value={tf}
          meta="Current window used for the chart"
          icon={LineChart}
        />
      </section>

      <TabSwitcher
        tabs={TIMEFRAMES.map((value) => ({ id: value, label: value }))}
        activeTab={tf}
        onChange={(value) => setTf(value as PnLTimeframe)}
      />

      {error ? (
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-6 text-sm text-red-400">
          {error}
        </div>
      ) : null}

      <ChartContainer
        title="PnL chart"
        subtitle="Period aggregate snapshot from Bayse."
      >
        {isLoading ? (
          <div className="h-48 rounded-2xl bg-white/6" />
        ) : pnl ? (
          <PnLChart snapshots={pnl.snapshots} />
        ) : (
          <div className="rounded-2xl border border-dashed border-white/10 bg-black/40 p-8 text-center text-sm text-zinc-500">
            No P&L data for this timeframe.
          </div>
        )}
      </ChartContainer>

      {pnl?.breakdown?.length ? (
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          <div className="border-b border-white/5 px-5 py-4 sm:px-6">
            <h3 className="text-lg font-semibold text-zinc-50">Top events</h3>
          </div>
          <div className="divide-y divide-white/5">
            {pnl.breakdown.slice(0, 10).map((row) => (
              <div
                key={row.eventId}
                className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
              >
                <div>
                  <p className="font-medium text-zinc-50">{row.eventTitle}</p>
                  <p className="mt-1 text-xs text-zinc-500">{row.currency}</p>
                </div>
                <span
                  className={
                    row.realizedPnl >= 0
                      ? "tabular-nums text-emerald-400"
                      : "tabular-nums text-red-400"
                  }
                >
                  {formatCurrency(row.realizedPnl)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : null}
    </div>
  );
}
