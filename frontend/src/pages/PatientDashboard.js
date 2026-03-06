import { useEffect, useState } from "react";
import { getAppointments } from "../api/api";
import AppointmentForm from "../components/AppointmentForm";
import AppointmentList from "../components/AppointmentList";

function PatientDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    const data = await getAppointments();
    setAppointments(data);
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Patient Dashboard</h2>

      <div className="row">
        <div className="col-md-5">
          <AppointmentForm refresh={fetchAppointments} />
        </div>

        <div className="col-md-7">
          <AppointmentList appointments={appointments} />
        </div>
      </div>
    </div>
  );
}

export default PatientDashboard;
