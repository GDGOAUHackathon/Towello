import { getBayseClient } from '@/lib/bayse/client';
import { mapBaysePortfolioToApp } from '@/lib/bayse/map';
import type { PortfolioPosition, PortfolioSummary } from '@/types/portfolio';

export interface UserPortfolioResult {
  positions: PortfolioPosition[];
  summary: PortfolioSummary;
}

export class PortfolioService {
  /**
   * Loads the portfolio for the Bayse account tied to BAYSE_PUBLIC_KEY.
   * (Per-user keys can be added later via auth.)
   */
  async getUserPortfolio(userId: string): Promise<UserPortfolioResult> {
    void userId;
    const raw = await getBayseClient().getPortfolio({ currency: 'NGN' });
    return mapBaysePortfolioToApp(raw);
  }
}

export const portfolioService = new PortfolioService();
