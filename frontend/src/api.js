import axios from 'axios';

const normalizeBaseUrl = (value) => value?.replace(/\/+$/, '');

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
  }

  return {
    baseURL: null,
    configError:
      'Backend API URL is not configured. Set VITE_API_BASE_URL to your deployed backend URL (example: https://your-backend.onrender.com/api).',
  };
};

const { baseURL, configError } = getApiConfig();

const api = axios.create({
  baseURL: baseURL || undefined,
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
