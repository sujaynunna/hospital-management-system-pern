// Base URL of backend server
export const API_URL = "http://localhost:5000";

/* ================= AUTH ================= */

// Login user
export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

// Register new user
export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};

/* ================= APPOINTMENTS ================= */

// Get appointments for a patient
export const getAppointments = async (userId) => {
  const response = await fetch(`${API_URL}/appointments/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch appointments");
  }

  return response.json();
};

// Get appointments for a doctor
export const getDoctorAppointments = async (doctorId) => {
  const response = await fetch(`${API_URL}/appointments/doctor/${doctorId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch doctor appointments");
  }

  return response.json();
};

// Book new appointment
export const bookAppointment = async (data) => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to book appointment");
  }

  return response.json();
};

// Update appointment status
export const updateAppointment = async (id, status) => {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });

  if (!response.ok) {
    throw new Error("Failed to update appointment");
  }

  return response.json();
};

/* ================= MEDICAL RECORDS ================= */

// Get medical records for patient
export const getMedicalRecords = async (userId) => {
  const response = await fetch(`${API_URL}/medical-records/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch medical records");
  }

  return response.json();
};

/* ================= PRESCRIPTIONS ================= */

// Get prescriptions for patient
export const getPrescriptions = async (userId) => {
  const response = await fetch(`${API_URL}/prescriptions/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch prescriptions");
  }

  return response.json();
};

/* ================= LAB TESTS ================= */

// Get lab tests for patient
export const getLabTests = async (userId) => {
  const response = await fetch(`${API_URL}/lab-tests/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch lab tests");
  }

  return response.json();
};

/* ================= BILLING ================= */

// Get bills for patient
export const getBills = async (userId) => {
  const response = await fetch(`${API_URL}/bills/${userId}`);

  if (!response.ok) {
    throw new Error("Failed to fetch bills");
  }

  return response.json();
};

// Make payment
export const makePayment = async (data) => {
  const response = await fetch(`${API_URL}/bills/payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Payment failed");
  }

  return response.json();
};

/* ================= DOCTORS ================= */

// Get all doctors
export const getDoctors = async () => {

  const response = await fetch(`${API_URL}/doctors`);

  if (!response.ok) {
    throw new Error("Failed to fetch doctors");
  }

  return response.json();
};

// Add new doctor
export const addDoctor = async (data) => {
  const response = await fetch(`${API_URL}/doctors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add doctor");
  }

  return response.json();
};

// Delete doctor
export const deleteDoctor = async (id) => {
  const response = await fetch(`${API_URL}/doctors/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete doctor");
  }

  return true;
};
