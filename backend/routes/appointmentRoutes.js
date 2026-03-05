const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all appointments
router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM appointments");
  res.json(result.rows);
});

// Book appointment
router.post("/", async (req, res) => {
  const { patientId, doctorId, date } = req.body;

  const result = await pool.query(
    "INSERT INTO appointments (patient_id, doctor_id, appointment_date, status) VALUES ($1,$2,$3,'Pending') RETURNING *",
    [patientId, doctorId, date]
  );

  res.json(result.rows[0]);
});

// Update status
router.put("/:id", async (req, res) => {
  const { status } = req.body;

  const result = await pool.query(
    "UPDATE appointments SET status=$1 WHERE id=$2 RETURNING *",
    [status, req.params.id]
  );

  res.json(result.rows[0]);
});

module.exports = router;
