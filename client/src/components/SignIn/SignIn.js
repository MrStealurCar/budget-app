import "./SignIn.css";

export default function SignIn({ handleSignIn }) {
  return (
    <div className="sign-in-container">
      <h2 className="sign-in-title">Welcome to Aura Finance</h2>
      <p>Please sign in with Google to continue</p>
      <button onClick={handleSignIn} className="sign-in-button">
        Sign in
      </button>
    </div>
  );
}
