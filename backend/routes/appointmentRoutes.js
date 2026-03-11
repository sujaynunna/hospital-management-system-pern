const express = require("express");
const router = express.Router();
const pool = require("../db");

// Get appointments for patient
router.get("/:userId", async (req,res)=>{
  try{
      const fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
console.log(fullUrl); 

    const { userId } = req.params;

    const result = await pool.query(
      "SELECT * FROM appointments WHERE patient_id=$1",
      [userId]
    );

    res.json(result.rows);

  }catch(err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

// patient Books appointment
router.post("/", async (req,res)=>{
  try{

    const { patientId, doctorId, time, date } = req.body;

    const result = await pool.query(
      "INSERT INTO appointments (patient_id, doctor_id, appointment_date,appointment_time, status) VALUES ($1,$2,$3,'Pending') RETURNING *",
      [patientId, doctorId, date , time]
    );

    res.json(result.rows[0]);

  }catch(err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

// doctor Updates appointment status
router.put("/:id", async (req,res)=>{
  try{

    const { status } = req.body;
    const { id } = req.params;

    const result = await pool.query(
      "UPDATE appointments SET status=$1 WHERE id=$2 RETURNING *",
      [status, id]
    );

    res.json(result.rows[0]);

  }catch(err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

// Get appointments for doctor
router.get("/doctor/:doctorId", async (req,res)=>{
  try{

    const { doctorId } = req.params;

    const result = await pool.query(
      "SELECT * FROM appointments WHERE doctor_id=$1",
      [doctorId]
    );

    res.json(result.rows);

  }catch(err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

module.exports = router;