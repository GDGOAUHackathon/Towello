"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import {
  ArrowDownRight,
  ArrowUpRight,
  BadgeDollarSign,
  Briefcase,
  Wallet,
} from "lucide-react";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { DataTable } from "@/components/dashboard/DataTable";
import { StatCard } from "@/components/dashboard/StatCard";
import { TabSwitcher } from "@/components/dashboard/TabSwitcher";
import { PnLChart } from "@/components/charts/PnLChart";
import { useAnalysis } from "@/hooks/useAnalysis";
import { usePnL } from "@/hooks/usePnL";
import { usePortfolio } from "@/hooks/usePortfolio";
import {
  formatCurrency,
  formatDate,
  formatPercentage,
} from "@/lib/utils/format";
import { useCurrency } from "@/components/providers/CurrencyProvider";
import { auth } from "firebase-admin";
import { getAuth } from "firebase/auth";

type DashboardTab = "positions" | "pnl" | "analysis";

const TABS = [
  { id: "positions", label: "Positions" },
  { id: "pnl", label: "P&L" },
  { id: "analysis", label: "AI Analysis" },
] as const;

function LoadingPanel() {
  return (
    <div className="space-y-3 rounded-3xl border border-white/10 bg-zinc-950/50 p-5">
      <div className="h-4 w-28 rounded-full bg-white/6" />
      <div className="h-24 rounded-2xl bg-white/6" />
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="h-16 rounded-2xl bg-white/6" />
        <div className="h-16 rounded-2xl bg-white/6" />
      </div>
    </div>
  );
}

function EmptyState({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-white/10 bg-black/40 p-8 text-center">
      <p className="text-base font-medium text-zinc-50">{title}</p>
      <p className="mt-2 text-sm text-zinc-500">{description}</p>
      {action ? <div className="mt-5 flex justify-center">{action}</div> : null}
    </div>
  );
}

function CardButton({
  children,
  onClick,
  variant = "primary",
}: {
  children: ReactNode;
  onClick: () => void;
  variant?: "primary" | "secondary";
}) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2.5 text-sm font-medium transition duration-200";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${base} ${
        variant === "primary"
          ? "border border-emerald-500/25 bg-emerald-500/10 text-zinc-50 hover:border-emerald-500/45 hover:text-emerald-400"
          : "border border-white/10 bg-black/40 text-zinc-50 hover:border-emerald-500/30 hover:text-emerald-400"
      }`}
    >
      {children}
    </button>
  );
}

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<DashboardTab>("positions");
  const {
    portfolio,
    summary,
    isLoading: portfolioLoading,
    error: portfolioError,
  } = usePortfolio();
  const { pnl, isLoading: pnlLoading, error: pnlError } = usePnL("1M");
  const {
    analysis,
    error: analysisError,
    isLoading: analysisLoading,
    runAnalysis,
  } = useAnalysis();
  const { currency } = useCurrency();

  // useEffect(() => {
  //   const auth = getAuth();
  //   async function fetchData() {
  //     console.log(await auth.currentUser.getIdToken());
  //   }
  //   fetchData();
  // }, []);

  const totalValue = summary?.totalValue ?? 0;
  const dailyChange = summary?.dailyChange ?? 0;
  const dailyChangePercentage = summary?.dailyChangePercentage ?? 0;
  const positionsCount = summary?.positionsCount ?? 0;
  const realizedPnl =
    pnl?.realizedPnl ?? pnl?.tradePnl ?? pnl?.settlementPnl ?? 0;
  const pnlTrendUp = realizedPnl >= 0;

  const insightLabel = useMemo(() => {
    if (pnl?.breakdown?.length)
      return pnl.breakdown[0]?.eventTitle ?? "Tracking live events";
    return "Connect your account to surface more signal.";
  }, [pnl?.breakdown]);

  const metrics = [
    {
      label: "Total portfolio value",
      value: portfolioLoading ? "—" : formatCurrency(totalValue, currency),
      meta: portfolioLoading
        ? "Loading live portfolio data"
        : `Updated ${formatDate(new Date())}`,
      icon: Wallet,
      tone: "accent" as const,
    },
    {
      label: "Daily change",
      value: portfolioLoading
        ? "—"
        : `${formatCurrency(dailyChange, currency)} · ${formatPercentage(dailyChangePercentage)}`,
      meta:
        dailyChange >= 0
          ? "Positive momentum across tracked markets"
          : "Today is pulling back slightly",
      icon: dailyChange >= 0 ? ArrowUpRight : ArrowDownRight,
      tone: dailyChange >= 0 ? ("positive" as const) : ("negative" as const),
    },
    {
      label: "Open positions",
      value: portfolioLoading ? "—" : String(positionsCount),
      meta: portfolio?.length
        ? `${portfolio.length} active rows in the table view`
        : "No active positions yet",
      icon: Briefcase,
      tone: "neutral" as const,
    },
    {
      label: "Realized P&L",
      value: pnlLoading ? "—" : formatCurrency(realizedPnl, currency),
      meta: pnlLoading
        ? "Syncing the latest profit and loss"
        : pnlTrendUp
          ? "Trading performance is holding above zero"
          : "Current realized P&L is below zero",
      icon: BadgeDollarSign,
      tone: pnlTrendUp ? ("positive" as const) : ("negative" as const),
    },
  ];

  const positionsTable = portfolioLoading ? (
    <LoadingPanel />
  ) : portfolioError ? (
    <EmptyState title="Unable to load positions" description={portfolioError} />
  ) : !portfolio?.length ? (
    <EmptyState
      title="No positions yet"
      description="Once Bayse returns open positions, they will appear here with entry, value, and last updated data."
    />
  ) : (
    <div className="overflow-x-auto">
      <table className="min-w-full text-left text-sm">
        <thead className="border-b border-white/5 text-xs uppercase tracking-[0.22em] text-zinc-500">
          <tr>
            <th className="px-5 py-4 font-medium sm:px-6">Market</th>
            <th className="px-5 py-4 font-medium sm:px-6">Side</th>
            <th className="px-5 py-4 font-medium text-right sm:px-6">Qty</th>
            <th className="px-5 py-4 font-medium text-right sm:px-6">Value</th>
            <th className="px-5 py-4 font-medium text-right sm:px-6">
              Updated
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {portfolio.map((position) => (
            <tr
              key={position.id}
              className="bg-zinc-950/50 transition hover:bg-white/2.5"
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
                {position.quantity.toLocaleString("en-NG", {
                  maximumFractionDigits: 4,
                })}
              </td>
              <td className="px-5 py-4 text-right tabular-nums text-zinc-50 sm:px-6">
                {formatCurrency(position.totalValue, currency)}
              </td>
              <td className="px-5 py-4 text-right text-zinc-500 sm:px-6">
                {formatDate(position.lastUpdated)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const pnlPanel = pnlLoading ? (
    <LoadingPanel />
  ) : pnlError ? (
    <EmptyState title="Unable to load P&L" description={pnlError} />
  ) : pnl ? (
    <div className="space-y-4">
      <ChartContainer
        title="Realized P&L"
        subtitle="Bayse currently returns period aggregates instead of an intraday series for this endpoint."
      >
        <PnLChart snapshots={pnl.snapshots} />
      </ChartContainer>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            Settlement P&L
          </p>
          <p className="mt-3 text-2xl font-semibold tabular-nums text-zinc-50">
            {pnl.settlementPnl !== undefined
              ? formatCurrency(pnl.settlementPnl, currency)
              : "—"}
          </p>
        </div>
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-5 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
          <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
            Trade P&L
          </p>
          <p className="mt-3 text-2xl font-semibold tabular-nums text-zinc-50">
            {pnl.tradePnl !== undefined ? formatCurrency(pnl.tradePnl, currency) : "—"}
          </p>
        </div>
      </div>

      {pnl.breakdown?.length ? (
        <DataTable
          title="Top events"
          description="Largest realized contributions in the selected window."
        >
          <div className="divide-y divide-white/5">
            {pnl.breakdown.slice(0, 10).map((row) => (
              <div
                key={row.eventId}
                className="flex items-center justify-between gap-4 px-5 py-4 sm:px-6"
              >
                <div>
                  <p className="font-medium text-zinc-50">{row.eventTitle}</p>
                  <p className="mt-1 text-xs text-zinc-500">
                    {formatDate(row.lastActivity)}
                  </p>
                </div>
                <span
                  className={`shrink-0 tabular-nums ${
                    row.realizedPnl >= 0 ? "text-emerald-400" : "text-red-400"
                  }`}
                >
                  {formatCurrency(row.realizedPnl, currency)}
                </span>
              </div>
            ))}
          </div>
        </DataTable>
      ) : null}
    </div>
  ) : (
    <EmptyState
      title="No P&L data yet"
      description="Run a refresh after connecting your portfolio to populate P&L aggregates."
    />
  );

  const analysisPanel = analysisLoading ? (
    <LoadingPanel />
  ) : analysisError ? (
    <EmptyState title="Analysis unavailable" description={analysisError} />
  ) : analysis ? (
    <div className="space-y-4">
      <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
        <div className="prose prose-invert max-w-none prose-p:text-zinc-50 prose-headings:text-zinc-50 prose-li:text-zinc-50">
          <ReactMarkdown>{analysis}</ReactMarkdown>
        </div>
      </div>
    </div>
  ) : (
    <EmptyState
      title="Run AI analysis"
      description="Generate a premium portfolio summary with Gemini when you need a quick risk read."
      action={
        <CardButton onClick={() => void runAnalysis(portfolio, pnl)}>Run analysis</CardButton>
      }
    />
  );

  return (
    <div className="space-y-6">
      <section className="grid gap-4 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard
            key={metric.label}
            label={metric.label}
            value={metric.value}
            meta={metric.meta}
            icon={metric.icon}
            tone={metric.tone}
          />
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabSwitcher
              tabs={TABS as unknown as { id: string; label: string }[]}
              activeTab={activeTab}
              onChange={(tabId) => setActiveTab(tabId as DashboardTab)}
            />
            <span className="text-sm text-zinc-500">
              Live edge: {insightLabel}
            </span>
          </div>

          {activeTab === "positions" ? (
            <DataTable
              title="Positions"
              description="Open outcome positions from the connected Bayse portfolio."
            >
              {positionsTable}
            </DataTable>
          ) : null}

          {activeTab === "pnl" ? (
            <div className="space-y-4">{pnlPanel}</div>
          ) : null}

          {activeTab === "analysis" ? (
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-semibold text-zinc-50">
                    AI Analysis
                  </h2>
                  <p className="mt-1 text-sm text-zinc-500">
                    Uses Google Gemini to summarize the current portfolio in
                    plain English.
                  </p>
                </div>
                <CardButton onClick={() => void runAnalysis(portfolio, pnl)}>
                  Run analysis
                </CardButton>
              </div>
              {analysisPanel}
            </div>
          ) : null}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
                  Wallet balance
                </p>
                <p className="mt-3 text-3xl font-semibold tabular-nums text-zinc-50">
                  {portfolioLoading ? "—" : formatCurrency(totalValue, currency)}
                </p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-emerald-500/20 bg-emerald-500/10 text-emerald-400">
                <Wallet className="h-5 w-5" />
              </div>
            </div>

            <div className="mt-5 space-y-3">
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm">
                <span className="text-zinc-500">Positions tracked</span>
                <span className="font-medium text-zinc-50">
                  {positionsCount}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm">
                <span className="text-zinc-500">Daily change</span>
                <span
                  className={
                    dailyChange >= 0
                      ? "font-medium text-emerald-400"
                      : "font-medium text-red-400"
                  }
                >
                  {formatCurrency(dailyChange, currency)}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl border border-white/5 bg-black/40 px-4 py-3 text-sm">
                <span className="text-zinc-500">Analysis status</span>
                <span className="font-medium text-zinc-50">
                  {analysis ? "Ready" : "Pending"}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-6 shadow-[0_16px_40px_rgba(0,0,0,0.28)]">
            <p className="text-xs uppercase tracking-[0.28em] text-zinc-500">
              Insight feed
            </p>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4">
                <p className="text-sm font-medium text-zinc-50">
                  Latest signal
                </p>
                <p className="mt-2 text-sm text-zinc-500">{insightLabel}</p>
              </div>
              <div className="rounded-2xl border border-white/5 bg-black/40 p-4">
                <p className="text-sm font-medium text-zinc-50">Quick status</p>
                <p className="mt-2 text-sm text-zinc-500">
                  {pnl?.breakdown?.length
                    ? `${pnl.breakdown.length} realized events tracked in the current window.`
                    : "No realized event breakdown available yet."}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
