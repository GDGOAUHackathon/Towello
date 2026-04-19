import { NextResponse } from 'next/server';
import { portfolioService } from '@/services/portfolio.service';
import { BayseApiError } from '@/lib/bayse/errors';
import type { ApiResponse } from '@/types/api';
import type { PortfolioPosition, PortfolioSummary } from '@/types/portfolio';

export async function GET() {
  try {
    const userId = 'mvp-user';
    const { positions, summary } =
      await portfolioService.getUserPortfolio(userId);

    const body: ApiResponse<{
      positions: PortfolioPosition[];
      summary: PortfolioSummary;
    }> = {
      data: { positions, summary },
      error: null,
    };

    return NextResponse.json(body);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch portfolio';
    const status = error instanceof BayseApiError ? error.status : 500;

    const body: ApiResponse<null> = {
      data: null,
      error: message,
    };

    return NextResponse.json(body, { status: status >= 400 && status < 600 ? status : 500 });
  }
}
