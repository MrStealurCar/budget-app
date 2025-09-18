const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const { envelopeRouter, totalBudgetRouter } = require("./routes/envelopes");
const cors = require("cors");
const path = require("path"); // Allows frontend to be served in production

app.use(express.json()); //Middleware to parse incoming requests
app.use(cors());

// Registers routes for /envelopes
app.use("/envelopes", envelopeRouter);
app.use("/total-budget", totalBudgetRouter);

app.use(express.static(path.join(__dirname, "../client/build")));

app.get("/{*splat}", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
