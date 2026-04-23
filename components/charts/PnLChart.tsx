"use client";

import React from "react";
import type { PnLSnapshot } from "@/types/pnl";
import { formatCurrency, formatPercentage } from "@/lib/utils/format";

export const PnLChart: React.FC<{ snapshots: PnLSnapshot[] }> = ({
  snapshots,
}) => {
  if (!snapshots.length) {
    return (
      <div className="flex h-48 w-full items-center justify-center rounded-xl border border-dashed border-white/20 text-sm text-zinc-500">
        No PnL snapshots for this period.
      </div>
    );
  }

  const s = snapshots[0];

  return (
    <div className="flex h-48 w-full flex-col justify-center rounded-xl border border-white/10 bg-emerald-500/5 px-6">
      <p className="text-xs font-medium uppercase tracking-wide text-emerald-400">
        Realized PnL (period)
      </p>
      <p className="mt-2 text-3xl font-semibold tabular-nums text-zinc-50">
        {formatCurrency(s.realizedPnL)}
      </p>
      <p className="mt-1 text-sm text-zinc-400">
        ROI {formatPercentage(s.roi)} · total {formatCurrency(s.totalPnL)}
      </p>
      <p className="mt-4 text-xs text-zinc-500">
        Bayse returns period aggregates for PnL; intraday time series are not
        exposed on this endpoint.
      </p>
    </div>
  );
};
