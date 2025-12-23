const express = require("express");
const envelopeRouter = express.Router();
const totalBudgetRouter = express.Router();
const { MIN_BUDGET_AMT } = require("../constants");
const {
  getAllEntries,
  createNewEntry,
  editEntry,
  deleteEntry,
  transferBetweenEntries,
  setSavedTotal,
  getSavedTotal,
  getEnvelopeById,
} = require("../postgres.js");

// Route for getting all envelopes in database
envelopeRouter.get("/", async (req, res, next) => {
  const user_id = req.headers.user_id;
  if (!user_id) {
    return res.status(400).send("User ID is required");
  }
  const response = await getAllEntries(user_id);
  res.send(response);
});

// Route for adding envelopes to database
envelopeRouter.post("/", async (req, res, next) => {
  const { user_id } = req.headers;
  const { title, budget } = req.body;
  const cleanedTitle = title.trim();
  const savedTotal = await getSavedTotal(user_id);
  if (budget > savedTotal.remaining_budget) {
    return res
      .status(400)
      .send({ error: "Budget exceeds total budget available." });
  } else if (!title && !budget) {
    return res
      .status(400)
      .send({ error: "New entry must contain a name and a budget." });
  } else if (!title || !cleanedTitle) {
    return res.status(400).send({
      error: `New budget must contain a name.`,
    });
  } else if (!budget || budget < MIN_BUDGET_AMT) {
    return res.status(400).send({
      error: `Budget must be at least $${MIN_BUDGET_AMT}.`,
    });
  }
  const newBudget = await createNewEntry(cleanedTitle, budget, user_id);
  res.status(201).send(newBudget);
});

// Route for updating envelope based on ID
envelopeRouter.put("/:id", async (req, res, next) => {
  const envelopeId = req.params.id;
  const envelopeTitle = req.body.title;
  const envelopeBudget = req.body.budget;
  const user_id = req.headers.user_id;
  const cleanedTitle = envelopeTitle.trim();
  const envelope = await getEnvelopeById(envelopeId, user_id);

  if (!user_id) {
    return res.status(400).send({ error: "User ID not found" });
  } else if (!envelope) {
    return res.status(404).send({
      error: "Budget does not exist or incorrect permissions to edit.",
    });
  } else if (envelopeBudget < MIN_BUDGET_AMT) {
    return res.status(400).send({
      error: `Budget must be at least $${MIN_BUDGET_AMT}.`,
    });
  } else if (!envelopeTitle || !cleanedTitle) {
    return res.status(400).send({
      error: "Title cannot be empty.",
    });
  }

  const result = await editEntry(
    envelopeId,
    cleanedTitle,
    envelopeBudget,
    user_id
  );
  res.send(result);
});

// Route for deleting envelopes based on ID
envelopeRouter.delete("/:id", async (req, res, next) => {
  const envelopeId = req.params.id;
  const user_id = req.headers.user_id;

  if (!user_id) {
    return res.status(400).send({ error: "User ID is required." });
  }

  // Check if the envelope exists and belongs to the user
  const envelope = await getEnvelopeById(envelopeId, user_id);
  if (!envelope) {
    return res.status(404).send({
      error: "Budget does not exist or incorrect permissions to delete.",
    });
  }

  await deleteEntry(envelopeId, user_id);

  res.status(204).send();
});

// Route for transferring funds between two envelopes
envelopeRouter.post("/:sourceId/:destinationId", async (req, res, next) => {
  const amountToTransfer = Number(req.body.amount);
  const sourceId = req.params.sourceId;
  const sourceIdToNum = Number(sourceId);
  const destinationId = req.params.destinationId;
  const destinationIdToNum = Number(destinationId);
  const user_id = req.headers.user_id;
  const sourceEnvelope = await getEnvelopeById(sourceIdToNum, user_id);

  if (!sourceEnvelope) {
    return res.status(404).send({ error: "Source envelope not found." });
  } else if (amountToTransfer <= 0) {
    return res.status(400).send({
      error: "Transfer amount must be a positive number.",
    });
  } else if (amountToTransfer > sourceEnvelope.budget) {
    return res.status(400).send({
      error: "Insufficient funds in budget to complete transfer.",
    });
  } else if (amountToTransfer == sourceEnvelope.budget) {
    return res.status(400).send({
      error: "Cannot transfer entire budget from entry.",
    });
  } else {
    await transferBetweenEntries(
      sourceIdToNum,
      destinationIdToNum,
      amountToTransfer,
      user_id
    );
    res.status(200).send({
      message: "Transfer successful",
    });
  }
});

// Route for setting total budget
totalBudgetRouter.post("/total_budget", async (req, res, next) => {
  const { user_id } = req.headers;
  const { total_budget } = req.body;
  if (total_budget < 0) {
    return res.status(400).json({
      error: `Budget must be at least $${MIN_BUDGET_AMT}.`,
    });
  }
  try {
    await setSavedTotal(total_budget, user_id);
    res.status(201).json({ total_budget });
  } catch (error) {
    console.error("Error setting total budget", error);
    res.status(503).json({
      error: "Database temporarily unavailable. Please refresh and try again",
    });
  }
});

// Route for getting total budget in database
totalBudgetRouter.get("/", async (req, res, next) => {
  const user_id = req.headers.user_id;
  if (!user_id) {
    return res.status(400).send("User ID is required");
  }
  try {
    const getTotal = await getSavedTotal(user_id);
    res.json(getTotal);
  } catch (error) {
    console.error("Error getting total budget", error);
    res.status(503).json({
      error: "Database temporarily unavailable. Please refresh and try again",
    });
  }
});

module.exports = { envelopeRouter, totalBudgetRouter };
