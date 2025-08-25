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

    // Always return array
    return res.json(result.rows || []);
  } catch (err) {
    console.error("DB error fetching conversions:", err.message);
    // Still return array on error
    return res.json([]);
  }
});

// ✅ Get all clicks for a given affiliate (grouped by campaign)
router.get("/:id/clicks", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      `SELECT clicks.id, clicks.click_id, clicks.timestamp, campaigns.name AS campaign_name
       FROM clicks
       JOIN campaigns ON clicks.campaign_id = campaigns.id
       WHERE clicks.affiliate_id = $1
       ORDER BY clicks.timestamp DESC`,
      [id]
    );

    // Always return array
    return res.json(result.rows || []);
  } catch (err) {
    console.error("DB error fetching clicks:", err.message);
    // Still return array on error
    return res.json([]);
  }
});

module.exports = router;
