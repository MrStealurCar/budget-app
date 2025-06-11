import React from "react";
import "./ActionButtons.css";
import { handleDelete } from "../../api/budgetActions";
function ActionButtons({
  editId,
  setEditId,
  setNewTitle,
  setNewBudget,
  item,
  setEntry,
  transferId,
  savedTotal,
  setSavedTotal,
  setTransferId,
}) {
  return (
    <div className="handler-buttons">
      <button
        className="action-button"
        style={{ color: "red" }}
        title="Delete entry"
        onClick={() => {
          handleDelete(
            item.id,
            setEntry,
            savedTotal,
            setSavedTotal,
            item.budget
          );
        }}
      >
        Delete {/* deletes entry */}
      </button>
      <button
        className="action-button"
        style={{ color: "blue" }}
        title="Edit entry"
        onClick={() => {
          setEditId(editId === item.id ? null : item.id);
          setNewTitle(item.title);
          setNewBudget(item.budget);
          setTransferId(null);
        }}
      >
        Edit {/* edit entry */}
      </button>

      <button
        className="action-button"
        style={{ color: "green" }}
        title="Transfer funds"
        onClick={() => {
          setTransferId(transferId === item.id ? null : item.id);
          setEditId(null);
        }}
      >
        Transfer {/* transfers funds between entries */}
      </button>
    </div>
  );
}

export default ActionButtons;
