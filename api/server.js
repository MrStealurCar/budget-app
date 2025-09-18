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

app.use(express.static(path.join(__dirname, "../client/build"))); // Serve static files from the React app

// All other GET requests not handled before will return the React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build", "index.html"));
});
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;
