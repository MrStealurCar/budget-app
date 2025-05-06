import React, { useEffect, useState } from "react";
import fetchEnvelopes from "../../api/api";
import "./BudgetCard.css";
function BudgetCard({ entry, setEntry }) {
  const [editId, setEditId] = useState(null);
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
              <button title="Delete entry">❌</button> {/* deletes entry */}
              <button title="Edit entry">✏️</button>
              <button title="Transfer funds">🔁</button>
              {/* transfers funds between entries */}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BudgetCard;
