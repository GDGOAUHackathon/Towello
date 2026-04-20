import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseRequest } from '@/lib/auth/verify-request';
import { analysisService } from '@/services/analysis.service';
import { BayseApiError } from '@/lib/bayse/errors';
import type { ApiResponse } from '@/types/api';
import type { AIAnalysisResult } from '@/types/analysis';

export async function POST(req: NextRequest) {
  const auth = await verifyFirebaseRequest(req);
  if ('error' in auth) {
    return NextResponse.json(
      { data: null, error: auth.error },
      { status: auth.status }
    );
  }

  try {
    const report = await analysisService.generatePortfolioReport(auth.uid);

    const body: ApiResponse<AIAnalysisResult> = {
      data: report,
      error: null,
    };

    return NextResponse.json(body);
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : 'Failed to generate analysis';
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
