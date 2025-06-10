import React, { useState } from "react";
import "./AddEntry.css";
import { handleCreate } from "../../api/budgetActions";
function AddEntry({ setEntry, savedTotal, setSavedTotal }) {
  const [title, setTitle] = useState("");
  const [budget, setBudget] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div>
      <div className="create-entry">
        <button
          onClick={() => setIsVisible((prevState) => !prevState)}
          className="add-button"
        >
          Add Entry
        </button>
      </div>
      {isVisible && (
        <div>
          <div className="input-container">
            <input
              value={title}
              className="entry-input"
              placeholder="Budget name"
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              value={budget}
              className="entry-input"
              type="number"
              min={0}
              placeholder="Amount"
              onChange={(e) => setBudget(Number(e.target.value))}
              required
            />
          </div>
          <div className="button-container">
            <button
              className="action-buttons"
              onClick={() => {
                if (
                  title !== "" &&
                  budget !== "" &&
                  budget <= savedTotal &&
                  budget >= 1
                ) {
                  handleCreate(
                    title,
                    budget,
                    setEntry,
                    setTitle,
                    setBudget,
                    savedTotal,
                    setSavedTotal
                  );
                  setIsVisible(null);
                } else {
                  alert(
                    "Ensure both fields are filled out, amount is not a negative number, or amount does not exceed total budget."
                  );
                }
              }}
            >
              Save
            </button>
            <button
              className="action-buttons"
              onClick={() => {
                setIsVisible((prevState) => !prevState);
                setTitle("");
                setBudget("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddEntry;
