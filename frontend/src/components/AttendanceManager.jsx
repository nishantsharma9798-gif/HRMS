import { useMemo, useState } from 'react';

const initialForm = { employee: '', date: '', status: 'Present' };

export default function AttendanceManager({ employees, attendanceRows, onMark, onFilter, loading }) {
  const [form, setForm] = useState(initialForm);
  const [filter, setFilter] = useState({ employeeId: '', date: '' });

  const selectedEmployee = useMemo(
    () => employees.find((employee) => String(employee.id) === String(filter.employeeId)),
    [employees, filter.employeeId],
  );

  const submitAttendance = async (e) => {
    e.preventDefault();
    await onMark(form);
    setForm(initialForm);
  };

  const applyFilter = async (e) => {
    e.preventDefault();
    if (!filter.employeeId) return;
    await onFilter(filter.employeeId, filter.date);
  };

  return (
    <div className="grid-two">
      <form className="card form" onSubmit={submitAttendance}>
        <h2>Mark Attendance</h2>
        <select required value={form.employee} onChange={(e) => setForm({ ...form, employee: e.target.value })}>
          <option value="">Select employee</option>
          {employees.map((employee) => (
            <option key={employee.id} value={employee.id}>
              {employee.full_name} ({employee.employee_id})
            </option>
          ))}
        </select>
        <input required type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
        <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
          <option value="Present">Present</option>
          <option value="Absent">Absent</option>
        </select>
        <button disabled={loading} type="submit">{loading ? 'Saving...' : 'Save Attendance'}</button>
      </form>

      <div className="card">
        <h2>Attendance Records</h2>
        <form className="inline-form" onSubmit={applyFilter}>
          <select required value={filter.employeeId} onChange={(e) => setFilter({ ...filter, employeeId: e.target.value })}>
            <option value="">Select employee</option>
            {employees.map((employee) => (
              <option key={employee.id} value={employee.id}>
                {employee.full_name}
              </option>
            ))}
          </select>
          <input type="date" value={filter.date} onChange={(e) => setFilter({ ...filter, date: e.target.value })} />
          <button type="submit">Load</button>
        </form>

        {!selectedEmployee && <p className="empty">Select an employee to view attendance.</p>}
        {selectedEmployee && !attendanceRows.length && <p className="empty">No attendance records found.</p>}

        {!!attendanceRows.length && (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {attendanceRows.map((row) => (
                <tr key={row.id}>
                  <td>{row.date}</td>
                  <td>{row.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
