const express = require("express");
const app = express();
const PORT = process.env.PORT || 3005;
const envelopesRouter = require("./routes/envelopes");
const cors = require("cors");

app.use(express.json()); //Middleware to parse incoming requests
app.use(cors());
// Registers routes for /envelopes
app.use("/envelopes", envelopesRouter);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
