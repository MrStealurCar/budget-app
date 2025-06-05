const express = require("express");
const envelopeRouter = express.Router();
const { mockEnvelopes } = require("../db.js");
const {
  getAllEntries,
  createNewEntry,
  editEntry,
  deleteEntry,
} = require("../postgres.js");

// Route for getting all envelopes in mockEnvelopes
envelopeRouter.get("/", async (req, res, next) => {
  const response = await getAllEntries();
  res.send(response);
});

//Route for adding envelopes to mockEnvelopes
envelopeRouter.post("/", async (req, res, next) => {
  const newBudget = await createNewEntry(req.body.title, req.body.budget);
  res.status(201).send(newBudget);
});

// Route for getting envelope based on ID
envelopeRouter.get("/:id", (req, res, next) => {
  const envelopeId = req.params.id;
  const turnIdToNum = Number(envelopeId);
  const foundEnvelope = mockEnvelopes.find(
    (currentVal) => currentVal.id === turnIdToNum
  );

  if (foundEnvelope) {
    res.send(foundEnvelope);
  } else {
    res.status(404).send("Envelope not found");
  }
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
envelopeRouter.post("/:sourceId/:destinationId", (req, res, next) => {
  const amountToTransfer = Number(req.body.amount);
  const sourceId = req.params.sourceId;
  const sourceIdToNum = Number(sourceId);

  const destinationId = req.params.destinationId;
  const destinationIdToNum = Number(destinationId);

  const sourceEnvelopeToUpdate = mockEnvelopes.find(
    (currentVal) => currentVal.id === sourceIdToNum
  );
  const destinationEnvelopeToUpdate = mockEnvelopes.find(
    (currentVal) => currentVal.id === destinationIdToNum
  );

  if (
    sourceEnvelopeToUpdate &&
    destinationEnvelopeToUpdate &&
    sourceEnvelopeToUpdate.budget > amountToTransfer
  ) {
    sourceEnvelopeToUpdate.budget -= amountToTransfer;
    destinationEnvelopeToUpdate.budget += amountToTransfer;
    res.status(200).send({
      message: "Transfer successful",
      sourceEnvelope: sourceEnvelopeToUpdate,
      destinationEnvelope: destinationEnvelopeToUpdate,
    });
  } else {
    res.status(404).send();
  }
});

module.exports = envelopeRouter;
