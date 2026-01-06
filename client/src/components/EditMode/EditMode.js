import { handleEdit } from "../../api/budgetActions";
import "./EditMode.css";
import { FaSpinner } from "react-icons/fa";
import { useState } from "react";
function EditMode({
  item,
  newTitle,
  newBudget,
  setEntry,
  setNewTitle,
  setNewBudget,
  setEditId,
  savedTotal,
  setSavedTotal,
  user,
  setError,
}) {
  const [isSaving, setIsSaving] = useState(false);
  return (
    <div className="edit-container">
      <input
        className="input"
        value={newTitle}
        onChange={(e) => {
          setNewTitle(e.target.value);
          setError(null);
        }}
      />

      <input
        className="input"
        value={newBudget}
        onChange={(e) => {
          setNewBudget(Number(e.target.value));
          setError(null);
        }}
      />
      <button
        className="save-button"
        onClick={async () => {
          setIsSaving(true);
          try {
            await handleEdit(
              item.id,
              item.budget,
              newTitle,
              newBudget,
              setEntry,
              savedTotal,
              setSavedTotal,
              user,
              setError
            );
          } finally {
            setIsSaving(false);
            setEditId(null);
            setNewTitle("");
            setNewBudget(0);
          }
        }}
        disabled={isSaving}
      >
        {isSaving ? <FaSpinner className="loading-spinner" /> : "Save"}
      </button>
    </div>
  );
}

export default EditMode;
