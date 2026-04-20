'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { useAnalysis } from '@/hooks/useAnalysis';

export default function AnalysisPage() {
  const { analysis, error, isLoading, runAnalysis } = useAnalysis();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">AI analysis</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Uses Google Gemini to summarize your current Bayse portfolio. Requires{' '}
          <code className="rounded bg-neutral-100 px-1 py-0.5 text-xs dark:bg-neutral-900">
            GEMINI_API_KEY
          </code>
          .
        </p>
      </div>

      <Button onClick={() => void runAnalysis()} isLoading={isLoading}>
        Run analysis
      </Button>

      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {analysis && (
        <div className="space-y-4 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${
                analysis.riskLevel === 'LOW'
                  ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
                  : analysis.riskLevel === 'HIGH'
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300'
                    : 'bg-amber-100 text-amber-900 dark:bg-amber-900/40 dark:text-amber-200'
              }`}
            >
              Risk: {analysis.riskLevel}
            </span>
            <span className="text-xs text-neutral-500">
              Confidence {(analysis.confidenceScore * 100).toFixed(0)}%
            </span>
            <span className="text-xs text-neutral-400">
              {new Date(analysis.generatedAt).toLocaleString()}
            </span>
          </div>
          <div>
            <h2 className="text-sm font-medium text-neutral-500">Summary</h2>
            <p className="mt-2 whitespace-pre-wrap text-neutral-800 dark:text-neutral-200">
              {analysis.summary}
            </p>
          </div>
          <div>
            <h2 className="text-sm font-medium text-neutral-500">Insights</h2>
            <ul className="mt-2 list-inside list-disc space-y-1 text-neutral-800 dark:text-neutral-200">
              {analysis.insights.map((line, i) => (
                <li key={i}>{line}</li>
              ))}
            </ul>
          </div>
          {analysis.marketOutlook ? (
            <div>
              <h2 className="text-sm font-medium text-neutral-500">Outlook</h2>
              <p className="mt-2 text-neutral-800 dark:text-neutral-200">
                {analysis.marketOutlook}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
