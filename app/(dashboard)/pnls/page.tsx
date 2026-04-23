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
        <div className="rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 text-sm text-[#F87171]">
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
          <div className="rounded-2xl border border-dashed border-[#2A2A2A] bg-[#111111] p-8 text-center text-sm text-[#888888]">
            No P&L data for this timeframe.
          </div>
        )}
      </ChartContainer>

      {pnl?.breakdown?.length ? (
        <div className="rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          <div className="border-b border-white/5 px-5 py-4 sm:px-6">
            <h3 className="text-lg font-semibold text-[#F0F0F0]">Top events</h3>
          </div>
          <div className="divide-y divide-white/5">
            {pnl.breakdown.slice(0, 10).map((row) => (
              <div
                key={row.eventId}
                className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
              >
                <div>
                  <p className="font-medium text-[#F0F0F0]">{row.eventTitle}</p>
                  <p className="mt-1 text-xs text-[#888888]">{row.currency}</p>
                </div>
                <span
                  className={
                    row.realizedPnl >= 0
                      ? "tabular-nums text-[#4ADE80]"
                      : "tabular-nums text-[#F87171]"
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
