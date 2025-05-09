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
      <span className="data-container">
        {entry.map((item) => (
          <p key={item.id}>
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
                setViewId={setViewId}
                setEditId={setEditId}
                setNewTitle={setNewTitle}
                setNewBudget={setNewBudget}
                setEntry={setEntry}
              />
            )}
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
          </p>
        ))}
      </span>
    </div>
  );
}
export default BudgetCard;
