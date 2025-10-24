const fetchEnvelopes = async (user) => {
  try {
    const envelopeResponse = await fetch(`/envelopes`, {
      headers: { user_id: user.uid },
    });
    const data = await envelopeResponse.json();
    return data;
  } catch (error) {
    console.error(`Error getting budget data: ${error}`);
  }
};

export const fetchBudget = async (user) => {
  try {
    const budgetResponse = await fetch(`/total-budget`, {
      headers: { user_id: user.uid },
    });
    const data = await budgetResponse.json();
    return data.remaining_budget;
  } catch (error) {
    console.error(`Error getting total budget: ${error}`);
  }
};

export const fetchTotalBudget = async (total_budget, user) => {
  try {
    const budgetResponse = await fetch(`/total-budget/total_budget`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        user_id: user.uid,
      },
      body: JSON.stringify({ total_budget }),
    });
    const data = await budgetResponse.json();
    return data.total_budget;
  } catch (error) {
    console.error(`Error fetching budget data: ${error}`);
  }
};

export default fetchEnvelopes;
