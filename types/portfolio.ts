/**
 * Portfolio Types
 * 
 * Responsibility: Define the shape of portfolio data.
 * Owner: Frontend + Backend Engineers
 * Implementation: Expand with specific asset classes, historical data, and platform-specific fields.
 */

export interface PortfolioPosition {
  id: string;
  symbol: string;
  assetName: string;
  quantity: number;
  averageEntryPrice: number;
  currentPrice: number;
  totalValue: number;
  marketCap?: number;
  lastUpdated: string;
}

export interface PortfolioSummary {
  totalValue: number;
  dailyChange: number;
  dailyChangePercentage: number;
  positionsCount: number;
}
