/**
 * PnL API Route
 * 
 * Responsibility: Fetch historical and current Profit and Loss data.
 * Owner: Backend Engineer
 * Flow: Request → auth check → PnL Service → Response
 * Implementation: Fetch and aggregate snapshots for the requested timeframe.
 */

import { NextRequest, NextResponse } from 'next/server';
// import { pnlService } from '@/services/pnl.service';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const timeframe = searchParams.get('timeframe') || '1M';

  try {
    // 1. Authenticate user
    const userId = 'placeholder-user-id';

    return NextResponse.json(
      { data: null, error: 'GET /api/pnl not implemented yet — awaiting developer.' },
      { status: 501 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { data: null, error: error.message || 'Failed to fetch PnL data' },
      { status: 500 }
    );
  }
}

/**
 * Request: GET /api/pnl?timeframe=1M
 * Response: { data: { snapshots: [], timeframe: '1M' }, error: null }
 */
