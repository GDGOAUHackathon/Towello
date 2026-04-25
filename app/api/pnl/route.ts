import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseRequest } from '@/lib/auth/verify-request';
import { pnlService } from '@/services/pnl.service';
import { BayseApiError } from '@/lib/bayse/errors';
import type { ApiResponse } from '@/types/api';
import type { PnLHistory } from '@/types/pnl';

export async function GET(req: NextRequest) {
  const auth = await verifyFirebaseRequest(req);
  if ('error' in auth) {
    return NextResponse.json(
      { data: null, error: auth.error },
      { status: auth.status }
    );
  }

  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get('timeframe') ?? '1M';
  const cur = searchParams.get('currency');
  const currency = cur === 'USD' || cur === 'NGN' ? cur : 'NGN';

  try {
    const data = await pnlService.getPnLHistory(auth.uid, timeframe, currency);

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

    return NextResponse.json(body, {
      status: status >= 400 && status < 600 ? status : 500,
    });
  }
}
