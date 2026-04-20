/**
 * PnL (Profit and Loss) Types
 */

export interface PnLSnapshot {
  timestamp: string;
  totalPnL: number;
  unrealizedPnL: number;
  realizedPnL: number;
  roi: number;
}

export type PnLTimeframe = '1D' | '1W' | '1M' | '1Y' | 'ALL';

export interface PnLBreakdownItem {
  eventId: string;
  eventTitle: string;
  realizedPnl: number;
  currency: string;
  lastActivity: string;
}

export interface PnLHistory {
  snapshots: PnLSnapshot[];
  timeframe: PnLTimeframe;
  /** Aggregates from Bayse when using live API */
  realizedPnl?: number;
  realizedPnlPercent?: number;
  settlementPnl?: number;
  tradePnl?: number;
  wins?: number;
  losses?: number;
  currency?: string;
  breakdown?: PnLBreakdownItem[];
}
