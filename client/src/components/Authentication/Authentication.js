import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, signInWithGoogle, logout } from "../../firebase";
import "./Authentication.css";
const Authentication = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div>
      {user ? (
        <div>
          <p>Welcome, {user.displayName}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <button onClick={signInWithGoogle}>Sign in with Google</button>
      )}
    </div>
  );
};

export default Authentication;
