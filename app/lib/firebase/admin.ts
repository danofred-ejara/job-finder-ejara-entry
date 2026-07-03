import { applicationDefault, initializeApp, getApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

function createApp() {
  try {
    return getApp();
  } catch (err) {
    return initializeApp({
      credential: applicationDefault(),
      projectId: process.env.VITE_FIREBASE_PROJECT_ID,
    });
  }
}

export const app = createApp();

export const firestore = getFirestore(app);

export const auth = getAuth(app);
