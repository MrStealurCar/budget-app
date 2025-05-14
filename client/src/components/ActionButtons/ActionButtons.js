import React from "react";
import "./ActionButtons.css";
import { handleDelete } from "../../api/budgetActions";
function ActionButtons({
  setEditId,
  setNewTitle,
  setNewBudget,
  item,
  setEntry,
  transferId,
  setTransferId,
}) {
  return (
    <div className="handler-buttons">
      <button
        title="Delete entry"
        onClick={() => {
          handleDelete(item.id, setEntry);
        }}
      >
        ❌ {/* deletes entry */}
      </button>
      <button
        title="Edit entry"
        onClick={() => {
          setEditId(item.id);
          setNewTitle(item.title);
          setNewBudget(item.budget);
        }}
      >
        ✏️ {/* edit entry */}
      </button>

      <button
        title="Transfer funds"
        onClick={() => {
          setTransferId(transferId === item.id ? null : item.id);
        }}
      >
        🔁 {/* transfers funds between entries */}
      </button>
    </div>
  );
}

export default ActionButtons;
