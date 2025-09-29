import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

console.log("API KEY PRESENT?", import.meta.env.VITE_FIREBASE_API_KEY);
console.log("AUTH DOMAIN PRESENT?", import.meta.env.VITE_FIREBASE_AUTH_DOMAIN);
console.log(
  "FIREBASE_SERVICE_ACCOUNT_PETA_KVIZ PRESENT?",
  import.meta.env.VITE_FIREBASE_SERVICE_ACCOUNT_PETA_KVIZ
);

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export default app;
