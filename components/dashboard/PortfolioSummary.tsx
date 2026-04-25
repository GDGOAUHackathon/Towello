'use client';

import React from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { formatCurrency, formatPercentage } from '@/lib/utils/format';
import { useCurrency } from '@/components/providers/CurrencyProvider';

export const PortfolioSummary: React.FC = () => {
  const { summary, isLoading, error } = usePortfolio();
  const { currency } = useCurrency();

  if (isLoading) {
    return (
      <div className="rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950">
        <p className="text-sm text-neutral-500">Loading portfolio…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-sm text-red-800 dark:border-red-900 dark:bg-red-950/40 dark:text-red-200">
        {error}
      </div>
    );
  }

  if (!summary) {
    return null;
  }

  const gain = summary.dailyChange >= 0;

  return (
    <div className="grid gap-4 rounded-xl border border-neutral-200 bg-white p-6 dark:border-neutral-800 dark:bg-neutral-950 sm:grid-cols-3">
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Total value
        </p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">
          {formatCurrency(summary.totalValue, currency)}
        </p>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          vs cost basis
        </p>
        <p
          className={`mt-1 text-2xl font-semibold tabular-nums ${
            gain ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400'
          }`}
        >
          {formatCurrency(summary.dailyChange, currency)} ({formatPercentage(summary.dailyChangePercentage)})
        </p>
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
          Positions
        </p>
        <p className="mt-1 text-2xl font-semibold tabular-nums">
          {summary.positionsCount}
        </p>
      </div>
    </div>
  );
};
