import { useEffect, useState } from "react";
import { getPrescriptions } from "../api/api";

function Prescriptions() {
  const [prescriptions, setPrescriptions] = useState([]);

  useEffect(() => {
    fetchPrescriptions();
  }, []);

  const fetchPrescriptions = async () => {
    const userId=sessionStorage.getItem("userId");
    const data = await getPrescriptions(userId);
    setPrescriptions(data);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Prescriptions</h3>

      <div className="card p-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Prescription ID</th>
              <th>Record ID</th>
              <th>Follow Up Date</th>
            </tr>
          </thead>

          <tbody>
            {prescriptions.map((pre) => (
              <tr key={pre.id}>
                <td>{pre.id}</td>
                <td>{pre.record_id}</td>
                <td>{pre.follow_up_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Prescriptions;
