export const firebaseConfig = {
  apiKey: String(process.env.VITE_FIREBASE_API_KEY),
  authDomain: String(process.env.VITE_FIREBASE_AUTH_DOMAIN),
  projectId: String(process.env.VITE_FIREBASE_PROJECT_ID),
  storageBucket: String(process.env.VITE_FIREBASE_STORAGE_BUCKET),
  messagingSenderId: String(process.env.VITE_FIREBASE_MESSAGING_SENDER_ID),
  appId: String(process.env.VITE_FIREBASE_APP_ID),
  measurementId: String(process.env.VITE_FIREBASE_MEASUREMENT_ID),
};
