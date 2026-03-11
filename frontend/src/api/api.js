export const API_URL = "http://localhost:5000";

/* ================= AUTH ================= */

export const loginUser = async (credentials) => {
  const response = await fetch(`${API_URL}/auth/login`, {
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

export const registerUser = async (data) => {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return response.json();
};

/* ================= APPOINTMENTS ================= */

export const getAppointments = async (userId) => {
  const res = await fetch(`${API_URL}/appointments/${userId}`);
  return res.json();
};

export const getDoctorAppointments = async (userId) => {
  const res = await fetch(`${API_URL}/appointments/doctor/${userId}`);
  return res.json();
};

export const bookAppointment = async (data) => {
  const res = await fetch(`${API_URL}/appointments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const updateAppointment = async (id, status) => {
  const res = await fetch(`${API_URL}/appointments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ status }),
  });

  return res.json();
};

/* ================= MEDICAL ================= */

export const getMedicalRecords = async (userId) => {
  const res = await fetch(`${API_URL}/medical-records/${userId}`);
  return res.json();
};

/* ================= PRESCRIPTIONS ================= */

export const getPrescriptions = async (userId) => {
  const res = await fetch(`${API_URL}/prescriptions/${userId}`);
  return res.json();
};

/* ================= LAB TESTS ================= */

export const getLabTests = async (userId) => {
  const res = await fetch(`${API_URL}/lab-tests/${userId}`);
  return res.json();
};

/* ================= BILLS ================= */

export const getBills = async (userId) => {
  const res = await fetch(`${API_URL}/bills/${userId}`);
  return res.json();
};

export const makePayment = async (billId, amount) => {
  const res = await fetch(`${API_URL}/bills/payments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ billId, amount }),
  });

  return res.json();
};

/* ================= DOCTORS ================= */

export const getDoctors = async () => {
  const res = await fetch(`${API_URL}/doctors`);
  return res.json();
};

export const addDoctor = async (data) => {
  const res = await fetch(`${API_URL}/doctors`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return res.json();
};

export const deleteDoctor = async (id) => {
  const res = await fetch(`${API_URL}/doctors/${id}`, {
    method: "DELETE",
  });

  return res.json();
};