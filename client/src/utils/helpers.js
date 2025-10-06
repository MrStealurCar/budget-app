import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export const getInitials = (name) => {
  if (!name) return "";
  const names = name.split(" ");
  const initials = names.map((name) => name.charAt(0).toUpperCase());
  return initials.slice(0, 2).join("");
};

export const handleSignIn = async (onSuccess) => {
  try {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    onSuccess(result.user);
  } catch (error) {
    console.error("Sign-in error:", error);
  }
};
