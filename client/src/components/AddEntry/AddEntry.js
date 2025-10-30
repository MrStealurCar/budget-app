import React, { useState } from "react";
import "./AddEntry.css";
import { handleCreate } from "../../api/budgetActions";
function AddEntry({
  setEntry,
  savedTotal,
  setSavedTotal,
  user,
  error,
  setError,
}) {
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
      {error && <p className="error-message">{error}</p>}
      {isVisible && (
        <div>
          <div className="input-container">
            <input
              value={title}
              className="entry-input"
              placeholder="Budget name"
              type="text"
              onChange={(e) => {
                setTitle(e.target.value);
                setError(null);
              }}
              required
            />
            <input
              value={budget}
              className="entry-input"
              type="number"
              min={0}
              placeholder="Amount"
              onChange={(e) => {
                setBudget(Number(e.target.value));
                setError(null);
              }}
              required
            />
          </div>
          <div className="button-container">
            <button
              className="entry-action-buttons"
              onClick={() => {
                handleCreate(
                  title,
                  budget,
                  setEntry,
                  setTitle,
                  setBudget,
                  savedTotal,
                  setSavedTotal,
                  setError,
                  user
                );
                setIsVisible(null);
              }}
            >
              Save
            </button>
            <button
              className="entry-action-buttons"
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
