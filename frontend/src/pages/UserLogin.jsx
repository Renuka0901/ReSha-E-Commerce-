// src/pages/UserLogin.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './UserLogin.css';
import logImage from '../assets/log1.jpg';

const UserLogin = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email, password, role: 'user' }); // role-based login
  };

  return (
    <div
      className="user-login-container"
      style={{ backgroundImage: `url(${logImage})` }}
    >
      <form onSubmit={handleSubmit} className="user-login-form">
        <h2>User Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
        <p>
          Don't have an account? <Link to="/user/signup">Create one</Link>
        </p>
      </form>
    </div>
  );
};

export default UserLogin;
