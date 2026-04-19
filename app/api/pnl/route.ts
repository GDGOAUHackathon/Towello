import { NextRequest, NextResponse } from 'next/server';
import { pnlService } from '@/services/pnl.service';
import { BayseApiError } from '@/lib/bayse/errors';
import type { ApiResponse } from '@/types/api';
import type { PnLHistory } from '@/types/pnl';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get('timeframe') ?? '1M';

  try {
    const userId = 'mvp-user';
    const data = await pnlService.getPnLHistory(userId, timeframe);

    const body: ApiResponse<PnLHistory> = {
      data,
      error: null,
    };

    return NextResponse.json(body);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to fetch PnL data';
    const status = error instanceof BayseApiError ? error.status : 500;

    const body: ApiResponse<null> = {
      data: null,
      error: message,
    };

    return NextResponse.json(body, { status: status >= 400 && status < 600 ? status : 500 });
  }
}
