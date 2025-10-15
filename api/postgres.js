const { Pool } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// prevent crashing if idle client error(s) occur
pool.on("error", (err) => {
  console.error("Unexpected error on idle client", err);
});

const getAllEntries = async (user_id) => {
  try {
    const result = await pool.query(
      "SELECT * FROM budget_entries WHERE user_id = $1 ORDER BY id;",
      [user_id]
    );
    return result.rows;
  } catch (err) {
    console.error("DB query error:", err);
  }
};

const createNewEntry = async (title, budget, user_id) => {
  try {
    const result = await pool.query(
      "INSERT INTO budget_entries(title, budget, user_id) VALUES($1, $2, $3) RETURNING *",
      [title, budget, user_id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Could not create entry", err);
  }
};

const editEntry = async (id, title, budget) => {
  try {
    const result = await pool.query(
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
    const result = await pool.query(
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
    await pool.query("BEGIN");
    await pool.query(
      "UPDATE budget_entries SET budget = budget - $2 WHERE id = $1",
      [sourceId, budgetToTransfer]
    );
    await pool.query(
      "UPDATE budget_entries SET budget = budget + $2 WHERE id = $1",
      [destinationId, budgetToTransfer]
    );
    await pool.query("COMMIT");
  } catch (err) {
    await pool.query("ROLLBACK");
    console.error("Error transferring budgets", err);
  }
};

const setSavedTotal = async (total_budget, user_id) => {
  try {
    const result = await pool.query(
      "INSERT INTO saved_total (total_budget, user_id ) VALUES ($1, $2) ON CONFLICT (user_id) DO UPDATE SET total_budget = $1 RETURNING *;",
      [total_budget, user_id]
    );
    return result.rows[0];
  } catch (err) {
    console.error("Could not set budget", err);
  }
};

const getSavedTotal = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT s.total_budget - COALESCE(SUM(b.budget), 0) AS remaining_budget FROM saved_total s LEFT JOIN budget_entries b ON s.user_id = b.user_id WHERE s.user_id = $1 GROUP BY s.total_budget;",
      [userId]
    );
    if (result.rows.length === 0) {
      console.log(`No saved_total found for user ${userId}`);
      return { total_budget: 0 };
    }

    return result.rows[0];
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
