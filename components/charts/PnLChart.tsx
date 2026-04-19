'use client';

import React from 'react';
import type { PnLSnapshot } from '@/types/pnl';
import { formatCurrency, formatPercentage } from '@/lib/utils/format';

export const PnLChart: React.FC<{ snapshots: PnLSnapshot[] }> = ({
  snapshots,
}) => {
  if (!snapshots.length) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-xl border border-dashed border-neutral-200 text-sm text-neutral-500 dark:border-neutral-800">
        No PnL snapshots for this period.
      </div>
    );
  }

  const s = snapshots[0];

  return (
    <div className="flex h-48 w-full flex-col justify-center rounded-xl border border-neutral-200 bg-neutral-50/80 px-6 dark:border-neutral-800 dark:bg-neutral-900/40">
      <p className="text-xs font-medium uppercase tracking-wide text-neutral-500">
        Realized PnL (period)
      </p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-neutral-900 dark:text-neutral-100">
        {formatCurrency(s.realizedPnL)}
      </p>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        ROI {formatPercentage(s.roi)} · total {formatCurrency(s.totalPnL)}
      </p>
      <p className="mt-4 text-xs text-neutral-500">
        Bayse returns period aggregates for PnL; intraday time series are not
        exposed on this endpoint.
      </p>
    </div>
  );
};
