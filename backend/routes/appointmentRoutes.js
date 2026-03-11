const express = require("express");
const router = express.Router();
const pool = require("../db");


// =======================================
// Get appointments for doctor
// =======================================

router.get("/doctor/:userId", async (req, res) => {
  try {

    const { userId } = req.params;

    const result = await pool.query(
      `SELECT 
          a.id,
          a.appointment_date,
          a.appointment_time,
          a.status,
          p.id AS patient_id,
          u.name AS patient_name
       FROM appointments a
       JOIN patients p ON a.patient_id = p.id
       JOIN users u ON p.user_id = u.id
       JOIN doctors d ON a.doctor_id = d.id
       WHERE d.user_id = $1
       ORDER BY a.appointment_date`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// =======================================
// Get appointments for patient
// =======================================

router.get("/:userId", async (req, res) => {
  try {

    const { userId } = req.params;

    const result = await pool.query(
      `SELECT 
          a.id,
          a.appointment_date,
          a.appointment_time,
          a.status,
          d.specialization,
          u.name AS doctor_name
       FROM appointments a
       JOIN doctors d ON a.doctor_id = d.id
       JOIN users u ON d.user_id = u.id
       WHERE a.patient_id = $1
       ORDER BY a.appointment_date`,
      [userId]
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// =======================================
// Patient books appointment
// =======================================

router.post("/", async (req, res) => {
  try {

    const { patientId, doctorId, date, time } = req.body;

    const result = await pool.query(
      `INSERT INTO appointments 
       (patient_id, doctor_id, appointment_date, appointment_time, status) 
       VALUES ($1,$2,$3,$4,'pending') 
       RETURNING *`,
      [patientId, doctorId, date, time]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


// =======================================
// Doctor updates appointment status
// =======================================

router.put("/:id", async (req, res) => {
  try {

    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE appointments SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


module.exports = router;