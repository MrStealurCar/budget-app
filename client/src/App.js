import "./App.css";
import React, { useState } from "react";
import BudgetCard from "./components/BudgetCard/BudgetCard";
import AddEntry from "./components/AddEntry/AddEntry";
function App() {
  const [entry, setEntry] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Budget Planner</h1>
      </header>
      <main className="body">
        <div className="budget-container">
          <BudgetCard entry={entry} setEntry={setEntry} />
        </div>
        <div>
          <AddEntry setEntry={setEntry} />
        </div>
      </main>
    </div>
  );
}

export default App;
