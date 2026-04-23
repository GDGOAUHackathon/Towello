"use client";

import { useState } from "react";
import { BrainCircuit, ChevronRight, Sparkles } from "lucide-react";
import { ChartContainer } from "@/components/dashboard/ChartContainer";
import { StatCard } from "@/components/dashboard/StatCard";
import { TabSwitcher } from "@/components/dashboard/TabSwitcher";
import { useAnalysis } from "@/hooks/useAnalysis";
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

  const headline = analysis?.summary
    ? analysis.summary.slice(0, 160)
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
          value={
            analysis ? `${(analysis.confidenceScore * 100).toFixed(0)}%` : "—"
          }
          meta="Model certainty from the latest run"
          icon={Sparkles}
        />
        <StatCard
          label="Generated"
          value={analysis ? formatDate(analysis.generatedAt) : "—"}
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
          onClick={() => void runAnalysis()}
          className="inline-flex items-center gap-2 rounded-2xl border border-[#F0C040]/25 bg-[linear-gradient(180deg,rgba(240,192,64,0.16),rgba(240,192,64,0.06))] px-4 py-2.5 text-sm font-medium text-[#F0F0F0] transition hover:border-[#F0C040]/45 hover:text-[#F0C040]"
        >
          <Sparkles className="h-4 w-4" />
          Refresh analysis
        </button>
      </div>

      {error ? (
        <div className="rounded-3xl border border-[#2A2A2A] bg-[#1A1A1A] p-6 text-sm text-[#F87171]">
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
            <p className="whitespace-pre-wrap text-sm leading-7 text-[#F0F0F0]">
              {headline}
            </p>
          ) : (
            <p className="text-sm text-[#888888]">
              Run analysis to populate the overview.
            </p>
          )}
        </ChartContainer>
      ) : (
        <ChartContainer
          title="Insights"
          subtitle="Actionable bullets from the latest analysis output."
        >
          {analysis?.insights?.length ? (
            <ul className="space-y-3">
              {analysis.insights.map((item, index) => (
                <li
                  key={`${item}-${index}`}
                  className="rounded-2xl border border-white/5 bg-[#111111] px-4 py-3 text-sm text-[#F0F0F0]"
                >
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[#888888]">
              No insights yet. Run the analyzer first.
            </p>
          )}
        </ChartContainer>
      )}
    </div>
  );
}
