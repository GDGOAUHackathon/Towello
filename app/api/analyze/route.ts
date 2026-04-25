import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseRequest } from '@/lib/auth/verify-request';
import { analysisService } from '@/services/analysis.service';
import { adminDb } from '@/lib/firebase/admin';

export async function POST(req: NextRequest) {
  const auth = await verifyFirebaseRequest(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    let analysisType = 'general';
    try {
      const body = await req.json();
      analysisType = body.analysisType || 'general';
    } catch {
      // Body might be empty, fallback to general
    }

    const validAnalysisType = analysisType === 'category' ? 'category' : 'general';

    // CHECK CACHE: Prevent redundant AI generation and save costs
    const cachedDocs = await adminDb
      .collection('users')
      .doc(auth.uid)
      .collection('analyses')
      .orderBy('createdAt', 'desc')
      .limit(10)
      .get();

    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const recentDoc = cachedDocs.docs.find(d => {
      const data = d.data();
      return data.type === validAnalysisType && data.createdAt >= oneHourAgo;
    });

    if (recentDoc) {
      const cached = recentDoc.data();
      return NextResponse.json({
        analysis: cached.text,
        generatedAt: cached.createdAt,
        cached: true
      });
    }

    const result = await analysisService.generatePortfolioReport(
      auth.uid, 
      validAnalysisType
    );

    // STEP 4 & 5 — FIREBASE PERSISTENCE WITH FAIL-SAFE
    try {
      await adminDb.collection('users').doc(auth.uid).collection('analyses').add({
        text: result.analysis,
        createdAt: result.generatedAt,
        type: analysisType || 'general'
      });
    } catch (err: any) {
      // Do NOT crash the request; return analysis regardless
    }

    return NextResponse.json({
      analysis: result.analysis,
      generatedAt: result.generatedAt
    });
  } catch (error: any) {
    console.error('Analysis error:', error);
    
    // Sanitize user-facing error message
    let userMessage = 'Our AI analysts are currently overwhelmed with requests. Please try again in a few minutes.';
    
    if (error.message?.includes('503') || error.message?.includes('high demand')) {
      userMessage = 'The AI model is currently experiencing high demand. Please wait a moment and try again.';
    } else if (error.message?.includes('API_KEY_INVALID')) {
      userMessage = 'AI configuration error. Please contact support.';
    }

    return NextResponse.json({ 
      error: userMessage 
    }, { status: 500 });
  }
}
