import React from "react";
import "./DetailedView.css";
import ActionButtons from "../ActionButtons/ActionButtons";
function DetailedView({
  item,
  setViewId,
  setEditId,
  setNewTitle,
  setNewBudget,
  setEntry,
}) {
  return (
    <div>
      <span className="entry-details">
        <span>ID: {item.id},</span>
        <span>Title: {item.title},</span>
        <span>Budget: ${item.budget}</span>
      </span>
      <div className="action-buttons">
        <ActionButtons
          setEditId={setEditId}
          setNewTitle={setNewTitle}
          setNewBudget={setNewBudget}
          item={item}
          setEntry={setEntry}
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
    </div>
  );
}

export default DetailedView;
