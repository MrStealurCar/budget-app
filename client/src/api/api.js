const fetchEnvelopes = async () => {
  try {
    const envelopeResponse = await fetch("http://localhost:3005/envelopes");
    const data = await envelopeResponse.json();
    return data;
  } catch (error) {
    console.error(`Error getting budget data: ${error}`);
  }
};

export default fetchEnvelopes;
