import "./App.css";
import React, { useState, useEffect } from "react";

function App() {
  const [budget, setBudget] = useState([]);
  const [title, setTitle] = useState("");
  return (
    <div className="App">
      <header className="App-header">
        <h1>Budget Planner</h1>
      </header>
    </div>
  );
}

export default App;
