import fetchEnvelopes from "./api";
import { fetchTotalBudget, fetchBudget } from "./api";

const handleSetBudget = async (
  totalBudget,
  setSavedTotal,
  setTotalBudget,
  setError,
  user
) => {
  try {
    const newTotalBudget = await fetchTotalBudget(totalBudget, user);
    if (newTotalBudget !== undefined) {
      setSavedTotal(newTotalBudget);
      setTotalBudget("");
      setError("");
    }
  } catch (error) {
    setError(error.message);
    console.error(`Error setting total budget: ${error}`);
  }
};

const handleCreate = async (
  title,
  budget,
  setEntry,
  setTitle,
  setBudget,
  savedTotal,
  setSavedTotal,
  setError,
  user
) => {
  if (budget > savedTotal) {
    setError("Budget exceeds total budget available.");
    return;
  }
  try {
    const response = await fetch(`/envelopes`, {
      method: "POST",
      headers: {
        user_id: user.uid,
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: title, budget: budget }),
    });

    if (response.ok) {
      const data = await fetchEnvelopes(user);
      const newTotal = await fetchBudget(user);
      setEntry(data);
      setSavedTotal(newTotal);
      setTitle("");
      setBudget("");
    } else {
      const data = await response.json();
      setError(data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("could not create entry" + error);
  }
};

const handleEdit = async (
  id,
  originalBudget,
  title,
  budget,
  setEntry,
  savedTotal,
  setSavedTotal,
  user,
  setError
) => {
  let difference = Number(budget) - Number(originalBudget);
  try {
    const response = await fetch(`/envelopes/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        user_id: user.uid,
      },
      body: JSON.stringify({ title: title, budget: budget }),
    });
    if (response.ok) {
      const data = await fetchEnvelopes(user);
      setEntry(data);
      setSavedTotal(Number(savedTotal) - Number(difference));
    } else {
      const data = await response.json();
      setError(data.error);
      throw new Error(data.error);
    }
  } catch (error) {
    console.error("could not update item:" + error);
  }
};

const handleDelete = async (id, setEntry, setSavedTotal, user) => {
  try {
    await fetch(`/envelopes/${id}`, {
      method: "DELETE",
      headers: {
        "content-type": "application/json",
        user_id: user.uid,
      },
    });
    const data = await fetchEnvelopes(user);
    setEntry(data);

    // Fetches the authoritative saved total from the backend instead of manually computing
    const newTotal = await fetchBudget(user);
    setSavedTotal(newTotal);
  } catch (error) {
    console.error("could not delete item:" + error);
  }
};

const handleTransfer = async (
  sourceId,
  destinationId,
  budget,
  setEntry,
  user,
  setError
) => {
  try {
    if (typeof budget === "number") {
      const response = await fetch(`/envelopes/${sourceId}/${destinationId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          user_id: user.uid,
        },
        body: JSON.stringify({ amount: budget }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.error);
        return;
      }

      const data = await fetchEnvelopes(user);
      setEntry(data);
      setError(null);
    } else {
      throw new Error("input must be a number type");
    }
  } catch (error) {
    console.error("could not transer funds:" + error);
  }
};

export {
  handleCreate,
  handleEdit,
  handleDelete,
  handleTransfer,
  handleSetBudget,
};
