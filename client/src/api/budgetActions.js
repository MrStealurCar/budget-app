import fetchEnvelopes from "./api";
import { fetchTotalBudget } from "./api";
const handleCreate = async (
  title,
  budget,
  setEntry,
  setTitle,
  setBudget,
  savedTotal,
  setSavedTotal,
  error,
  setError
) => {
  try {
    const response = await fetch(`${process.env.REACT_APP_API_URL}/envelopes`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: title, budget: budget }),
    });
    if (response.ok) {
      const data = await fetchEnvelopes();
      const newTotal = savedTotal - budget;
      setEntry(data);
      setSavedTotal(newTotal);
      await fetchTotalBudget(newTotal);
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
  setSavedTotal
) => {
  let difference = budget - originalBudget;
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/envelopes/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: title, budget: budget }),
    });
    const data = await fetchEnvelopes();
    setEntry(data);
    setSavedTotal(savedTotal - difference);
  } catch (error) {
    console.error("could not update item:" + error);
  }
};

const handleDelete = async (
  id,
  setEntry,
  savedTotal,
  setSavedTotal,
  budget
) => {
  try {
    await fetch(`${process.env.REACT_APP_API_URL}/envelopes/${id}`, {
      method: "DELETE",
    });
    const data = await fetchEnvelopes();
    setEntry(data);
    setSavedTotal(savedTotal + Number(budget));
    await fetchTotalBudget(savedTotal + Number(budget));
  } catch (error) {
    console.error("could not delete item:" + error);
  }
};

const handleTransfer = async (sourceId, destinationId, budget, setEntry) => {
  try {
    if (typeof budget === "number") {
      await fetch(`/envelopes/${sourceId}/${destinationId}`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ amount: budget }),
      });
      const data = await fetchEnvelopes();
      setEntry(data);
    } else {
      throw new Error("input must be a number type");
    }
  } catch (error) {
    console.error("could not transer funds:" + error);
  }
};

export { handleCreate, handleEdit, handleDelete, handleTransfer };
