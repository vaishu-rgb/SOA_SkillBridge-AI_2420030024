const API_BASE_URL = "https://localhost:8443";

function getToken() {
  return localStorage.getItem("token");
}

async function apiRequest(url, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url, {
    ...options,
    headers,
  });

  if (!response.ok) {
  const errorText = await response.text();
  throw new Error(
    `Request failed: ${response.status} ${errorText}`
  );
}

  return response.json();
}

export async function loginUser(email, password) {
  return apiRequest(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export async function getUsers() {
  return apiRequest(`${API_BASE_URL}/api/users`);
}

export async function getSkills() {
  return apiRequest(`${API_BASE_URL}/api/skills`);
}

export async function getCareers() {
  return apiRequest(`${API_BASE_URL}/api/careers`);
}

export async function getPlans() {
  return apiRequest(`${API_BASE_URL}/api/plans`);
}

export async function getOpportunities() {
  return apiRequest(`${API_BASE_URL}/api/opportunities`);
}