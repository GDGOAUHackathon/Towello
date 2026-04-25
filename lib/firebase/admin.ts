import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

/**
 * Firebase Admin SDK Initialization
 * 
 * Responsibility: Ensure a single, authenticated instance of the Admin SDK.
 * Fixes: UNAUTHENTICATED errors by correctly loading service account credentials.
 */

const projectId = process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
const clientEmail = process.env.FIREBASE_CLIENT_EMAIL || process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
const privateKey = process.env.FIREBASE_PRIVATE_KEY || process.env.FIREBASE_ADMIN_PRIVATE_KEY;

function getAdminApp() {
  const isDevelopment = process.env.NODE_ENV === "development";

  // Emulator Detection
  if (isDevelopment && process.env.FIRESTORE_EMULATOR_HOST) {
    console.log("Using Firestore Emulator: ", process.env.FIRESTORE_EMULATOR_HOST);
  }

  const apps = getApps();
  if (apps.length > 0) {
    return apps[0];
  }

  if (!projectId || !clientEmail || !privateKey) {
    console.error("Missing Firebase Admin environment variables", {
      projectId: !!projectId,
      clientEmail: !!clientEmail,
      privateKey: !!privateKey,
    });
    // In development, we might fallback to default for emulator, but for production/live it MUST fail.
    if (!isDevelopment) {
      throw new Error("Missing Firebase Admin environment variables");
    }
  }

  const formattedPrivateKey = privateKey?.trim().replace(/\\n/g, '\n');

  if (clientEmail && !clientEmail.endsWith(".iam.gserviceaccount.com")) {
    console.warn("FIREBASE_ADMIN_CLIENT_EMAIL does not look like a service account email. It should end with '.iam.gserviceaccount.com'. Found:", clientEmail);
  }

  return initializeApp({
    credential: cert({
      projectId,
      clientEmail,
      privateKey: formattedPrivateKey,
    }),
    projectId,
  });
}

const app = getAdminApp();

export const adminDb = getFirestore(app);
export const adminAuth = getAuth(app);
export { app as adminApp };
