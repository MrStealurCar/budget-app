import "./App.css";
import React, { useState, useEffect } from "react";
import BudgetCard from "./components/BudgetCard/BudgetCard";
import AddEntry from "./components/AddEntry/AddEntry";
import { fetchBudget, fetchTotalBudget } from "./api/api";

function App() {
  const [entry, setEntry] = useState([]);
  const [totalBudget, setTotalBudget] = useState("");
  const [savedTotal, setSavedTotal] = useState("");

  useEffect(() => {
    const getBudget = async () => {
      const data = await fetchBudget();
      setSavedTotal(data);
    };
    getBudget();
  }, [setSavedTotal]);

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
              if (totalBudget >= 0) {
                fetchTotalBudget(totalBudget);
                setSavedTotal(totalBudget);
                setTotalBudget(0);
              } else {
                alert("Amount cannot be a negative number");
              }
            }}
          >
            Save
          </button>
        </div>
        <h3>{savedTotal > 0 ? `Your budget is $${Number(savedTotal)}` : ""}</h3>
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
