import React from "react";
import { handleEdit } from "../../api/budgetActions";
import "./EditMode.css";
function EditMode({
  item,
  newTitle,
  newBudget,
  setEntry,
  setNewTitle,
  setNewBudget,
  setEditId,
}) {
  return (
    <div>
      <input
        className="input"
        value={newTitle}
        onChange={(e) => setNewTitle(e.target.value)}
      />

      <input
        className="input"
        value={newBudget}
        onChange={(e) => setNewBudget(Number(e.target.value))}
      />
      <button
        className="save-button"
        onClick={() => {
          handleEdit(item.id, newTitle, newBudget, setEntry);
          setEditId(null);
          setNewTitle("");
          setNewBudget(0);
        }}
      >
        Save
      </button>
    </div>
  );
}

export default EditMode;
