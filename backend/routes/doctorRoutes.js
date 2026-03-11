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
          d.specialization
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

module.exports = router;

router.post("/", async (req, res) => {

  const { user_id, specialization, experience_years, consultation_fee } = req.body;

  const result = await pool.query(
    `INSERT INTO doctors (user_id, specialization, experience_years, consultation_fee)
     VALUES ($1,$2,$3,$4)
     RETURNING *`,
    [user_id, specialization, experience_years, consultation_fee]
  );

  res.json(result.rows[0]);

});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM doctors WHERE id=$1", [req.params.id]);
  res.json({ message: "Doctor deleted" });
});

module.exports = router;



