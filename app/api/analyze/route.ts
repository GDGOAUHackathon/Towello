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

    const result = await analysisService.generatePortfolioReport(
      auth.uid, 
      analysisType === 'category' ? 'category' : 'general'
    );

    // STEP 4 & 5 — FIREBASE PERSISTENCE WITH FAIL-SAFE
    try {
      console.log("Attempting Firestore write", {
        userId: auth.uid,
        hasDb: !!adminDb
      });

      await adminDb.collection('users').doc(auth.uid).collection('analyses').add({
        text: result.analysis,
        createdAt: result.generatedAt,
        type: analysisType || 'general'
      });
    } catch (err: any) {
      console.error("Firestore write failed", {
        error: err.message,
        code: err.code,
        details: err.details
      });
      // Do NOT crash the request; return analysis regardless
    }

    return NextResponse.json({
      ...result,
      text: result.analysis // Ensure compatibility with UI expecting 'text'
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
