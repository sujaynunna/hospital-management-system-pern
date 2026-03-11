import { Link, useNavigate } from "react-router-dom";
import "../App.css";
function Navbar() {
  const navigate = useNavigate();

  const logout = () => {
    sessionStorage.clear();
    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark shadow sticky-top" >
  <div className="container d-flex justify-content-between align-items-center">
    
    {/* 1. BRAND - Left Side */}
    <Link className="navbar-brand d-flex align-items-center" to="/" style={{ margin: 0 }}>
      <span style={{ color: "green", fontWeight: "bold", fontSize: "1.5rem" }}>
        Medi Link
      </span>
    </Link>

    {/* 2. LINKS - Center/Middle */}
    <div className="navbar-nav flex-row flex-nowrap gap-4 align-items-center">
      <Link className="nav-link px-2" to="/login" style={{ color: "yellow", fontWeight: "bold" }}>
        Login
      </Link>
      <Link className="nav-link px-2" to="/register" style={{ color: "yellow", fontWeight: "bold" }}>
        Register
      </Link>
      <Link className="nav-link px-2" to="/patient" style={{ color: "yellow", fontWeight: "bold" }}>
        Patient
      </Link>
      <Link className="nav-link px-2" to="/doctor" style={{ color: "yellow", fontWeight: "bold" }}>
        Doctor
      </Link>
      <Link className="nav-link px-2" to="/manage-doctors" style={{ color: "yellow", fontWeight: "bold" }}>
        manage
      </Link>
      <Link className="nav-link px-2" to="/bills" style={{ color: "yellow", fontWeight: "bold" }}>
        bills
      </Link>
       <Link className="nav-link px-2" to="/payments" style={{ color: "yellow", fontWeight: "bold" }}>
        payments
      </Link>
       <Link className="nav-link px-2" to="/admin" style={{ color: "yellow", fontWeight: "bold" }}>
        admin
      </Link>
    </div>

    {/* 3. BUTTON - Right Side */}
    <button onClick={logout} className="btn btn-danger btn-sm px-4 shadow-sm">
     <b>Logout</b> 
    </button>
    
  </div>
</nav>
  );
}

export default Navbar;
