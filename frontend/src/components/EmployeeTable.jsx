export default function EmployeeTable({ employees, onDelete, loading }) {
  if (loading) return <div className="card">Loading employees...</div>;
  if (!employees.length) return <div className="card empty">No employees added yet.</div>;

  return (
    <div className="card">
      <h2>Employees</h2>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Present Days</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.employee_id}</td>
              <td>{employee.full_name}</td>
              <td>{employee.email}</td>
              <td>{employee.department}</td>
              <td>{employee.present_days}</td>
              <td>
                <button className="danger" onClick={() => onDelete(employee.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
