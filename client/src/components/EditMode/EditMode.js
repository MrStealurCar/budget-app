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
  savedTotal,
  setSavedTotal,
  user,
}) {
  return (
    <div className="edit-container">
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
          handleEdit(
            item.id,
            item.budget,
            newTitle,
            newBudget,
            setEntry,
            savedTotal,
            setSavedTotal,
            user
          );
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
