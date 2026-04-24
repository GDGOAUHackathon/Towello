"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { connectAuthEmulator, getAuth, type Auth } from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
  type Firestore,
} from "firebase/firestore";
import { CONFIG, isFirebaseWebConfigured } from "@/constants/config";

const firebaseConfig = {
  apiKey: CONFIG.FIREBASE.API_KEY,
  authDomain: CONFIG.FIREBASE.AUTH_DOMAIN,
  projectId: CONFIG.FIREBASE.PROJECT_ID,
  storageBucket: CONFIG.FIREBASE.STORAGE_BUCKET,
  messagingSenderId: CONFIG.FIREBASE.MESSAGING_SENDER_ID,
  appId: CONFIG.FIREBASE.APP_ID,
};

let app: FirebaseApp | undefined;
let auth: Auth | undefined;
let db: Firestore | undefined;
let authEmulatorConnected = false;
let firestoreEmulatorConnected = false;

const isDevelopment = process.env.NODE_ENV === "development";
const emulatorHost =
  process.env.NEXT_PUBLIC_FIREBASE_EMULATOR_HOST ?? "127.0.0.1";
const authEmulatorPort = Number(
  process.env.NEXT_PUBLIC_FIREBASE_AUTH_EMULATOR_PORT ?? 9099,
);
const firestoreEmulatorPort = Number(
  process.env.NEXT_PUBLIC_FIRESTORE_EMULATOR_PORT ?? 8080,
);

function getApp(): FirebaseApp | null {
  if (!isFirebaseWebConfigured()) {
    return null;
  }
  if (!app) {
    app = getApps().length ? getApps()[0]! : initializeApp(firebaseConfig);
  }
  return app;
}

export function getFirebaseAuth(): Auth | null {
  const a = getApp();
  if (!a) return null;
  if (!auth) {
    auth = getAuth(a);
    if (isDevelopment && !authEmulatorConnected) {
      connectAuthEmulator(auth, `http://${emulatorHost}:${authEmulatorPort}`, {
        disableWarnings: true,
      });
      authEmulatorConnected = true;
    }
  }
  return auth;
}

export function getFirebaseDb(): Firestore | null {
  const a = getApp();
  if (!a) return null;
  if (!db) {
    db = getFirestore(a);
    if (isDevelopment && !firestoreEmulatorConnected) {
      connectFirestoreEmulator(db, emulatorHost, firestoreEmulatorPort);
      firestoreEmulatorConnected = true;
    }
  }
  return db;
}
