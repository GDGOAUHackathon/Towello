/**
 * Portfolio API Route
 *
 * Responsibility: Entry point for portfolio data fetching.
 * Owner: Backend Engineer
 * Flow: Request → auth check → Portfolio Service → Response
 * Implementation: Verify session/token, call portfolioService.getUserPortfolio, and return JSON.
 */

import { NextRequest, NextResponse } from "next/server";
// import { portfolioService } from '@/services/portfolio.service';

export async function GET(req: NextRequest) {
  try {
    // 1. Authenticate user
    const userId = "placeholder-user-id";

    // 2. Fetch data via service
    // const data = await portfolioService.getUserPortfolio(userId);

    return NextResponse.json(
      {
        data: null,
        error: "GET /api/portfolio not implemented yet — awaiting developer.",
      },
      { status: 501 },
    );
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Failed to fetch portfolio";
    return NextResponse.json({ data: null, error: message }, { status: 500 });
  }
}

/**
 * Request: GET /api/portfolio
 * Response: { data: { positions: [], summary: {} }, error: null }
 */
