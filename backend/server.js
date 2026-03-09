require("dotenv").config();    // process.env is global for the entrie node process so every file can access it
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// Import routes
app.use("/auth", require("./routes/authRoutes"));
app.use("/appointments", require("./routes/appointmentRoutes"));
app.use("/medical-records", require("./routes/medicalRoutes"));
app.use("/prescriptions", require("./routes/prescriptionRoutes"));
app.use("/lab-tests", require("./routes/labRoutes"));
app.use("/bills", require("./routes/billingRoutes"));
app.use("/doctors", require("./routes/doctorRoutes"));

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});