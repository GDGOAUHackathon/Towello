/**
 * PnL (Profit and Loss) Types
 * 
 * Responsibility: Define models for tracking financial performance.
 * Owner: Backend Engineer
 * Implementation: Add time-series data structures for charting and multi-currency support.
 */

export interface PnLSnapshot {
  timestamp: string;
  totalPnL: number;
  unrealizedPnL: number;
  realizedPnL: number;
  roi: number;
}

export interface PnLHistory {
  snapshots: PnLSnapshot[];
  timeframe: '1D' | '1W' | '1M' | '1Y' | 'ALL';
}
