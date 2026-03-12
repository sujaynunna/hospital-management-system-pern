import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/api";

function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");



  const handleLogin = async (e) => {

    e.preventDefault();

    setError(""); // clear previous error

    try {

      const data = await loginUser({ email, password });

      // Validate backend response
      if (!data || !data.userId || !data.role) {
        throw new Error("Invalid serverrr response");
      }

      // Save login info
      sessionStorage.setItem("userId", data.userId);
      sessionStorage.setItem("role", data.role);

      console.log("Logged in user:", data);

      // Navigate based on role
      if (data.role === "patient") {
        navigate("/patient");
      } 
      else if (data.role === "doctor") {
        navigate("/doctor");
      } 
      else if (data.role === "admin") {
        navigate("/admin");
      }

    } catch (err) {

      console.error("Login error:", err);
      setError(err.message || "Login failed");

    }

  };



  return (

    <div className="container d-flex justify-content-center align-items-center vh-100">

      <div className="card shadow-lg p-4" style={{ width: "400px" }}>

        <h3 className="text-center mb-4">Login</h3>

        {error && <div className="alert alert-danger">{error}</div>}


        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label">Email  Address</label>

            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

          </div>


          <div className="mb-4">

            <label className="form-label">Password</label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

          </div>


          <button className="btn btn-primary w-100 mb-4">
            Login
          </button>


          <p className="text-center">
            Don't have an account?{" "}
            <Link to="/register" className="text-decoration-none">
              Register
            </Link>
          </p>

        </form>

      </div>

    </div>

  );

}

export default Login;