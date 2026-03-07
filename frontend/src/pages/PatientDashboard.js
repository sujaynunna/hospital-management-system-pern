import { useEffect, useState } from "react";

import { getAppointments, getMedicalRecords, getPrescriptions, getLabTests, getBills } from "../api/api";

import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";

function PatientDashboard() {

const [appointments, setAppointments] = useState([]);
const [records, setRecords] = useState([]);
const [prescriptions, setPrescriptions] = useState([]);
const [labTests, setLabTests] = useState([]);
const [bills, setBills] = useState([]);

useEffect(() => {
fetchAppointments();
fetchRecords();
fetchPrescriptions();
fetchLabTests();
fetchBills();
}, []);

const fetchAppointments = async () => {
const userId = localStorage.getItem("userId");
const data = await getAppointments(userId);
setAppointments(data);
};

const fetchRecords = async () => {
const userId = localStorage.getItem("userId");
const data = await getMedicalRecords(userId);
setRecords(data);
};

const fetchPrescriptions = async () => {
const userId = localStorage.getItem("userId");
const data = await getPrescriptions(userId);
setPrescriptions(data);
};

const fetchLabTests = async () => {
const userId = localStorage.getItem("userId");
const data = await getLabTests(userId);
setLabTests(data);
};

const fetchBills = async () => {
const userId = localStorage.getItem("userId");
const data = await getBills(userId);
setBills(data);
};

return (
<div className="container mt-4">

  <h2 className="mb-4">Patient Dashboard</h2>

  {/* Appointment Booking */}
  <div className="card p-3 mb-4">
    <h4>Book Appointment</h4>
    <AppointmentForm refresh={fetchAppointments} />
  </div>

  {/* Appointments */}
  <div className="card p-3 mb-4">
    <h4>My Appointments</h4>
    <AppointmentList appointments={appointments} />
  </div>

  {/* Medical Records */}
  <div className="card p-3 mb-4">
    <h4>Medical Records</h4>
    {records.map((rec) => (
      <div key={rec.id}>
        <p><b>Diagnosis:</b> {rec.diagnosis}</p>
        <p><b>Symptoms:</b> {rec.symptoms}</p>
        <p><b>Notes:</b> {rec.notes}</p>
        <hr/>
      </div>
    ))}
  </div>

  {/* Prescriptions */}
  <div className="card p-3 mb-4">
    <h4>Prescriptions</h4>
    {prescriptions.map((pre) => (
      <div key={pre.id}>
        <p><b>Record ID:</b> {pre.record_id}</p>
        <p><b>Follow-up Date:</b> {pre.follow_up_date}</p>
        <hr/>
      </div>
    ))}
  </div>

  {/* Lab Tests */}
  <div className="card p-3 mb-4">
    <h4>Lab Tests</h4>
    {labTests.map((test) => (
      <div key={test.id}>
        <p><b>Test:</b> {test.test_name}</p>
        <p><b>Status:</b> {test.status}</p>
        <p><b>Report:</b> {test.report_url}</p>
        <hr/>
      </div>
    ))}
  </div>

  {/* Bills */}
  <div className="card p-3 mb-4">
    <h4>Bills</h4>
    {bills.map((bill) => (
      <div key={bill.id}>
        <p><b>Bill ID:</b> {bill.id}</p>
        <p><b>Amount:</b> ₹{bill.total_amount}</p>
        <p><b>Status:</b> {bill.status}</p>
        <hr/>
      </div>
    ))}
  </div>

</div>

);
}

export default PatientDashboard;