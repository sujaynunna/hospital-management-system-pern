const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:userId", async (req, res) => {
  try {

    const { userId } = req.params;

    const result = await pool.query(
      `SELECT 
        b.id,
        b.total_amount,
        b.status,
        COALESCE(SUM(p.amount),0) AS amount_paid,
        (b.total_amount - COALESCE(SUM(p.amount),0)) AS amount_left
       FROM bills b
       JOIN patients pt ON b.patient_id = pt.id
       LEFT JOIN payments p ON b.id = p.bill_id
       WHERE pt.user_id=$1
       GROUP BY b.id
       ORDER BY b.id ASC`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Error fetching bills" });

  }
});

router.post("/payments", async (req, res) => {
  try {
    // 1. Destructure the values from the body
    const { billId, amount } = req.body; 

    // 2. Pass them as individual items in the array
    // DO NOT pass [req.body] - that causes the error you see
    await pool.query(
      `INSERT INTO payments (bill_id, amount, method) VALUES ($1, $2, $3)`,
      [billId, amount, 'Online'] 
    );

    // 3. Get totals to update status
    const result = await pool.query(
      `SELECT total_amount, 
       (SELECT COALESCE(SUM(amount), 0) FROM payments WHERE bill_id = $1) as paid 
       FROM bills WHERE id = $1`,
      [billId]
    );

    const total = parseFloat(result.rows[0].total_amount);
    const paid = parseFloat(result.rows[0].paid);

    // 4. Match the strings to your CHECK constraint exactly
    let status = "unpaid";
    if (paid >= total) status = "paid";
    else if (paid > 0) status = "partial";

    await pool.query(
      `UPDATE bills SET status = $1 WHERE id = $2`,
      [status, billId]
    );

    res.json({ message: "Payment successful", status });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
module.exports = router;