const express = require("express");
const envelopeRouter = express.Router();
const { mockEnvelopes } = require("../db.js");

// Route for getting all envelopes in mockEnvelopes
envelopeRouter.get("/", (req, res, next) => {
  res.send(mockEnvelopes);
});

//Route for adding envelopes to mockEnvelopes
envelopeRouter.post("/", (req, res, next) => {
  //finds the highest ID in the mockEnvelopes array
  const findHighestId = mockEnvelopes.reduce((acc, currentVal) => {
    if (acc.id > currentVal.id) {
      return acc.id;
    } else {
      return currentVal.id;
    }
  }, 0); // Starts at 0 to handle an empty array
  const newBudget = {
    id: findHighestId + 1,
    title: req.body.title,
    budget: req.body.budget,
  };
  mockEnvelopes.push(newBudget);

  res.status(201).send(mockEnvelopes);
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
envelopeRouter.put("/:id", (req, res, next) => {
  const envelopeId = req.params.id;
  const turnIdToNum = Number(envelopeId);
  const foundEnvelope = mockEnvelopes.find(
    (currentVal) => currentVal.id === turnIdToNum
  );
  if (foundEnvelope) {
    foundEnvelope.title = req.body.title;
    foundEnvelope.budget = req.body.budget;
    res.send(foundEnvelope);
  } else {
    res.status(404).send();
  }
});

// Route for deleting envelopes based on ID
envelopeRouter.delete("/:id", (req, res, next) => {
  const envelopeId = req.params.id;
  const turnIdToNum = Number(envelopeId);
  const envelopeToDelete = mockEnvelopes.findIndex(
    (envelope) => envelope.id === turnIdToNum
  );
  if (envelopeToDelete !== -1) {
    mockEnvelopes.splice(envelopeToDelete, 1);
    res.status(204).send("Envelope successfully deleted");
  } else {
    res.status(404).send();
  }
});

// Route for transferring funds between two envelopes
envelopeRouter.post("/:sourceId/:destinationId", (req, res, next) => {
  const amountToTransfer = req.body.amount;
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
