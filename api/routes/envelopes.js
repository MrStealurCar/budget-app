const express = require("express");
const envelopeRouter = express.Router();
const totalBudgetRouter = express.Router();
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
  const response = await getAllEntries();
  res.send(response);
});

//Route for adding envelopes to database
envelopeRouter.post("/", async (req, res, next) => {
  const newBudget = await createNewEntry(req.body.title, req.body.budget);
  res.status(201).send(newBudget);
});

// Route for updating envelope based on ID
envelopeRouter.put("/:id", async (req, res, next) => {
  const envelopeId = req.params.id;
  const envelopeTitle = req.body.title;
  const envelopeBudget = req.body.budget;
  if (!envelopeId) {
    res.status(404).send();
  }
  const result = await editEntry(envelopeId, envelopeTitle, envelopeBudget);
  res.send(result);
});

// Route for deleting envelopes based on ID
envelopeRouter.delete("/:id", async (req, res, next) => {
  const envelopeId = req.params.id;
  await deleteEntry(envelopeId);

  res.status(204).send();
});

// Route for transferring funds between two envelopes
envelopeRouter.post("/:sourceId/:destinationId", async (req, res, next) => {
  const amountToTransfer = Number(req.body.amount);
  const sourceId = req.params.sourceId;
  const sourceIdToNum = Number(sourceId);

  const destinationId = req.params.destinationId;
  const destinationIdToNum = Number(destinationId);

  if (!sourceId) {
    res.status(404).send();
  } else {
    await transferBetweenEntries(
      sourceIdToNum,
      destinationIdToNum,
      amountToTransfer
    );
    res.status(200).send({
      message: "Transfer successful",
    });
  }
});

// Route for setting total budget
totalBudgetRouter.post("/total_budget", async (req, res, next) => {
  const totalBudget = await setSavedTotal(req.body.total_budget);
  res.status(201).send(totalBudget);
});

//Route for getting total budget in database
totalBudgetRouter.get("/", async (req, res, next) => {
  const getTotal = await getSavedTotal();
  res.send(getTotal);
});

module.exports = { envelopeRouter, totalBudgetRouter };
