import "./ActionButtons.css";
import { handleDelete } from "../../api/budgetActions";
import { useState } from "react";
import { FaSpinner } from "react-icons/fa";
function ActionButtons({
  editId,
  setEditId,
  setNewTitle,
  setNewBudget,
  item,
  setEntry,
  transferId,
  setSavedTotal,
  setTransferId,
  user,
}) {
  const [isDeleting, setIsDeleting] = useState(false);
  return (
    <div className="handler-buttons">
      <button
        className="action-button"
        style={{ color: "red" }}
        title="Delete entry"
        onClick={async () => {
          setIsDeleting(true);
          try {
            await handleDelete(item.id, setEntry, setSavedTotal, user);
          } finally {
            setIsDeleting(false);
          }
        }}
        disabled={isDeleting}
      >
        {isDeleting ? <FaSpinner className="loading-spinner" /> : "Delete"}
      </button>
      <button
        className="action-button"
        style={{ color: "blue" }}
        title="Edit entry"
        onClick={() => {
          setEditId(editId === item.id ? null : item.id); // Toggle edit mode
          setNewTitle(item.title);
          setNewBudget(item.budget);
          setTransferId(null);
        }}
      >
        Edit
      </button>

      <button
        className="action-button"
        style={{ color: "green" }}
        title="Transfer funds"
        onClick={() => {
          setTransferId(transferId === item.id ? null : item.id); // Toggle transfer mode
          setEditId(null);
        }}
      >
        Transfer
      </button>
    </div>
  );
}

export default ActionButtons;
