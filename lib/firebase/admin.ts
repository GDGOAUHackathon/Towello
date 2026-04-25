import admin from "firebase-admin";

function ensureAdminApp(): admin.app.App {
  const isDevelopment = process.env.NODE_ENV === "development";

  if (isDevelopment && process.env.USE_FIREBASE_EMULATOR === "true") {
    process.env.FIREBASE_AUTH_EMULATOR_HOST ??= "127.0.0.1:9099";
    process.env.FIRESTORE_EMULATOR_HOST ??= "127.0.0.1:8080";
  }

  if (!admin.apps.length) {
    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_ADMIN_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, "\n");

    if (isDevelopment && process.env.USE_FIREBASE_EMULATOR === "true") {
      admin.initializeApp({ projectId: projectId || "demo-towello" });
    } else if (projectId && clientEmail && privateKey) {
      admin.initializeApp({
        credential: admin.credential.cert({
          projectId,
          clientEmail,
          privateKey,
        }),
      });
    } else if (isDevelopment) {
      // Fallback for dev if no credentials but no emulator (will likely fail on live calls, but prevents crash on boot)
      admin.initializeApp({ projectId: projectId || "demo-towello" });
    } else {
      throw new Error(
        "Firebase Admin credentials are missing (NEXT_PUBLIC_FIREBASE_PROJECT_ID, FIREBASE_ADMIN_CLIENT_EMAIL, FIREBASE_ADMIN_PRIVATE_KEY).",
      );
    }
  }

  return admin.app();
}

export function getAdminAuth(): admin.auth.Auth {
  const app = ensureAdminApp();
  return admin.auth(app);
}

export function getAdminDb(): admin.firestore.Firestore {
  const app = ensureAdminApp();
  return admin.firestore(app);
}
