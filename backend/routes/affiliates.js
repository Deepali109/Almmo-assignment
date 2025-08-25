const express = require("express");
const router = express.Router();
const pool = require("../db");

// ✅ Get all conversions for a given affiliate
router.get("/:id/conversions", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT conversions.id, conversions.amount, conversions.currency, conversions.timestamp
       FROM conversions
       JOIN clicks ON conversions.click_id = clicks.id
       WHERE clicks.affiliate_id = $1
       ORDER BY conversions.timestamp DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching conversions:", err);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch conversions" });
  }
});

// ✅ Get all clicks for a given affiliate
router.get("/:id/clicks", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT clicks.id, clicks.click_id, clicks.timestamp,
              COALESCE(campaigns.name, 'Unknown Campaign') AS campaign_name
       FROM clicks
       LEFT JOIN campaigns ON clicks.campaign_id = campaigns.id
       WHERE clicks.affiliate_id = $1
       ORDER BY clicks.timestamp DESC`,
      [id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching clicks:", err);
    res
      .status(500)
      .json({ status: "error", message: "Failed to fetch clicks" });
  }
});

module.exports = router;
