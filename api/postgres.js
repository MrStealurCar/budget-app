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
