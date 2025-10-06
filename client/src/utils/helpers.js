import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../firebase";

export const getRandomWelcomeMessage = () => {
  const welcomeMessages = [
    "Hello there,",
    "Good to see you,",
    "Hi! Let's manage your budget,",
    "Welcome! Let's get started,",
  ];

  const randomMsg = Math.floor(Math.random() * welcomeMessages.length);
  return welcomeMessages[randomMsg];
};

export const getFirstName = (name) => {
  return name.split(" ")[0];
};

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
