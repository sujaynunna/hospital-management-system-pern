import "../home.css";
import { Link } from "react-router-dom";
function Home() {
return (
<div className="home-container">

  <div className="home-content">
    <h1 style={{color:"yellow",fontWeight:"bold"}}>Hospital Management System</h1>
    <p style={{color:"pink",fontWeight:"pinkbold"}}>Book appointments and manage your medical records easily.</p>

    <div className="mt-3">
      <a href="/login" target="_blank" className="btn btn-primary me-3">
        Login
      </a>

      <Link to="/register" className="btn btn-success">
        Register
      </Link>
    </div>
  </div>

</div>

);
}

export default Home;