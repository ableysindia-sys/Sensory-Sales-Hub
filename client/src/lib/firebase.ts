import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCEHBFDXwDbIiTH0fD6R8hKjiqy4tFl-QY",
  authDomain: "rehab-ba713.firebaseapp.com",
  projectId: "rehab-ba713",
  storageBucket: "rehab-ba713.firebasestorage.app",
  messagingSenderId: "14501867217",
  appId: "1:14501867217:web:5f8ce6bd1cff3213c2dff0",
  measurementId: "G-R91DEH482X",
};

const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
export const auth = getAuth(app);
