import { useEffect, useState } from "react";
import fetchEnvelopes from "../../api/api";
import "./BudgetCard.css";
import DetailedView from "../DetailedView/DetailedView";
function BudgetCard({ entry, setEntry, savedTotal, setSavedTotal, user }) {
  const [editId, setEditId] = useState(null);
  const [viewId, setViewId] = useState(null);
  const [transferId, setTransferId] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [newBudget, setNewBudget] = useState(0);
  useEffect(() => {
    const getEnvelopes = async () => {
      const data = await fetchEnvelopes(user);
      setEntry(data);
    };
    getEnvelopes();
  }, [setEntry, user]);
  return (
    <div>
      {!entry || entry.length === 0 ? (
        <p className="entry-prompt">No current budget entries</p>
      ) : (
        <div className="data-container">
          <div className="title">
            <h2>Entries:</h2>
          </div>
          {entry.map((item) => (
            <span key={item.id} className="list-items">
              {item.title}: ${item.budget}
              <button
                className="detailed-view"
                title="Detailed View"
                onClick={() => {
                  setViewId(item.id);
                  setEditId(null);
                  setTransferId(null);
                }}
              >
                🔍
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
                  transferId={transferId}
                  setTransferId={setTransferId}
                  savedTotal={savedTotal}
                  setSavedTotal={setSavedTotal}
                />
              )}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
export default BudgetCard;
