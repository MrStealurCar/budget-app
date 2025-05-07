import fetchEnvelopes from "./api";
const handleEdit = async (id, title, budget, setEntry) => {
  try {
    await fetch(`http://localhost:3005/envelopes/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ title: title, budget: budget }),
    });
    const data = await fetchEnvelopes();
    setEntry(data);
  } catch (error) {
    console.error("could not update item:" + error);
  }
};

const handleDelete = async (id, setEntry) => {
  try {
    await fetch(`http://localhost:3005/envelopes/${id}`, {
      method: "DELETE",
    });
    const data = await fetchEnvelopes();
    setEntry(data);
  } catch (error) {
    console.error("could not delete item:" + error);
  }
};

const handleTransfer = async (sourceId, destinationId, budget, setEntry) => {
  try {
    if (typeof budget === "number") {
      await fetch(
        `http://localhost:3005/envelopes/${sourceId}/${destinationId}`,
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ amount: budget }),
        }
      );
      const data = await fetchEnvelopes();
      setEntry(data);
    } else {
      throw new Error("input must be a number type");
    }
  } catch (error) {
    console.error("could not transer funds:" + error);
  }
};

export { handleEdit, handleDelete, handleTransfer };
