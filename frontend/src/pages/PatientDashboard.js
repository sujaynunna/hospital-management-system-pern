import { useEffect, useState, useCallback } from "react";
import {
  getAppointments,
  getMedicalRecords,
  getPrescriptions,
  getLabTests,
  getBills
} from "../api/api";

import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [records, setRecords] = useState([]);
  const [prescriptions, setPrescriptions] = useState([]);
  const [labTests, setLabTests] = useState([]);
  const [bills, setBills] = useState([]);

  const userId = localStorage.getItem("userId");

  // Use useCallback to prevent infinite loops and satisfy ESLint
  const fetchAppointments = useCallback(async () => {
    try {
      const data = await getAppointments(userId);
      setAppointments(data || []); // Fallback to empty array
    } catch (err) {
      console.error("Failed to fetch appointments", err);
    }
  }, [userId]);

  const fetchRecords = useCallback(async () => {
    try {
      const data = await getMedicalRecords(userId);
      setRecords(data || []);
    } catch (err) {
      console.error("Failed to fetch records", err);
    }
  }, [userId]);

  const fetchPrescriptions = useCallback(async () => {
    try {
      const data = await getPrescriptions(userId);
      setPrescriptions(data || []);
    } catch (err) {
      console.error("Failed to fetch prescriptions", err);
    }
  }, [userId]);

  const fetchLabTests = useCallback(async () => {
    try {
      const data = await getLabTests(userId);
      setLabTests(data || []);
    } catch (err) {
      console.error("Failed to fetch lab tests", err);
    }
  }, [userId]);

  const fetchBills = useCallback(async () => {
    try {
      const data = await getBills(userId);
      setBills(data || []);
    } catch (err) {
      console.error("Failed to fetch bills", err);
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchAppointments();
      fetchRecords();
      fetchPrescriptions();
      fetchLabTests();
      fetchBills();
    }
  }, [userId, fetchAppointments, fetchRecords, fetchPrescriptions, fetchLabTests, fetchBills]);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Patient Dashboard</h2>

      <div className="card p-3 mb-4">
        <h4>Book Appointment</h4>
        <AppointmentForm refresh={fetchAppointments} />
      </div>

      <div className="card p-3 mb-4">
        <h4>My Appointments</h4>
        <AppointmentList appointments={appointments} />
      </div>

      <div className="card p-3 mb-4">
        <h4>Medical Records</h4>
        {/* Added check to ensure data exists before mapping */}
        {records?.length > 0 ? (
          records.map((rec) => (
            <div key={rec.id}>
              <p><b>Diagnosis:</b> {rec.diagnosis}</p>
              <p><b>Symptoms:</b> {rec.symptoms}</p>
              <p><b>Notes:</b> {rec.notes}</p>
              <hr/>
            </div>
          ))
        ) : <p>No records found.</p>}
      </div>
      {/* Prescriptions */}
      <div className="card p-3 mb-4">
        <h4>Prescriptions</h4>
        {prescriptions?.length > 0 ? (
          prescriptions.map((pre) => (
            <div key={pre.id}>
              <p><b>Record ID:</b> {pre.record_id}</p>
              <p><b>Follow-up Date:</b> {pre.follow_up_date}</p>
              <hr/>
            </div>
          ))
        ) : (
          <p className="text-muted">No prescriptions found.</p>
        )}
      </div>

      {/* Lab Tests */}
      <div className="card p-3 mb-4">
        <h4>Lab Tests</h4>
        {labTests?.length > 0 ? (
          labTests.map((test) => (
            <div key={test.id}>
              <p><b>Test:</b> {test.test_name}</p>
              <p><b>Status:</b> {test.status}</p>
              <p><b>Report:</b> {test.report_url}</p>
              <hr/>
            </div>
          ))
        ) : (
          <p className="text-muted">No lab tests found.</p>
        )}
      </div>

      {/* Bills */}
      <div className="card p-3 mb-4">
        <h4>Bills</h4>
        {bills?.length > 0 ? (
          bills.map((bill) => (
            <div key={bill.id}>
              <p><b>Bill ID:</b> {bill.id}</p>
              <p><b>Total:</b> ₹{bill.total_amount}</p>
              <p><b>Status:</b> {bill.status}</p>
              <p><b>Paid:</b> ₹{bill.amount_paid}</p>
              <p><b>Remaining:</b> ₹{bill.amount_left}</p>
              <hr/>
            </div>
          ))
        ) : (
          <p className="text-muted">No pending or past bills found.</p>
        )}
      </div>
      {/* Repeat similar conditional rendering for Prescriptions, Lab Tests, and Bills */}
      
    </div>
  );
}

export default PatientDashboard;