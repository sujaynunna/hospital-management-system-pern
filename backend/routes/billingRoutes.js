const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get bills
router.get("/:userId", async (req,res)=>{
  const { userId } = req.params;

  const result = await pool.query(
    "SELECT * FROM bills WHERE patient_id=$1",
    [userId]
  );

  res.json(result.rows);
});

// Make payment
router.post("/payments", async (req, res) => {
  const { billId } = req.body;

  await pool.query(
    "INSERT INTO payments (bill_id, amount) VALUES ($1, 1000)",
    [billId]
  );

  await pool.query(
    "UPDATE bills SET status='Paid' WHERE id=$1",
    [billId]
  );

  res.json({ message: "Payment successful" });
});

module.exports = router;