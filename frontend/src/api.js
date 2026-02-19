import axios from 'axios';

const normalizeBaseUrl = (value) => value?.replace(/\/+$/, '');
const DEPLOYED_BACKEND_API_URL = 'https://hrms-4b7o.onrender.com/api';

const getApiConfig = () => {
  const configured = normalizeBaseUrl(import.meta.env.VITE_API_BASE_URL);
  if (configured) {
    return { baseURL: configured, configError: '' };
  }

  if (typeof window !== 'undefined') {
    const isLocalhost = ['localhost', '127.0.0.1'].includes(window.location.hostname);
    if (isLocalhost) {
      return { baseURL: 'http://localhost:8000/api', configError: '' };
    }

    // Default deployed API target requested for this project.
    return { baseURL: DEPLOYED_BACKEND_API_URL, configError: '' };
  }

  return { baseURL: DEPLOYED_BACKEND_API_URL, configError: '' };
};

const { baseURL, configError } = getApiConfig();

const api = axios.create({
  baseURL,
  timeout: 10000,
});

const rejectIfMisconfigured = () => {
  if (!configError) return null;
  const error = new Error(configError);
  error.code = 'API_BASE_URL_MISSING';
  return Promise.reject(error);
};

export const getApiConfigError = () => configError;

export const getEmployees = () => rejectIfMisconfigured() || api.get('/employees/');
export const createEmployee = (payload) => rejectIfMisconfigured() || api.post('/employees/', payload);
export const deleteEmployee = (id) => rejectIfMisconfigured() || api.delete(`/employees/${id}/`);

export const getAttendance = (employeeId, date) =>
  rejectIfMisconfigured() || api.get(`/attendance/employee/${employeeId}/`, { params: date ? { date } : undefined });

export const markAttendance = (payload) => rejectIfMisconfigured() || api.post('/attendance/', payload);
