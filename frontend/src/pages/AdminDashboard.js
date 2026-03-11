import { useEffect, useState, useCallback } from "react";
import { getAppointments } from "../api/api";

function AdminDashboard() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. Wrapped in useCallback to prevent the infinite loop/dependency warning
  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getAppointments();
      // 2. Added fallback to empty array to prevent .map() crashes
      setAppointments(data || []);
    } catch (err) {
      console.error("Admin fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]); // 3. Included fetchAppointments as a stable dependency

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Admin Dashboard</h2>
      
      {/* 4. Added Loading State for better UX */}
      {loading ? (
        <div className="d-flex justify-content-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : appointments.length > 0 ? (
        <div className="row">
          {appointments.map((appt) => (
            <div key={appt.id} className="col-md-6 col-lg-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title border-bottom pb-2">Appointment #{appt.id}</h5>
                  <p className="card-text">
                    <strong>Patient ID:</strong> {appt.patient_id} <br />
                    <strong>Doctor ID:</strong> {appt.doctor_id} <br />
                    <strong>Status:</strong> 
                    <span className={`ms-2 badge ${
                      appt.status === 'completed' ? 'bg-success' : 
                      appt.status === 'pending' ? 'bg-warning text-dark' : 'bg-secondary'
                    }`}>
                      {appt.status}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* 5. Added Empty State */
        <div className="alert alert-info">
          No appointments found in the system.
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;