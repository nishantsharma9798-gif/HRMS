import { useEffect, useState } from 'react';
import AttendanceManager from './components/AttendanceManager';
import EmployeeForm from './components/EmployeeForm';
import EmployeeTable from './components/EmployeeTable';
import { createEmployee, deleteEmployee, getApiConfigError, getAttendance, getEmployees, markAttendance } from './api';

export default function App() {
  const [employees, setEmployees] = useState([]);
  const [attendanceRows, setAttendanceRows] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(getApiConfigError());
  const [success, setSuccess] = useState('');

  const loadEmployees = async () => {
    try {
      setLoadingEmployees(true);
      const { data } = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load employees.');
    } finally {
      setLoadingEmployees(false);
    }
  };

  useEffect(() => {
    loadEmployees();
  }, []);

  const showSuccess = (message) => {
    setSuccess(message);
    setTimeout(() => setSuccess(''), 3000);
  };

  const handleEmployeeCreate = async (form) => {
    try {
      setSaving(true);
      setError('');
      await createEmployee(form);
      showSuccess('Employee added successfully.');
      await loadEmployees();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.email?.[0] || 'Failed to add employee.');
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEmployee = async (id) => {
    try {
      setError('');
      await deleteEmployee(id);
      showSuccess('Employee deleted successfully.');
      await loadEmployees();
      setAttendanceRows([]);
    } catch {
      setError('Failed to delete employee.');
    }
  };

  const handleMarkAttendance = async (payload) => {
    try {
      setSaving(true);
      setError('');
      await markAttendance(payload);
      showSuccess('Attendance marked successfully.');
      await loadEmployees();
    } catch (err) {
      setError(err.response?.data?.error || err.response?.data?.non_field_errors?.[0] || 'Failed to mark attendance.');
    } finally {
      setSaving(false);
    }
  };

  const handleFilterAttendance = async (employeeId, date) => {
    try {
      setError('');
      const { data } = await getAttendance(employeeId, date);
      setAttendanceRows(data);
    } catch {
      setError('Failed to load attendance records.');
    }
  };

  return (
    <main className="container">
      <header>
        <h1>HRMS Lite</h1>
        <p>Manage employee records and daily attendance from one dashboard.</p>
      </header>

      {error && <div className="alert error">{error}</div>}
      {success && <div className="alert success">{success}</div>}

      <section className="grid-two">
        <EmployeeForm onSubmit={handleEmployeeCreate} loading={saving} />
        <EmployeeTable employees={employees} onDelete={handleDeleteEmployee} loading={loadingEmployees} />
      </section>

      <AttendanceManager
        employees={employees}
        attendanceRows={attendanceRows}
        onMark={handleMarkAttendance}
        onFilter={handleFilterAttendance}
        loading={saving}
      />
    </main>
  );
}
