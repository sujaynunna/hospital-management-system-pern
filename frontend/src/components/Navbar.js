import { Link, useNavigate } from "react-router-dom";

function Navbar() {
const navigate = useNavigate();

const logout = () => {
localStorage.clear();
navigate("/login");
};

return (
<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
<div className="container">

    <Link className="navbar-brand" to="/">
      Hospital System
    </Link>

    <div className="navbar-nav">

      <Link className="nav-link" to="/login">
        Login
      </Link>

      <Link className="nav-link" to="/register">
        Register
      </Link>

      <Link className="nav-link" to="/patient">
        Patient
      </Link>

      <Link className="nav-link" to="/doctor">
        Doctor
      </Link>

    </div>

    <button onClick={logout} className="btn btn-danger">
      Logout
    </button>

  </div>
</nav>

);
}

export default Navbar;