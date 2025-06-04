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

module.exports = { getAllEntries };
