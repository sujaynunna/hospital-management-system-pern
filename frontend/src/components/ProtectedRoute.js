import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, role }) {

  const userRole = sessionStorage.getItem("role");

  // If not logged in
  if (!userRole) {
    return <Navigate to="/login" />;
  }

  // If wrong role tries to access page
  if (role && userRole !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default ProtectedRoute;