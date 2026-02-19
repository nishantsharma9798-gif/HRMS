import axios from 'axios';

const resolveApiBaseUrl = () => {
  const configured = import.meta.env.VITE_API_BASE_URL;
  if (configured) return configured;

  if (typeof window !== 'undefined') {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (isLocalhost) return 'http://localhost:8000/api';
  }

  // Production-safe fallback for reverse proxy setups.
  return '/api';
};

const api = axios.create({
  baseURL: resolveApiBaseUrl(),
  timeout: 10000,
});

export const getEmployees = () => api.get('/employees/');
export const createEmployee = (payload) => api.post('/employees/', payload);
export const deleteEmployee = (id) => api.delete(`/employees/${id}/`);

export const getAttendance = (employeeId, date) =>
  api.get(`/attendance/employee/${employeeId}/`, { params: date ? { date } : undefined });

export const markAttendance = (payload) => api.post('/attendance/', payload);
