import { useEffect, useState } from "react";
import { getDoctors, addDoctor, deleteDoctor } from "../api/api";

function ManageDoctors() {
  const [doctors, setDoctors] = useState([]);
  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const data = await getDoctors();
    setDoctors(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    await addDoctor({ name, specialization });
    setName("");
    setSpecialization("");
    fetchDoctors();
  };

  const handleDelete = async (id) => {
    await deleteDoctor(id);
    fetchDoctors();
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4">Manage Doctors</h3>

      {/* Add Doctor Form */}
      <div className="card p-4 mb-4">
        <h5 className="mb-3">Add New Doctor</h5>

        <form onSubmit={handleAdd} className="row g-3">
          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-5">
            <input
              className="form-control"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>

          <div className="col-md-2">
            <button className="btn btn-primary w-100">Add</button>
          </div>
        </form>
      </div>

      {/* Doctors Table */}

      <div className="card p-4">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Specialization</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.name}</td>
                <td>{doc.specialization}</td>
                <td>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(doc.id)}
                  >
                    Delete
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

export default ManageDoctors;
