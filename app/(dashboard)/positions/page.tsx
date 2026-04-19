'use client';

import React from 'react';
import { usePortfolio } from '@/hooks/usePortfolio';
import { formatCurrency, formatDate } from '@/lib/utils/format';

export default function PositionsPage() {
  const { portfolio, isLoading, error } = usePortfolio();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Positions</h1>
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          Open outcome positions from your Bayse portfolio.
        </p>
      </div>

      {isLoading && (
        <p className="text-sm text-neutral-500">Loading positions…</p>
      )}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      {portfolio && portfolio.length === 0 && !isLoading && !error && (
        <p className="text-sm text-neutral-500">No open positions.</p>
      )}

      {portfolio && portfolio.length > 0 && (
        <div className="overflow-x-auto rounded-xl border border-neutral-200 dark:border-neutral-800">
          <table className="min-w-full text-left text-sm">
            <thead className="border-b border-neutral-200 bg-neutral-50 text-xs uppercase text-neutral-500 dark:border-neutral-800 dark:bg-neutral-900/50">
              <tr>
                <th className="px-4 py-3">Market</th>
                <th className="px-4 py-3">Side</th>
                <th className="px-4 py-3 text-right">Qty</th>
                <th className="px-4 py-3 text-right">Value</th>
                <th className="px-4 py-3 text-right">Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
              {portfolio.map((p) => (
                <tr key={p.id} className="bg-white dark:bg-neutral-950">
                  <td className="max-w-xs px-4 py-3 font-medium">{p.assetName}</td>
                  <td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">
                    {p.symbol.includes('·') ? p.symbol.split('·').pop()?.trim() : '—'}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {p.quantity.toLocaleString('en-US', { maximumFractionDigits: 4 })}
                  </td>
                  <td className="px-4 py-3 text-right tabular-nums">
                    {formatCurrency(p.totalValue)}
                  </td>
                  <td className="px-4 py-3 text-right text-neutral-500">
                    {formatDate(p.lastUpdated)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
