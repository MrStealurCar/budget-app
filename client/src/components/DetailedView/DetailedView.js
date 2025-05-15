import React from "react";
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
}) {
  return (
    <div>
      <div className="info-container">
        <span className="entry-info">ID: {item.id},</span>
        <span className="entry-info">Title: {item.title},</span>
        <span className="entry-info">Budget: ${item.budget}</span>
      </div>
      <div className="action-buttons">
        <ActionButtons
          setEditId={setEditId}
          setNewTitle={setNewTitle}
          setNewBudget={setNewBudget}
          item={item}
          entry={entry}
          setEntry={setEntry}
          transferId={transferId}
          setTransferId={setTransferId}
        />
        <button
          className="close-button"
          onClick={() => {
            setViewId(null);
          }}
        >
          Close
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
          />
        )}
      </div>
    </div>
  );
}

export default DetailedView;
