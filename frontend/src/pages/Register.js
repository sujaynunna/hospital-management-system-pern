import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/api";

function Register() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
role: "patient",
});

const [error, setError] = useState("");

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value,
});
};

const handleRegister = async (e) => {
e.preventDefault();

try {
  await registerUser(formData);
  navigate("/login");
} catch {
  setError("Registration failed");
}

};

return (
<div className="container mt-5">
<div className="row justify-content-center">
<div className="col-md-5">

      <div className="card shadow-lg">
        <div className="card-body p-4">

          <h3 className="text-center mb-4">Create Account</h3>

          {error && (
            <div className="alert alert-danger">
              {error}
            </div>
          )}

          <form onSubmit={handleRegister}>

            <div className="mb-3">
              <label className="form-label">Full Name</label>
              <input
                name="name"
                className="form-control"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Email Address</label>
              <input
                name="email"
                type="email"
                className="form-control"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Select Role</label>
              <select
                name="role"
                className="form-select"
                value={formData.role}
                onChange={handleChange}
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <button className="btn btn-success w-100">
              Register
            </button>

          </form>

        </div>
      </div>

    </div>
  </div>
</div>

);
}

export default Register;