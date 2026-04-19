/**
 * PnL Chart Component
 *
 * Responsibility: Visualize PnL history.
 * Owner: Frontend Engineer
 * Implementation: Use a library like Recharts or Chart.js to render a line chart of PnL snapshots.
 */

import React from "react";
// import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';

type PnLPoint = {
  timestamp: string;
  value: number;
};

export const PnLChart: React.FC<{ data: PnLPoint[] }> = ({ data }) => {
  return (
    <div className="w-full h-64 border-2 border-dashed border-gray-200 flex items-center justify-center">
      <span className="text-gray-400">
        CHART NOT BUILT YET — Awaiting Developer
      </span>
    </div>
  );
};
