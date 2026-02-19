import { useState } from 'react';

const initialForm = { employee_id: '', full_name: '', email: '', department: '' };

export default function EmployeeForm({ onSubmit, loading }) {
  const [form, setForm] = useState(initialForm);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(form);
    setForm(initialForm);
  };

  return (
    <form className="card form" onSubmit={handleSubmit}>
      <h2>Add Employee</h2>
      <input required placeholder="Employee ID" value={form.employee_id} onChange={(e) => setForm({ ...form, employee_id: e.target.value })} />
      <input required placeholder="Full Name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} />
      <input required type="email" placeholder="Email Address" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input required placeholder="Department" value={form.department} onChange={(e) => setForm({ ...form, department: e.target.value })} />
      <button disabled={loading} type="submit">{loading ? 'Saving...' : 'Add Employee'}</button>
    </form>
  );
}
