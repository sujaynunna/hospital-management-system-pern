import { useState, useEffect } from "react";
import { bookAppointment, getDoctors } from "../api/api";

function AppointmentForm({ refresh }) {

  const [doctorId, setDoctorId] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [doctors, setDoctors] = useState([]);

  const userId = localStorage.getItem("userId");

  useEffect(() => {

    const fetchDoctors = async () => {
      const data = await getDoctors();
      setDoctors(data);
    };

    fetchDoctors();

  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();

    await bookAppointment({
      patientId: userId,
      doctorId,
      date,
      time
    });

    setDoctorId("");
    setDate("");
    setTime("");

    refresh();

  };

  return (

    <form onSubmit={handleSubmit}>

      <div className="mb-3">
        <label>Select Doctor</label>

        <select
          className="form-control"
          value={doctorId}
          onChange={(e) => setDoctorId(e.target.value)}
          required
        >
          <option value="">Choose Doctor</option>

          {doctors.map((doc) => (

            <option key={doc.id} value={doc.id}>
              {doc.name} - {doc.specialization}
            </option>

          ))}

        </select>
      </div>

      <div className="mb-3">
        <label>Date</label>

        <input
          type="date"
          className="form-control"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label>Time</label>

        <input
          type="time"
          className="form-control"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          required
        />
      </div>

      <button className="btn btn-primary">
        Book Appointment
      </button>

    </form>

  );

}

export default AppointmentForm;