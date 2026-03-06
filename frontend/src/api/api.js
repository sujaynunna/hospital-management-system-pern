export const API_URL = "http://localhost:5000";

/* ================= AUTH ================= */

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Login failed");
  }

  return response.json();
};

export const registerUser = async (userData) => {
  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || "Registration failed");
  }

  return response.json();
};

/* ================= APPOINTMENTS ================= */

export const getAppointments = async () => {
  const response = await fetch(`${API_URL}/appointments`);
  return response.json();
};

export const bookAppointment = async (data) => {
  const response = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const updateAppointment = async (id, status) => {
  const response = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });
  return response.json();
};

/* ================= MEDICAL RECORDS ================= */

export const getMedicalRecords = async () => {
  const response = await fetch(`${API_URL}/medical-records`);
  return response.json();
};

/* ================= PRESCRIPTIONS ================= */

export const getPrescriptions = async () => {
  const response = await fetch(`${API_URL}/prescriptions`);
  return response.json();
};

/* ================= LAB TESTS ================= */

export const getLabTests = async (userId) => {
  const response = await fetch(`${API_URL}/lab-tests/${userId}`);
  return response.json();
};

/* ================= BILLING ================= */

export const getBills = async () => {
  const response = await fetch(`${API_URL}/bills`);
  return response.json();
};

export const makePayment = async (data) => {
  const response = await fetch(`${API_URL}/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

/* ================= DOCTORS ================= */

export const getDoctors = async () => {
  const response = await fetch(`${API_URL}/doctors`);
  return response.json();
};

export const addDoctor = async (data) => {
  const response = await fetch(`${API_URL}/doctors`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return response.json();
};

export const deleteDoctor = async (id) => {
  await fetch(`${API_URL}/doctors/${id}`, {
    method: "DELETE",
  });
};
