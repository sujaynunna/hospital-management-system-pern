import { useState } from "react";
import { bookAppointment } from "../api/api";

function AppointmentForm({ refresh }) {
  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const[time , setTime]=useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await bookAppointment({ patientId:localStorage.getItem("userId"),doctorId,time, date });
    setDoctorId("");
    setDate("");
    setTime("");
    refresh();
  };

  return (
    <div className="card p-4 mb-4">
      

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Doctor ID</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter Doctor ID"
            value={doctorId}
            onChange={(e) => setDoctorId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Appointment Date</label>
          <input
            type="date"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
         <div className="mb-3">
          <label className="form-label">Appointment Time</label>
          <input
            type="time"
            className="form-control"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <button className="btn btn-primary">Book Appointment</button>
      </form>
    </div>
  );
}

export default AppointmentForm;
