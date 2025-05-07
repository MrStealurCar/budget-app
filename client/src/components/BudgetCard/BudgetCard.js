import React, { useEffect, useState } from "react";
import fetchEnvelopes from "../../api/api";
import "./BudgetCard.css";
import {
  handleEdit,
  handleDelete,
  handleTransfer,
} from "../../api/budgetActions";
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
              <button title="Delete entry">❌ {/* deletes entry */}</button>
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
                <div>
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
                    onClick={() => {
                      handleEdit(item.id, newTitle, newBudget, setEntry);
                      setEditId(null);
                      setNewTitle("");
                      setNewBudget(0);
                    }}
                  >
                    Save
                  </button>
                </div>
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
