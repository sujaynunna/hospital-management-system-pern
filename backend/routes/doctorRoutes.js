const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get all doctors with names
router.get("/", async (req, res) => {
  try {

    const result = await pool.query(
      `SELECT 
          d.id,
          u.name,
          d.specialization,
          u.email,
          d.experience_years,
          d.consultation_fee
       FROM doctors d
       JOIN users u
         ON d.user_id = u.id
       ORDER BY u.name`
    );

    res.json(result.rows);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {

  try {

    const { name, email, password, specialization, experience_years, consultation_fee } = req.body;
    const experience=parseInt(experience_years);
    const fee=parseFloat(consultation_fee);
    // Step 1: Insert into users table
    const userResult = await pool.query(
      `INSERT INTO users (name, email, password, role)
       VALUES ($1,$2,$3,'doctor')
       RETURNING id`,
      [name, email, password]
    );

    const userId = userResult.rows[0].id;

    // Step 2: Insert into doctors table
    const doctorResult = await pool.query(
      `INSERT INTO doctors (user_id, specialization, experience_years, consultation_fee)
       VALUES ($1,$2,$3,$4)
       RETURNING *`,
      [userId, specialization, experience, fee]
    );

    res.json(doctorResult.rows[0]);

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Failed to add doctor" });

  }

});

router.delete("/:id", async (req, res) => {

  try {

    const doctor = await pool.query(
      "SELECT user_id FROM doctors WHERE id=$1",
      [req.params.id]
    );

    const userId = doctor.rows[0].user_id;

    await pool.query("DELETE FROM users WHERE id=$1", [userId]);

    res.json({ message: "Doctor deleted" });

  } catch (err) {

    console.error(err);
    res.status(500).json({ error: "Delete failed" });

  }

});

module.exports = router;



