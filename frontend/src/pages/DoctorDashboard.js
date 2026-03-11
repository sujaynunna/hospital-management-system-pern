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
    await updateAppointment(id, "completed");
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
              <th>Patient Name</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt) => (
              <tr key={appt.id}>
                <td>{appt.id}</td>
                <td>{appt.patient_id}</td>
                <td>{appt.patient_name}</td>
                <td>{new Date(appt.appointment_date).toLocaleDateString()}</td>
                <td>
                  <span className={`badge ${appt.status === "completed" ? "bg-success" : "bg-warning text-dark"}`}>
                    {appt.status}
                  </span>
                </td>
                <td>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleUpdate(appt.id)}
                    disabled={appt.status === "completed"}
                  >
                    Mark Completed
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DoctorDashboard;