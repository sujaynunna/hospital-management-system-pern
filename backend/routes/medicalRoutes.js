const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/medical-records/:userId", async (req,res)=>{
  const { userId } = req.params;

  const result = await pool.query(
    "SELECT * FROM medical_records WHERE patient_id=$1",
    [userId]
  );

  res.json(result.rows);
});

module.exports = router;