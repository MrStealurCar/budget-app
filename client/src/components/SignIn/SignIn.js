import "./SignIn.css";

export default function SignIn({ handleSignIn }) {
  return (
    <div>
      <button onClick={handleSignIn} className="sign-in-button">
        Sign in with Google
      </button>
    </div>
  );
}
