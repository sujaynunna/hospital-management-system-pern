import { useEffect, useState } from "react";
import { getDoctors, addDoctor, deleteDoctor } from "../api/api";

function ManageDoctors() {

  const [doctors, setDoctors] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [experience_years, setExperience] = useState("");
  const [consultation_fee, setFee] = useState("");

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    const data = await getDoctors();
    setDoctors(data);
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    await addDoctor({
      name,
      email,
      password,
      specialization,
      experience_years: parseInt(experience_years),   // ✅ parse here
    consultation_fee: parseFloat(consultation_fee) 
    });

    setName("");
    setEmail("");
    setPassword("");
    setSpecialization("");
    setExperience("");
    setFee("");

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

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Doctor Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Specialization"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Experience (years)"
              value={experience_years}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="number"
              className="form-control"
              placeholder="Consultation Fee"
              value={consultation_fee}
              onChange={(e) => setFee(e.target.value)}
              required
            />
          </div>

          <div className="col-md-12">
            <button className="btn btn-primary w-100">Add Doctor</button>
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
              <th>Email</th>
              <th>Specialization</th>
              <th>Experience</th>
              <th>Fee</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>

            {doctors.map((doc) => (
              <tr key={doc.id}>
                <td>{doc.id}</td>
                <td>{doc.name}</td>
                <td>{doc.email}</td>
                <td>{doc.specialization}</td>
                <td>{doc.experience_years}</td>
                <td>₹{doc.consultation_fee}</td>

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