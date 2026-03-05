import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import PatientDashboard from "./pages/PatientDashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import MedicalRecords from "./pages/MedicalRecords";
import Prescriptions from "./pages/Prescriptions";
import LabTests from "./pages/LabTests";
import Bills from "./pages/Bills";
import ManageDoctors from "./pages/ManageDoctors";

function App() {
  return (
    <Router>
      <Navbar />
<Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/patient"
          element={
            
              <PatientDashboard />
            
          }
        />

        <Route
          path="/doctor"
          element={
            
              <DoctorDashboard />
            
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="/medical-records" element={<MedicalRecords />} />
        <Route path="/prescriptions" element={<Prescriptions />} />
        <Route path="/lab-tests" element={<LabTests />} />
        <Route path="/bills" element={<Bills />} />
        <Route path="/manage-doctors" element={<ManageDoctors />} />
      </Routes>
    </Router>
  );
}

export default App;
