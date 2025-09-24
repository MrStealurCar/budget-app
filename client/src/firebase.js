// Import Firebase dependencies
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
} from "firebase/auth";
// Firebase configuration object
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "budget-app-5388b.firebaseapp.com",
  projectId: "budget-app-5388b",
  storageBucket: "budget-app-5388b.firebasestorage.app",
  messagingSenderId: "760723205485",
  appId: "1:760723205485:web:4f8a43fa12e8c6d1607e64",
};

// Initialize Firebase
console.log("Firebase Config:", firebaseConfig); // Debugging line
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // User info: result.user
    return result.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// Sign out
export const logout = async () => {
  await signOut(auth);
};
export { auth, app };
