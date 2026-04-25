import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseRequest } from '@/lib/auth/verify-request';
import { portfolioService } from '@/services/portfolio.service';
import { BayseApiError } from '@/lib/bayse/errors';
import type { ApiResponse } from '@/types/api';
import type { PortfolioPosition, PortfolioSummary } from '@/types/portfolio';

export async function GET(req: NextRequest) {
  const auth = await verifyFirebaseRequest(req);
  if ('error' in auth) {
    return NextResponse.json(
      { data: null, error: auth.error },
      { status: auth.status }
    );
  }

  try {
    const { searchParams } = req.nextUrl;
    const cur = searchParams.get('currency');
    const currency = cur === 'USD' || cur === 'NGN' ? cur : 'NGN';

    const { positions, summary } = await portfolioService.getUserPortfolio(
      auth.uid,
      currency
    );

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

    return NextResponse.json(body, {
      status: status >= 400 && status < 600 ? status : 500,
    });
  }
}
