'use client';

import React, { useState } from 'react';
import { PnLChart } from '@/components/charts/PnLChart';
import { usePnL } from '@/hooks/usePnL';
import type { PnLTimeframe } from '@/types/pnl';
import { formatCurrency } from '@/lib/utils/format';

const TIMEFRAMES: PnLTimeframe[] = ['1D', '1W', '1M', '1Y', 'ALL'];

export default function PnLPage() {
  const [tf, setTf] = useState<PnLTimeframe>('1M');
  const { pnl, isLoading, error } = usePnL(tf);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">PnL</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Realized profit and loss from Bayse for the selected window.
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {TIMEFRAMES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTf(t)}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition ${
              tf === t
                ? 'bg-neutral-900 text-white dark:bg-neutral-100 dark:text-neutral-900'
                : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:bg-neutral-800'
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {isLoading && (
        <p className="text-sm text-neutral-500">Loading PnL…</p>
      )}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {pnl && (
        <div className="space-y-4">
          <PnLChart snapshots={pnl.snapshots} />
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <p className="text-xs text-neutral-500">Settlement PnL</p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {pnl.settlementPnl !== undefined
                  ? formatCurrency(pnl.settlementPnl)
                  : '—'}
              </p>
            </div>
            <div className="rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-neutral-950">
              <p className="text-xs text-neutral-500">Trade PnL</p>
              <p className="mt-1 text-lg font-semibold tabular-nums">
                {pnl.tradePnl !== undefined
                  ? formatCurrency(pnl.tradePnl)
                  : '—'}
              </p>
            </div>
          </div>
          {pnl.breakdown && pnl.breakdown.length > 0 && (
            <div>
              <h2 className="mb-2 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                Top events
              </h2>
              <ul className="space-y-2 text-sm">
                {pnl.breakdown.slice(0, 10).map((row) => (
                  <li
                    key={row.eventId}
                    className="flex justify-between gap-4 rounded-lg border border-neutral-100 px-3 py-2 dark:border-neutral-800"
                  >
                    <span className="text-neutral-800 dark:text-neutral-200">
                      {row.eventTitle}
                    </span>
                    <span
                      className={`shrink-0 tabular-nums ${
                        row.realizedPnl >= 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-red-600 dark:text-red-400'
                      }`}
                    >
                      {formatCurrency(row.realizedPnl)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
