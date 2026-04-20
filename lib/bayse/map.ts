import type { PortfolioPosition, PortfolioSummary } from '@/types/portfolio';
import type { BayseOutcomeBalance, BaysePortfolioResponse } from './types';

function positionSymbol(row: BayseOutcomeBalance): string {
  const base = row.market?.title ?? 'market';
  const short = base.length > 32 ? `${base.slice(0, 29)}…` : base;
  return `${short} · ${row.outcome}`;
}

export function mapOutcomeToPosition(row: BayseOutcomeBalance): PortfolioPosition {
  return {
    id: row.id,
    symbol: positionSymbol(row),
    assetName: row.market?.title ?? 'Unknown market',
    quantity: row.balance,
    averageEntryPrice: row.averagePrice,
    currentPrice: row.sellPrice,
    totalValue: row.currentValue,
    lastUpdated: row.updatedAt ?? row.createdAt,
  };
}

export function mapBaysePortfolioToApp(data: BaysePortfolioResponse): {
  positions: PortfolioPosition[];
  summary: PortfolioSummary;
} {
  const positions = (data.outcomeBalances ?? []).map(mapOutcomeToPosition);
  const totalChange =
    data.portfolioCurrentValue - data.portfolioCost;

  return {
    positions,
    summary: {
      totalValue: data.portfolioCurrentValue,
      dailyChange: totalChange,
      dailyChangePercentage: data.portfolioPercentageChange,
      positionsCount: positions.length,
    },
  };
}
