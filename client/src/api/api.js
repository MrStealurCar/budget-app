const fetchEnvelopes = async () => {
  try {
    const envelopeResponse = await fetch("http://localhost:3005/envelopes");
    const data = await envelopeResponse.json();
    return data;
  } catch (error) {
    console.error(`Error getting budget data: ${error}`);
  }
};

export const fetchBudget = async () => {
  try {
    const budgetResponse = await fetch("http://localhost:3005/total-budget");
    const data = await budgetResponse.json();
    return data;
  } catch (error) {
    console.error(`Error getting total budget: ${error}`);
  }
};

export default fetchEnvelopes;
