import axios from 'axios';

const normalizeBaseUrl = (value) => value?.replace(/\/+$/, '');

const resolveApiBaseUrl = () => {
  const configured = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
  if (configured) {
    return configured;
  }

  if (typeof window !== 'undefined') {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (isLocalhost) {
      return 'http://localhost:8000/api';
    }

    console.error(
      'Missing VITE_API_BASE_URL. Set it in your frontend deployment environment to your backend URL (e.g. https://your-backend.onrender.com/api).',
    );
  }

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
