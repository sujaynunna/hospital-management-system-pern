const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get bills with paid & remaining amount
router.get("/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      `
      SELECT 
        b.id,
        b.total_amount,
        b.status,
        COALESCE(SUM(p.amount),0) AS amount_paid,
        (b.total_amount - COALESCE(SUM(p.amount),0)) AS amount_left
      FROM bills b
      LEFT JOIN payments p ON b.id = p.bill_id
      WHERE b.patient_id=$1
      GROUP BY b.id
      ORDER BY b.id DESC
      `,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error fetching bills" });
  }
});

// Make payment
router.post("/payments", async (req, res) => {
  try {
    const { billId, amount } = req.body;

    // Insert payment
    await pool.query(
      "INSERT INTO payments (bill_id, amount) VALUES ($1,$2)",
      [billId, amount]
    );

    // Calculate total paid
    const result = await pool.query(
      `
      SELECT 
      b.total_amount,
      COALESCE(SUM(p.amount),0) AS paid
      FROM bills b
      LEFT JOIN payments p ON b.id=p.bill_id
      WHERE b.id=$1
      GROUP BY b.id
      `,
      [billId]
    );

    const total = result.rows[0].total_amount;
    const paid = result.rows[0].paid;

    let status = "Pending";

    if (paid >= total) status = "Paid";
    else if (paid > 0) status = "Partial";

    await pool.query(
      "UPDATE bills SET status=$1 WHERE id=$2",
      [status, billId]
    );

    res.json({
      message: "Payment successful",
      total,
      paid,
      remaining: total - paid
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment failed" });
  }
});

module.exports = router;