import { initializeApp } from 'firebase/app';
import { getAuth, useAuthEmulator } from 'firebase/auth';
import { getFirestore, useFirestoreEmulator } from 'firebase/firestore';

let config: any = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID
};

export const firebaseApp = initializeApp(config);
export let analytics: any = undefined;
export let perf: any = undefined;

if (import.meta.env.VITE_ENABLE_GOOGLE_ANALYTICS) {
  import('firebase/analytics').then(({ getAnalytics }) => analytics = getAnalytics(firebaseApp));
}

if (import.meta.env.VITE_ENABLE_PERF_MONITORING) {
  import('firebase/performance').then(({ getPerformance }) => perf = getPerformance(firebaseApp));
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

if (import.meta.env.DEV) {
  useFirestoreEmulator(db, 'localhost', 8080);
  useAuthEmulator(auth, 'http://localhost:9099');
}