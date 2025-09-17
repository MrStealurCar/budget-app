const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const db = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

db.connect()
  .then(() => {
    console.log("Connected to Neon database");
  })
  .catch((err) => {
    console.error("Connection error", err.stack);
  });

const getAllEntries = async () => {
  try {
    const result = await db.query("SELECT * FROM budget_entries ORDER BY id;");
    return result.rows;
  } catch (err) {
    console.error("DB query error:", err);
  }
};

const createNewEntry = async (title, budget) => {
  try {
    const result = await db.query(
      "INSERT INTO budget_entries(title, budget) VALUES($1, $2) RETURNING *",
      [title, budget]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Could not create entry", err);
  }
};

const editEntry = async (id, title, budget) => {
  try {
    const result = await db.query(
      "UPDATE budget_entries SET title = $2, budget = $3 WHERE id = $1 RETURNING *",
      [id, title, budget]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Could not edit entry", err);
  }
};

const deleteEntry = async (id) => {
  try {
    const result = await db.query(
      "DELETE FROM budget_entries WHERE id=$1 RETURNING *",
      [id]
    );
    return result.rows;
  } catch (err) {
    console.error("Could not delete entry", err);
  }
};

const transferBetweenEntries = async (
  sourceId,
  destinationId,
  budgetToTransfer
) => {
  try {
    await db.query("BEGIN");
    await db.query(
      "UPDATE budget_entries SET budget = budget - $2 WHERE id = $1",
      [sourceId, budgetToTransfer]
    );
    await db.query(
      "UPDATE budget_entries SET budget = budget + $2 WHERE id = $1",
      [destinationId, budgetToTransfer]
    );
    await db.query("COMMIT");
  } catch (err) {
    await db.query("ROLLBACK");
    console.error("Error transferring budgets", err);
  }
};

const setSavedTotal = async (total_budget) => {
  try {
    const result = await db.query(
      "UPDATE saved_total SET total_budget = $1 RETURNING *",
      [total_budget]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Could not set budget", err);
  }
};

const getSavedTotal = async () => {
  try {
    const result = await db.query("SELECT total_budget FROM saved_total");
    return result.rows[0].total_budget;
  } catch (err) {
    console.error("Could not get budget", err);
  }
};

module.exports = {
  getAllEntries,
  createNewEntry,
  editEntry,
  deleteEntry,
  transferBetweenEntries,
  setSavedTotal,
  getSavedTotal,
};
