/**
 * Bayse Markets API response shapes (prediction markets).
 * @see https://docs.bayse.markets/api-reference/pm/get-portfolio.md
 */

export interface BayseEventSummary {
  id: string;
  title: string;
  type: string;
  engine: string;
}

export interface BayseMarketSummary {
  id: string;
  title: string;
  event: BayseEventSummary;
}

export interface BayseOutcomeBalance {
  id: string;
  outcome: string;
  outcomeId: string;
  balance: number;
  availableBalance: number;
  averagePrice: number;
  cost: number;
  currentValue: number;
  sellPrice: number;
  payoutIfOutcomeWins: number;
  percentageChange: number;
  currency: string;
  market: BayseMarketSummary;
  createdAt: string;
  updatedAt: string;
}

export interface BaysePortfolioResponse {
  outcomeBalances: BayseOutcomeBalance[];
  portfolioCost: number;
  portfolioCurrentValue: number;
  portfolioPercentageChange: number;
  pagination: {
    page: number;
    size: number;
    lastPage: number;
    totalCount: number;
  };
}

/**
 * @see https://docs.bayse.markets/api-reference/pm/get-pnl.md
 */
export interface BaysePnLBreakdownItem {
  eventId: string;
  eventTitle: string;
  realizedPnl: number;
  currency: string;
  lastActivity: string;
}

export interface BaysePnLResponse {
  realizedPnl: number;
  realizedPnlPercent: number;
  settlementPnl: number;
  tradePnl: number;
  wins: number;
  losses: number;
  currency: string;
  breakdown?: BaysePnLBreakdownItem[];
}
