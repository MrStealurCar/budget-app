import React, { useState } from "react";
import "./AddEntry.css";
import { handleCreate } from "../../api/budgetActions";
function AddEntry({ setEntry }) {
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
                if (title !== "" && budget !== "") {
                  handleCreate(title, budget, setEntry, setTitle, setBudget);
                  setIsVisible(null);
                } else {
                  alert(
                    "Could not create entry, please ensure both fields are filled out."
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
