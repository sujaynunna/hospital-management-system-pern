import { useEffect, useState } from "react";
import { getDoctorAppointments, updateAppointment } from "../api/api";

function DoctorDashboard() {

  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const doctorId = sessionStorage.getItem("userId");
    const data = await getDoctorAppointments(doctorId);
    setAppointments(data);
  };

  const handleUpdate = async (id) => {
    await updateAppointment(id, "Completed");
    fetchAppointments();
  };

  return (
    <div className="container mt-4">

      <h2 className="mb-4">Doctor Dashboard</h2>
<div className="card p-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Appointment ID</th>
              <th>Patient ID</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
      {appointments.map((appt) => (
        <div key={appt.id} className="card p-3 mb-3">

          <p><b>Patient ID:</b> {appt.patient_id}</p>
          <p><b>Date:</b> {appt.appointment_date}</p>
          <p><b>Status:</b> {appt.status}</p>

          <button
            className="btn btn-success"
            onClick={() => handleUpdate(appt.id)}
          >
            Mark Completed
          </button>

        </div>
      ))}
      </tbody>
      </table>

    </div>
    </div>
  );
}

export default DoctorDashboard;
