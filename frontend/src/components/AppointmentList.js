function AppointmentList({ appointments }) {
return (
<div className="card p-4">
<h4 className="mb-3">My Appointments</h4>

  <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th>Doctor ID</th>
        <th>Date</th>
        <th>Status</th>
      </tr>
    </thead>

    <tbody>
      {appointments.map((appt) => (
        <tr key={appt.id}>
          <td>{appt.doctor_id}</td>
          <td>{appt.appointment_date}</td>
          <td>
            <span className="badge bg-success">
              {appt.status}
            </span>
          </td>
        </tr>
      ))}
    </tbody>

  </table>
</div>

);
}

export default AppointmentList;