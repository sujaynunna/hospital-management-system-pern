import { useEffect, useState } from "react";
import { getMedicalRecords } from "../api/api";

function MedicalRecords() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    const userId=sessionStorage.getItem("userId");
    const data = await getMedicalRecords(userId);
    setRecords(data);
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Medical Records</h3>

      <div className="card p-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Record ID</th>
              <th>Diagnosis</th>
              <th>Symptoms</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {records.map((rec) => (
              <tr key={rec.id}>
                <td>{rec.id}</td>
                <td>{rec.diagnosis}</td>
                <td>{rec.symptoms}</td>
                <td>{rec.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MedicalRecords;
