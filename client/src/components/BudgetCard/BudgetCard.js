import React, { useEffect, useState } from "react";
import fetchEnvelopes from "../../api/api";
import "./BudgetCard.css";
import EditMode from "../EditMode/EditMode";
import { handleDelete, handleTransfer } from "../../api/budgetActions";
function BudgetCard({ entry, setEntry }) {
  const [editId, setEditId] = useState(null);
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
      <ul>
        {entry.map((item) => (
          <li key={item.id} className="data">
            {item.title}: ${item.budget}
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
              <button title="Transfer funds">
                🔁 {/* transfers funds between entries */}
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BudgetCard;
