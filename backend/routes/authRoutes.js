const express = require("express");
const router = express.Router();
const pool = require("../db");


// =========================
// REGISTER
// =========================
router.post("/register", async (req, res) => {

  try {

    const { name, email, password, role } = req.body;

    const result = await pool.query(
      "INSERT INTO users (name, email, password, role) VALUES ($1,$2,$3,$4) RETURNING id, role",
      [name, email, password, role]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Registration failed" });
  }

});


// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    const result = await pool.query(
      "SELECT * FROM users WHERE email=$1",
      [email]
    );

    // user not found
    if (result.rows.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = result.rows[0];

    // password incorrect
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // success
    res.json({
      userId: user.id,
      role: user.role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Login failed" });
  }

});

module.exports = router;