import { updateAppointment } from "../api/api";

function AppointmentList({ appointments, isDoctor, refresh }) {

  if (!appointments || appointments.length === 0) {
    return <p>No appointments found</p>;
  }

  const handleComplete = async (id) => {

    await updateAppointment(id, "completed");

    if (refresh) refresh();

  };

  return (

    <div className="list-group">

      {appointments.map((app) => (

        <div key={app.id} className="list-group-item mb-2">

          {isDoctor ? (

            <>
              <p><b>Patient:</b> {app.patient_name}</p>
              <p><b>Date:</b> {new Date(app.appointment_date).toLocaleDateString()}</p>
              <p><b>Status:</b> {app.status}</p>

              {app.status !== "completed" && (
                <button
                  className="btn btn-success"
                  onClick={() => handleComplete(app.id)}
                >
                  Mark Completed
                </button>
              )}
            </>

          ) : (

            <>
              <p><b>Doctor:</b> {app.doctor_name}</p>
              <p><b>Date:</b> {new Date(app.appointment_date).toLocaleDateString()}</p>
              <p><b>Status:</b> {app.status}</p>
            </>

          )}

        </div>

      ))}

    </div>

  );

}

export default AppointmentList;