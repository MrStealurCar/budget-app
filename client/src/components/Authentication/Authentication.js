import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logout } from "../../firebase";

const Authentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
};
