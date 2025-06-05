const { Client } = require("pg");
const dotenv = require("dotenv");
dotenv.config();

const db = new Client({
  host: process.env.PGHOST,
  port: process.env.PGPORT,
  user: process.env.PGUSER,
  database: process.env.PGDATABASE,
});

db.connect();

const getAllEntries = async () => {
  try {
    const result = await db.query("SELECT * FROM budget_entries;");
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

module.exports = { getAllEntries, createNewEntry, editEntry, deleteEntry };
