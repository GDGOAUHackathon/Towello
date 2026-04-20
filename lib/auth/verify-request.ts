import type { NextRequest } from 'next/server';
import { getAdminAuth } from '@/lib/firebase/admin';

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

  let auth: ReturnType<typeof getAdminAuth>;
  try {
    auth = getAdminAuth();
  } catch {
    return {
      error:
        'Firebase Admin is not configured on the server (check FIREBASE_ADMIN_* env).',
      status: 503,
    };
  }

  try {
    const decoded = await auth.verifyIdToken(token);
    return { uid: decoded.uid };
  } catch {
    return { error: 'Invalid or expired session', status: 401 };
  }
}
