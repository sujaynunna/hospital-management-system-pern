const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/", async (req, res) => {
  const result = await pool.query("SELECT * FROM doctors");
  res.json(result.rows);
});

router.post("/", async (req, res) => {
  const { name, specialization } = req.body;

  const result = await pool.query(
    "INSERT INTO doctors (name, specialization) VALUES ($1,$2) RETURNING *",
    [name, specialization]
  );

  res.json(result.rows[0]);
});

router.delete("/:id", async (req, res) => {
  await pool.query("DELETE FROM doctors WHERE id=$1", [req.params.id]);
  res.json({ message: "Doctor deleted" });
});

module.exports = router;