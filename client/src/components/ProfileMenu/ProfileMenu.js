import { useState, useEffect } from "react";
import "./ProfileMenu.css";
import { FaUser } from "react-icons/fa";
import { signInWithGoogle, logout, auth } from "../../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { getInitials } from "../../utils/helpers";
function ProfileMenu() {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div>
      {user ? (
        <div className="profile-icon-container">
          <span className="profile-icon">{getInitials(user.displayName)}</span>
          <span>
            <button onClick={logout}>Logout</button>
          </span>
        </div>
      ) : (
        <div className="sign-in-container">
          <FaUser
            size={24}
            onClick={signInWithGoogle}
            className="sign-in-icon"
            title="Sign in with Google"
          />
        </div>
      )}
    </div>
  );
}

export default ProfileMenu;
