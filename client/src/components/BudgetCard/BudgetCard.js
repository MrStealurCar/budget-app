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
    <div className="data-container">
      <h3>Entries</h3>
      <ul className="data">
        {entry.map((item) => (
          <li key={item.id}>
            {item.title}: ${item.budget}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default BudgetCard;
