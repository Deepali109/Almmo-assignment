const express = require("express");
const router = express.Router();
const pool = require("../db");

// Handle postbacks
router.get("/", async (req, res) => {
  const { affiliate_id, click_id, amount, currency } = req.query;

  if (!affiliate_id || !click_id || !amount || !currency) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing parameters" });
  }

  try {
    // Validate click
    const clickResult = await pool.query(
      "SELECT id FROM clicks WHERE affiliate_id = $1 AND click_id = $2",
      [affiliate_id, click_id]
    );

    if (clickResult.rows.length === 0) {
      return res
        .status(400)
        .json({ status: "error", message: "Invalid click_id or affiliate_id" });
    }

    const click = clickResult.rows[0];

    // Store conversion
    await pool.query(
      "INSERT INTO conversions (click_id, amount, currency) VALUES ($1, $2, $3)",
      [click.id, amount, currency]
    );

    res.json({ status: "success", message: "Conversion tracked" });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ status: "error", message: "Failed to track conversion" });
  }
});

module.exports = router;
