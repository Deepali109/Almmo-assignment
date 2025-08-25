require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // ✅ default user
  host: "localhost",
  database: "affiliate_db", // ✅ the DB you created
  password: process.env.DB_PASSWORD, // ✅ the one you set in installer
  port: 5432,
});

module.exports = pool;
