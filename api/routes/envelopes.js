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
  const { title, budget, user_id } = req.body;
  if (!title && !budget) {
    return res
      .status(400)
      .send({ error: "New entry must contain a name and a budget." });
  } else if (!title) {
    return res.status(400).send({
      error: `New budget must contain a name.`,
    });
  } else if (!budget || budget < MIN_BUDGET_AMT) {
    return res.status(400).send({
      error: `Budget must be at least $${MIN_BUDGET_AMT}.`,
    });
  }
  const newBudget = await createNewEntry(title, budget, user_id);
  res.status(201).send(newBudget);
});

// Route for updating envelope based on ID
envelopeRouter.put("/:id", async (req, res, next) => {
  const envelopeId = req.params.id;
  const envelopeTitle = req.body.title;
  const envelopeBudget = req.body.budget;
  const user_id = req.headers.user_id;
  if (!envelopeId || !user_id) {
    return res.status(404).send();
  }
  const result = await editEntry(
    envelopeId,
    envelopeTitle,
    envelopeBudget,
    user_id
  );
  res.send(result);
});

// Route for deleting envelopes based on ID
envelopeRouter.delete("/:id", async (req, res, next) => {
  const envelopeId = req.params.id;
  const user_id = req.headers.user_id;
  if (!envelopeId) {
    res.status(404).send();
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

  if (!sourceId) {
    res.status(404).send();
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
  const { total_budget, user_id } = req.body;
  if (total_budget < 0) {
    res.status(400).send("Amount cannot be a negative number");
  } else {
    await setSavedTotal(total_budget, user_id);
    res.status(201).send(total_budget);
  }
});
// Route for getting total budget in database
totalBudgetRouter.get("/", async (req, res, next) => {
  const user_id = req.headers.user_id;
  if (!user_id) {
    return res.status(400).send("User ID is required");
  }
  const getTotal = await getSavedTotal(user_id);
  res.json(getTotal);
});

module.exports = { envelopeRouter, totalBudgetRouter };
