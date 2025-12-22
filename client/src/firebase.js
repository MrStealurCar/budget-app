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
  apiKey: "AIzaSyD8AIQeZ1KN6ORHG6SY8Ffra5EUXdP0r0o", // Firebase API keys are public identifiers. Access is enforced via Firebase security rules and authentication.
  authDomain: "budget-app-5388b.firebaseapp.com",
  projectId: "budget-app-5388b",
  storageBucket: "budget-app-5388b.firebasestorage.app",
  messagingSenderId: "760723205485",
  appId: "1:760723205485:web:4f8a43fa12e8c6d1607e64",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    // We need to get the user's information from the sign in result
    return result.user;
  } catch (error) {
    console.error(`Error signing in with Google: ${error}`);
    throw error;
  }
};

// Sign out
export const logout = async () => {
  await signOut(auth);
};
export { auth, app };
