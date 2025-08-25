const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres", // ✅ default user
  host: "localhost",
  database: "affiliate_db", // ✅ the DB you created
  password: "Deep@plsql09", // ✅ the one you set in installer
  port: 5432,
});

module.exports = pool;
