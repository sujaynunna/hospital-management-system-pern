const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/prescriptions/:userId", async (req,res)=>{
  const { userId } = req.params;

  const result = await pool.query(
    `SELECT * FROM prescriptions
     WHERE record_id IN
     (SELECT id FROM medical_records WHERE patient_id=$1)`,
    [userId]
  );

  res.json(result.rows);
});

module.exports = router;