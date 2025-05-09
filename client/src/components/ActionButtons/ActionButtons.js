import React from "react";
import "./ActionButtons.css";
import { handleDelete, handleTransfer } from "../../api/budgetActions";
function ActionButtons({
  setEditId,
  setNewTitle,
  setNewBudget,
  item,
  setEntry,
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

      <button title="Transfer funds">
        🔁 {/* transfers funds between entries */}
      </button>
    </div>
  );
}

export default ActionButtons;
