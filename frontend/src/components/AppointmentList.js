import React from "react";

function AppointmentList({ appointments }) {

  if (!appointments || appointments.length === 0) {
    return <p>No appointments found</p>;
  }

  return (

    <div className="list-group">

      {appointments.map((app) => (

        <div key={app.id} className="list-group-item mb-2">

          <p><b>Doctor:</b> {app.doctor_name}</p>
          <p><b>Date:</b> {new Date(app.appointment_date).toLocaleDateString()}</p>
          <p><b>Status:</b> {app.status}</p>

        </div>

      ))}

    </div>

  );

}

export default AppointmentList;