import "./App.css";
import React, { useState } from "react";
import BudgetCard from "./components/BudgetCard/BudgetCard";
import AddEntry from "./components/AddEntry/AddEntry";
function App() {
  const [entry, setEntry] = useState([]);
  const [totalBudget, setTotalBudget] = useState("");
  const [savedTotal, setSavedTotal] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <h1>Budget Planner</h1>
        <div className="budget-field">
          <input
            className="new-budget"
            placeholder="Monthly Budget"
            type="number"
            min={0}
            value={totalBudget}
            onChange={(e) => setTotalBudget(e.target.value)}
          />
          <button
            className="save-button"
            onClick={() => {
              setSavedTotal(totalBudget);
              setTotalBudget(0);
            }}
          >
            Save
          </button>
        </div>
        <h3>Your budget is ${Number(savedTotal)}</h3>
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
