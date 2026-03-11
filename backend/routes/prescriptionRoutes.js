const express = require("express");
const router = express.Router();
const pool = require("../db");

router.get("/:userId", async (req,res)=>{
  try{

    const { userId } = req.params;

    const result = await pool.query(
      `SELECT pr.*
       FROM prescriptions pr
       JOIN medicalrecords mr ON pr.record_id = mr.id
       JOIN appointments a ON mr.appointment_id = a.id
       JOIN patients p ON a.patient_id = p.id
       WHERE p.user_id=$1`,
      [userId]
    );

    res.json(result.rows);

  }catch(err){
    console.error(err);
    res.status(500).json({error:"Server error"});
  }
});

module.exports = router;