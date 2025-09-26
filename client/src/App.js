import "./App.css";
import { FaUser } from "react-icons/fa";

import { useState, useEffect } from "react";
import { signInWithGoogle, logout, auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import BudgetCard from "./components/BudgetCard/BudgetCard";
import AddEntry from "./components/AddEntry/AddEntry";
import { fetchBudget, fetchTotalBudget } from "./api/api";
function App() {
  const [entry, setEntry] = useState([]);
  const [totalBudget, setTotalBudget] = useState("");
  const [savedTotal, setSavedTotal] = useState("");
  const [user, setUser] = useState(null);
  useEffect(() => {
    const getBudget = async () => {
      const data = await fetchBudget();
      setSavedTotal(data);
    };
    getBudget();
  }, [setSavedTotal]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        {user ? (
          <div>
            <p>Hello, {user.displayName}</p>
            <button onClick={logout}>Logout</button>
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
        <h1 className="main-title">Aura Finance</h1>
        <div>
          <div>
            <div className="budget-field">
              <h4>{savedTotal > 0 ? "" : "Enter your total budget"}</h4>
              <input
                className="new-budget"
                placeholder="Total Budget"
                type="number"
                min={0}
                value={totalBudget}
                onChange={(e) => setTotalBudget(e.target.value)}
              />
              <button
                className="save-button"
                onClick={async () => {
                  await fetchTotalBudget(totalBudget);
                  // Allows 0 to be set as a total budget
                  if (totalBudget !== undefined && totalBudget !== null) {
                    setSavedTotal(totalBudget);
                    setTotalBudget("");
                  } else {
                    alert("Amount cannot be a negative number.");
                  }
                }}
              >
                Save
              </button>
            </div>
            <h3>
              {savedTotal > 0 ? `Your budget is $${Number(savedTotal)}` : ""}
            </h3>
          </div>
        </div>
      </header>

      <main className="body">
        <div className="budget-container">
          <BudgetCard
            entry={entry}
            setEntry={setEntry}
            savedTotal={savedTotal}
            setSavedTotal={setSavedTotal}
          />
        </div>
        <div className="entry-container">
          <AddEntry
            setEntry={setEntry}
            savedTotal={savedTotal}
            setSavedTotal={setSavedTotal}
          />
        </div>
      </main>
    </div>
  );
}

export default App;
