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
  const { analysis, generatedAt, isLoading, error, runAnalysis } = useAnalysis();
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
          value={analysis ? `${analysis.confidence}%` : "—"}
          meta="Model certainty from the latest run"
          icon={Sparkles}
        />
        <StatCard
          label="Generated"
          value={generatedAt ? new Date(generatedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }) : "—"}
          meta={generatedAt ? new Date(generatedAt).toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }) : "Timestamp of the last AI summary"}
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
            <div className="space-y-8 p-2">
              <div className="mb-8 flex flex-wrap items-center gap-4 border-b border-white/5 pb-6">
                <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-wider ${
                  analysis.riskLevel === 'HIGH' ? 'border-red-500/20 bg-red-500/10 text-red-400' :
                  analysis.riskLevel === 'MEDIUM' ? 'border-amber-500/20 bg-amber-500/10 text-amber-400' :
                  'border-emerald-500/20 bg-emerald-950/40 text-emerald-400'
                }`}>
                  Risk: {analysis.riskLevel}
                </span>
                <span className="text-[13px] font-medium text-zinc-500">Confidence {analysis.confidence}%</span>
                {generatedAt && (
                  <span className="text-[13px] font-medium text-zinc-500">
                    {new Date(generatedAt).toLocaleString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' })}
                  </span>
                )}
              </div>
              <div>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">S U M M A R Y</h3>
                <p className="text-[15px] font-medium leading-relaxed text-zinc-50">{analysis.summary}</p>
              </div>
              <div>
                <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">O U T L O O K</h3>
                <p className="text-[15px] font-medium leading-relaxed text-zinc-50">{analysis.outlook}</p>
              </div>
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
            <div className="space-y-3 p-2">
              <h3 className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500">I N S I G H T S</h3>
              <div className="space-y-3">
                {Array.isArray(analysis.insights) ? analysis.insights.map((insight: string, i: number) => (
                  <div key={i} className="flex items-start gap-3 rounded-[16px] border border-white/5 bg-white/[0.02] p-4 shadow-sm">
                    <div className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" />
                    <p className="text-[14px] leading-relaxed text-zinc-50">{insight}</p>
                  </div>
                )) : null}
              </div>
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
