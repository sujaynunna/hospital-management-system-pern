import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Payments  from "./components/Payments";
//import { Navigate } from "react-router-dom";
//<Route path="/" element={<Navigate to="/login" />} /> 
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
import Home from "./pages/Home.js";
function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<><Login /><Payments/></>}></Route>
        <Route path="/register" element={<Register />} />
        
        <Route
          path="/patient"
          element={
             <ProtectedRoute role="patient"><PatientDashboard /></ProtectedRoute>
              
            
          }
        />

        <Route
          path="/doctor"
          element={
             <ProtectedRoute role="doctor"><DoctorDashboard /></ProtectedRoute>
              
            
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
        <Route path="/payments" element={<Payments />} />
      </Routes>
    </Router>
  );
}

export default App;
