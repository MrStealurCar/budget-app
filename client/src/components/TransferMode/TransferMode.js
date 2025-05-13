import React, { useState } from "react";
import "./TransferMode.css";
import { handleTransfer } from "../../api/budgetActions";
function TransferMode({ sourceId, entry, setEntry }) {
  const [transferAmount, setTransferAmount] = useState(0);
  const [destination, setDestination] = useState(null);

  return (
    <div className="test">
      <input
        value={transferAmount}
        placeholder="Amount"
        type="number"
        onChange={(e) => setTransferAmount(Number(e.target.value))}
        required
      />
      <select onClick={(e) => setDestination(Number(e.target.value))} required>
        {entry
          .filter((item) => item.id !== sourceId)
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
      </select>
      <button
        onClick={() => {
          handleTransfer(sourceId, destination, transferAmount, setEntry);
        }}
      >
        Transfer
      </button>
    </div>
  );
}

export default TransferMode;
