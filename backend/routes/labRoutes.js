const express = require("express");
const router = express.Router();
const pool = require("../db");


router.get("/lab-tests/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `SELECT * FROM lab_tests
       WHERE record_id IN
       (SELECT id FROM medical_records WHERE patient_id=$1)`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});
module.exports = router;