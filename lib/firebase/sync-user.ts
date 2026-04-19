import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import type { User } from 'firebase/auth';
import { getFirebaseDb } from '@/lib/firebase/client';

/**
 * Upsert a minimal user profile for Firestore-backed features.
 */
export async function syncUserToFirestore(user: User): Promise<void> {
  const db = getFirebaseDb();
  if (!db) return;

  try {
    await setDoc(
      doc(db, 'users', user.uid),
      {
        email: user.email ?? null,
        displayName: user.displayName ?? null,
        photoURL: user.photoURL ?? null,
        updatedAt: serverTimestamp(),
      },
      { merge: true }
    );
  } catch {
    /* Firestore may be disabled in console during early setup */
  }
}
