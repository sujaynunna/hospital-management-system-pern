const express = require("express");
const router = express.Router();
const pool = require("../db");

// Register
router.post("/register", async (req, res) => {
  const { name, email, password, role } = req.body;

  const result = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, role",
    [name, email, password, role]
  );

  res.json(result.rows[0]);
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const result = await pool.query(
    "SELECT * FROM users WHERE email=$1",
    [email]
  );

  if (result.rows.length === 0) {
    return res.status(401).json({ message: "User not found" });
  }

  const user = result.rows[0];

  if (user.password !== password) {
    return res.status(401).json({ message: "Invalid password" });
  }

  res.json({
    userId: user.id,
    role: user.role,
  });
});

module.exports = router;