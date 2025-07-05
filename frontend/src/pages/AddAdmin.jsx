import React, { useState } from 'react';
import './AddAdmin.css';

const AddAdmin = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError('');
    setMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (!form.name || !form.email || !form.password) {
      setError('Please fill all the fields.');
      return;
    }

    const admins = JSON.parse(localStorage.getItem('admins')) || [];
    const exists = admins.find(admin => admin.email === form.email);

    if (exists) {
      setError('Admin with this email already exists.');
    } else {
      admins.push({ ...form, role: 'admin' });
      localStorage.setItem('admins', JSON.stringify(admins));
      setMessage('✅ New admin added successfully!');
      setForm({ name: '', email: '', password: '' });
    }
  };

  return (
    <div className="add-admin-page">
      <form onSubmit={handleSubmit} className="add-admin-form">
        <h2>Add Admin</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p className="form-error">{error}</p>}
        {message && <p className="form-success">{message}</p>}

        <button type="submit">Add Admin</button>
      </form>
    </div>
  );
};

export default AddAdmin;
