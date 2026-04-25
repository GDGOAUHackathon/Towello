import type { NextRequest } from 'next/server';
import { adminAuth } from '@/lib/firebase/admin';

export type AuthResult =
  | { uid: string }
  | { error: string; status: number };

/**
 * Verifies `Authorization: Bearer <Firebase ID token>` and returns the user uid.
 */
export async function verifyFirebaseRequest(req: NextRequest): Promise<AuthResult> {
  const header = req.headers.get('authorization');
  if (!header?.startsWith('Bearer ')) {
    return { error: 'Sign in required', status: 401 };
  }

  const token = header.slice(7).trim();
  if (!token) {
    return { error: 'Sign in required', status: 401 };
  }

  try {
    const decoded = await adminAuth.verifyIdToken(token);
    return { uid: decoded.uid };
  } catch {
    return { error: 'Invalid or expired session', status: 401 };
  }
}
