const express = require("express");
const router = express.Router();
const pool = require("../db");

// Track clicks
router.get("/", async (req, res) => {
  const { affiliate_id, campaign_id, click_id } = req.query;

  if (!affiliate_id || !campaign_id || !click_id) {
    return res
      .status(400)
      .json({ status: "error", message: "Missing parameters" });
  }

  try {
    await pool.query(
      "INSERT INTO clicks (affiliate_id, campaign_id, click_id) VALUES ($1, $2, $3)",
      [affiliate_id, campaign_id, click_id]
    );
    res.json({ status: "success", message: "Click tracked" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: "error", message: "Failed to track click" });
  }
});

module.exports = router;
