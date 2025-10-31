import "./App.css";
import { useState, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import BudgetCard from "./components/BudgetCard/BudgetCard";
import AddEntry from "./components/AddEntry/AddEntry";
import ProfileMenu from "./components/ProfileMenu/ProfileMenu";
import SignIn from "./components/SignIn/SignIn";
import { handleSetBudget } from "./api/budgetActions";
import { getWelcomeMessage, getFirstName } from "./utils/helpers";
import { fetchBudget } from "./api/api";

function App() {
  const [entry, setEntry] = useState([]);
  const [totalBudget, setTotalBudget] = useState("");
  const [savedTotal, setSavedTotal] = useState("");
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getBudget = async () => {
      if (!user) return;
      const data = await fetchBudget(user);
      setSavedTotal(data);
    };
    getBudget();
  }, [user, setSavedTotal]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);
  return (
    <div className="App">
      {user ? (
        <>
          <header className="App-header">
            <ProfileMenu user={user} />
            <h1 className="main-title">Aura Finance</h1>
            <h3>
              {getWelcomeMessage()} {getFirstName(user.displayName)}.
            </h3>
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
                    onChange={(e) => {
                      setTotalBudget(e.target.value);
                      if (error) setError("");
                    }}
                  />
                  <button
                    className="save-button"
                    onClick={async () => {
                      await handleSetBudget(
                        totalBudget,
                        setSavedTotal,
                        setTotalBudget,
                        setError,
                        user
                      );
                    }}
                  >
                    Save
                  </button>
                </div>
                <h3>
                  {savedTotal > 0
                    ? `Your budget is $${Number(savedTotal)}`
                    : ""}
                </h3>
              </div>
              {error && <p className="error-message">{error}</p>}
            </div>
          </header>

          <main className="body">
            <div className="budget-container">
              <BudgetCard
                entry={entry}
                setEntry={setEntry}
                savedTotal={savedTotal}
                setSavedTotal={setSavedTotal}
                user={user}
                setError={setError}
              />
            </div>
            <div className="entry-container">
              <AddEntry
                setEntry={setEntry}
                savedTotal={savedTotal}
                setSavedTotal={setSavedTotal}
                user={user}
                setError={setError}
              />
            </div>
          </main>
        </>
      ) : (
        <SignIn />
      )}
    </div>
  );
}

export default App;
