import { useEffect, useState } from "react";
import { getAppointments } from "../api/api";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };

  return (
    <div>
      <h2>Admin Dashboard</h2>
      {appointments.map((appt) => (
        <div key={appt.id}>
          <p>Patient: {appt.patient_id}</p>
          <p>Doctor: {appt.doctor_id}</p>
          <p>Status: {appt.status}</p>
        </div>
      ))}
    </div>
  );
}

export default AdminDashboard;