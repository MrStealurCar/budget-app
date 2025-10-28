import fetchEnvelopes from "./api";
import { fetchTotalBudget, fetchBudget } from "./api";
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
  try {
    const response = await fetch(`/envelopes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: title, budget: budget, user_id: user.uid }),
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
  user
) => {
  let difference = Number(budget) - Number(originalBudget);
  try {
    await fetch(`/envelopes/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        user_id: user.uid,
      },
      body: JSON.stringify({ title: title, budget: budget }),
    });
    const data = await fetchEnvelopes(user);
    setEntry(data);
    setSavedTotal(Number(savedTotal) - Number(difference));
  } catch (error) {
    console.error("could not update item:" + error);
  }
};

const handleDelete = async (
  id,
  setEntry,
  savedTotal,
  setSavedTotal,
  budget,
  user
) => {
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
    setSavedTotal(Number(savedTotal) + Number(budget));
    await fetchTotalBudget(Number(savedTotal) + Number(budget), user);
  } catch (error) {
    console.error("could not delete item:" + error);
  }
};

const handleTransfer = async (
  sourceId,
  destinationId,
  budget,
  setEntry,
  user
) => {
  try {
    if (typeof budget === "number") {
      await fetch(`/envelopes/${sourceId}/${destinationId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
          user_id: user.uid,
        },
        body: JSON.stringify({ amount: budget }),
      });
      const data = await fetchEnvelopes(user);
      setEntry(data);
    } else {
      throw new Error("input must be a number type");
    }
  } catch (error) {
    console.error("could not transer funds:" + error);
  }
};

export { handleCreate, handleEdit, handleDelete, handleTransfer };
