"use client";

import { useState } from "react";
import { BrainCircuit, ChevronRight, Sparkles } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { StatCard } from "@/components/dashboard/StatCard";
import { TabSwitcher } from "@/components/dashboard/TabSwitcher";
import { useAnalysis } from "@/hooks/useAnalysis";
import { usePortfolio } from "@/hooks/usePortfolio";
import { usePnL } from "@/hooks/usePnL";
import { formatDate } from "@/lib/utils/format";

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "insights", label: "Insights" },
] as const;

export default function AnalyticsPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "insights">(
    "overview",
  );
  const { analysis, isLoading, error, runAnalysis } = useAnalysis();
  const { portfolio } = usePortfolio();
  const { pnl } = usePnL("1M");

  const headline = analysis
    ? "AI analysis completed. See below for the breakdown."
    : "Generate an AI view of the portfolio to highlight risk, confidence, and market posture.";

  return (
    <div className="space-y-6">
      <section className="grid gap-4 lg:grid-cols-3">
        <StatCard
          label="AI status"
          value={analysis ? "Ready" : "Idle"}
          meta={
            analysis
              ? "Latest portfolio summary is available"
              : "Run analysis to populate this view"
          }
          icon={BrainCircuit}
        />
        <StatCard
          label="Confidence"
          value={analysis ? "High" : "—"}
          meta="Model certainty from the latest run"
          icon={Sparkles}
        />
        <StatCard
          label="Generated"
          value={analysis ? "Recent" : "—"}
          meta="Timestamp of the last AI summary"
          icon={ChevronRight}
          tone="neutral"
        />
      </section>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <TabSwitcher
          tabs={TABS as unknown as { id: string; label: string }[]}
          activeTab={activeTab}
          onChange={(value) => setActiveTab(value as "overview" | "insights")}
        />
        <button
          type="button"
          onClick={() => void runAnalysis(portfolio, pnl)}
          className="inline-flex items-center gap-2 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 px-4 py-2.5 text-sm font-medium text-zinc-50 transition hover:border-emerald-500/45 hover:text-emerald-400"
        >
          <Sparkles className="h-4 w-4" />
          Refresh analysis
        </button>
      </div>

      {error ? (
        <div className="rounded-3xl border border-white/10 bg-zinc-950/50 p-6 text-sm text-red-400">
          {error}
        </div>
      ) : null}

      {activeTab === "overview" ? (
        <ChartContainer
          title="AI Overview"
          subtitle="High-level sentiment and risk posture for the portfolio."
        >
          {isLoading ? (
            <div className="space-y-3">
              <div className="h-4 w-2/3 rounded-full bg-white/6" />
              <div className="h-4 w-full rounded-full bg-white/6" />
              <div className="h-4 w-5/6 rounded-full bg-white/6" />
            </div>
          ) : analysis ? (
            <div className="prose prose-invert max-w-none prose-p:text-zinc-50 prose-headings:text-zinc-50 prose-li:text-zinc-50">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              Run analysis to populate the overview.
            </p>
          )}
        </ChartContainer>
      ) : (
        <ChartContainer
          title="Insights"
          subtitle="Actionable bullets from the latest analysis output."
        >
          {analysis ? (
            <div className="prose prose-invert max-w-none prose-p:text-zinc-50 prose-headings:text-zinc-50 prose-li:text-zinc-50">
              <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
          ) : (
            <p className="text-sm text-zinc-500">
              No insights yet. Run the analyzer first.
            </p>
          )}
        </ChartContainer>
      )}
    </div>
  );
}
