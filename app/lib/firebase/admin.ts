import { applicationDefault, initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

export const app = initializeApp({
  credential: applicationDefault(),
  projectId: process.env.VITE_FIREBASE_PROJECT_ID,
});

export const firestore = getFirestore(app);

export const auth = getAuth(app);
