import "./App.css";
import React, { useState } from "react";
import BudgetCard from "./components/BudgetCard/BudgetCard";
function App() {
  const [entry, setEntry] = useState([]);
  const [title, setTitle] = useState("");

  return (
    <div className="App">
      <header className="App-header">
        <h1>Budget Planner</h1>
      </header>
      <main>
        <BudgetCard entry={entry} setEntry={setEntry} />
      </main>
    </div>
  );
}

export default App;
