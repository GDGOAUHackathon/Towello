import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseRequest } from '@/lib/auth/verify-request';
import { analysisService } from '@/services/analysis.service';

export async function POST(req: NextRequest) {
  const auth = await verifyFirebaseRequest(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const { position } = await req.json();
    if (!position) {
      return NextResponse.json({ error: 'Missing position data' }, { status: 400 });
    }

    const analysis = await analysisService.analyzePosition(auth.uid, position);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error('Should-I-Sell error:', error);
    
    let userMessage = 'Failed to analyze position. Please try again.';
    if (error.message?.includes('503') || error.message?.includes('high demand')) {
      userMessage = 'The AI model is currently experiencing high demand. Please try again in a moment.';
    }

    return NextResponse.json({ 
      error: userMessage 
    }, { status: 500 });
  }
}
