const fetchEnvelopes = async () => {
  try {
    const envelopeResponse = await fetch("/envelopes");
    const data = await envelopeResponse.json();
    return data;
  } catch (error) {
    console.error(`Error getting budget data: ${error}`);
  }
};

export const fetchBudget = async () => {
  try {
    const budgetResponse = await fetch("/total-budget");
    const data = await budgetResponse.json();
    return data;
  } catch (error) {
    console.error(`Error getting total budget: ${error}`);
  }
};

export const fetchTotalBudget = async (total_budget) => {
  try {
    const budgetResponse = await fetch("/total-budget/total_budget", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total_budget }),
    });
    const data = await budgetResponse.json();
    return data;
  } catch (error) {
    console.error(`Error fetching budget data: ${error}`);
  }
};

export default fetchEnvelopes;
