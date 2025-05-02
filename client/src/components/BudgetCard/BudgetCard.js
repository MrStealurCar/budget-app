import React, { useEffect } from "react";
import fetchEnvelopes from "../../api/api";
import "./BudgetCard.css";
function BudgetCard({ entry, setEntry }) {
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
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BudgetCard;
