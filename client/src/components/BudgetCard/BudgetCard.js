import React, { useEffect, useState } from "react";
import fetchEnvelopes from "../../api/api";
import "./BudgetCard.css";
import EditMode from "../EditMode/EditMode";
import DetailedView from "../DetailedView/DetailedView";
function BudgetCard({ entry, setEntry }) {
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBudget, setNewBudget] = useState(0);
  useEffect(() => {
    const getEnvelopes = async () => {
      const data = await fetchEnvelopes();
      setEntry(data);
    };
    getEnvelopes();
  }, [setEntry]);
  return (
    <div>
      <div className="title">
        <h2>Entries:</h2>
      </div>
      <div className="data-container">
        {entry.map((item) => (
          <span key={item.id} className="list-items">
            {item.title}: ${item.budget}
            <button
              className="detailed-view"
              title="Detailed View"
              onClick={() => {
                setViewId(item.id);
              }}
            >
              👁
            </button>
            {viewId === item.id && (
              <DetailedView
                item={item}
                editId={editId}
                setViewId={setViewId}
                setEditId={setEditId}
                newTitle={newTitle}
                setNewTitle={setNewTitle}
                newBudget={newBudget}
                setNewBudget={setNewBudget}
                entry={entry}
                setEntry={setEntry}
              />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
export default BudgetCard;
