import "./DetailedView.css";
import ActionButtons from "../ActionButtons/ActionButtons";
import EditMode from "../EditMode/EditMode";
import TransferMode from "../TransferMode/TransferMode";

function DetailedView({
  item,
  editId,
  setViewId,
  setEditId,
  newTitle,
  setNewTitle,
  newBudget,
  setNewBudget,
  entry,
  setEntry,
  transferId,
  setTransferId,
  savedTotal,
  setSavedTotal,
  user,
  setError,
}) {
  return (
    <div>
      <div className="action-buttons">
        <ActionButtons
          editId={editId}
          setEditId={setEditId}
          setNewTitle={setNewTitle}
          setNewBudget={setNewBudget}
          item={item}
          entry={entry}
          setEntry={setEntry}
          savedTotal={savedTotal}
          setSavedTotal={setSavedTotal}
          transferId={transferId}
          setTransferId={setTransferId}
          user={user}
        />
        <button
          className="close-button"
          onClick={() => {
            setViewId(null);
            setEditId(null);
            setTransferId(null);
          }}
        >
          ❌
        </button>
      </div>
      {editId === item.id && (
        <EditMode
          item={item}
          newTitle={newTitle}
          newBudget={newBudget}
          setEntry={setEntry}
          setNewTitle={setNewTitle}
          setNewBudget={setNewBudget}
          setEditId={setEditId}
          savedTotal={savedTotal}
          setSavedTotal={setSavedTotal}
          user={user}
          setError={setError}
        />
      )}
      <div>
        {transferId && (
          <TransferMode
            entry={entry}
            setEntry={setEntry}
            sourceId={item.id}
            item={item}
            transferId={transferId}
            setTransferId={setTransferId}
            user={user}
            setError={setError}
          />
        )}
      </div>
    </div>
  );
}

export default DetailedView;
