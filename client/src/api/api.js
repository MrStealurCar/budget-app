const API_URL = "https://budget-app-tkh2.onrender.com";

const fetchEnvelopes = async () => {
  try {
    const envelopeResponse = await fetch(`${API_URL}/envelopes`);
    const data = await envelopeResponse.json();
    return data;
  } catch (error) {
    console.error(`Error getting budget data: ${error}`);
  }
};

export const fetchBudget = async () => {
  try {
    const budgetResponse = await fetch(`${API_URL}/total-budget`);
    const data = await budgetResponse.json();
    return data;
  } catch (error) {
    console.error(`Error getting total budget: ${error}`);
  }
};

export const fetchTotalBudget = async (total_budget) => {
  try {
    const budgetResponse = await fetch(`${API_URL}/total-budget/total_budget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ total_budget }),
    });
    const data = await budgetResponse.json();
    return data;
  } catch (error) {
    console.error(`Error updating total budget: ${error}`);
  }
};

export default fetchEnvelopes;
