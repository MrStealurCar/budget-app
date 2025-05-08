import React, { useState } from "react";
import "./AddEntry.css";
import { handleCreate } from "../../api/budgetActions";
function AddEntry({ setEntry }) {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <button onClick={() => setIsVisible((prevState) => !prevState)}>
        Add Entry
      </button>
      {isVisible && (
        <div>
          <input
            value={title}
            placeholder="Budget name"
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <input
            value={budget}
            type="number"
            min={0}
            onChange={(e) => setBudget(Number(e.target.value))}
            required
          />
          <button onClick={() => handleCreate(title, budget, setEntry)}>
            Save
          </button>
          <button onClick={() => setIsVisible((prevState) => !prevState)}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

export default AddEntry;
