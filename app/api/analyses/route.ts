import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseRequest } from '@/lib/auth/verify-request';
import { getAdminDb } from '@/lib/firebase/admin';

export async function GET(req: NextRequest) {
  const auth = await verifyFirebaseRequest(req);
  if ('error' in auth) {
    return NextResponse.json({ error: auth.error }, { status: auth.status });
  }

  try {
    const db = getAdminDb();
    const snapshot = await db
      .collection('users')
      .doc(auth.uid)
      .collection('analyses')
      .orderBy('createdAt', 'desc')
      .limit(5)
      .get();

    const analyses = snapshot.docs.map(doc => ({
      text: doc.data().text,
      createdAt: doc.data().createdAt,
      type: doc.data().type
    }));

    return NextResponse.json(analyses);
  } catch (error: any) {
    console.error('Fetch analyses error:', error);
    return NextResponse.json({ 
      error: error.message || 'Failed to fetch analysis history' 
    }, { status: 500 });
  }
}
