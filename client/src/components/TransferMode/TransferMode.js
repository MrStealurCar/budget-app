import { useState } from "react";
import "./TransferMode.css";
import { FaSpinner } from "react-icons/fa";
import { handleTransfer } from "../../api/budgetActions";
function TransferMode({
  sourceId,
  entry,
  setEntry,
  user,
  setError,
  setTransferId,
}) {
  const [transferAmount, setTransferAmount] = useState("");
  const [destination, setDestination] = useState(null);
  const [isTransferring, setIsTransferring] = useState(false);
  return (
    <div className="transfer-mode">
      <select onChange={(e) => setDestination(Number(e.target.value))} required>
        <option value={""}>Transfer to</option>
        {entry
          .filter((item) => item.id !== sourceId)
          .map((item) => (
            <option key={item.id} value={item.id}>
              {item.title}
            </option>
          ))}
      </select>

      <input
        value={transferAmount}
        placeholder="Amount"
        type="number"
        onChange={(e) => setTransferAmount(Number(e.target.value))}
        required
      />
      <button
        className="transfer-button"
        onClick={async () => {
          setIsTransferring(true);
          try {
            await handleTransfer(
              sourceId,
              destination,
              transferAmount,
              setEntry,
              user,
              setError
            );
          } finally {
            setIsTransferring(false);
            setTransferId(null);
          }
        }}
        disabled={isTransferring}
      >
        {isTransferring ? (
          <FaSpinner className="loading-spinner" />
        ) : (
          "Transfer"
        )}
      </button>
    </div>
  );
}

export default TransferMode;
