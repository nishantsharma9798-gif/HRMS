import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 10000,
});

export const getEmployees = () => api.get('/employees/');
export const createEmployee = (payload) => api.post('/employees/', payload);
export const deleteEmployee = (id) => api.delete(`/employees/${id}/`);

export const getAttendance = (employeeId, date) =>
  api.get(`/attendance/employee/${employeeId}/`, { params: date ? { date } : undefined });

export const markAttendance = (payload) => api.post('/attendance/', payload);
