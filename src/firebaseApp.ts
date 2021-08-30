import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

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
  import('firebase/analytics').then(({ getAnalytics, logEvent }) => {
    analytics = {
      analyticsInstance: getAnalytics(firebaseApp),
      logEvent
    };
  });
}

if (import.meta.env.VITE_ENABLE_PERF_MONITORING) {
  import('firebase/performance').then(({ getPerformance, trace }) => {
    perf = {
      perfInstance: getPerformance(firebaseApp),
      trace
    };
  });
}

export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

if (import.meta.env.DEV) {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectAuthEmulator(auth, 'http://localhost:9099');
}