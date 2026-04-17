/**
 * Bayse API Specific Types
 * 
 * Responsibility: Define the raw data structures returned by the Bayse Markets API.
 * Owner: Backend Engineer
 * Implementation: Map the official API documentation fields here.
 */

export interface BayseRawPosition {
  symbol: string;
  amount: string;
  avg_price: number;
  market_price: number;
  timestamp: string;
}

export interface BayseMarketInfo {
  ticker: string;
  name: string;
  price: number;
  volume_24h: number;
}
