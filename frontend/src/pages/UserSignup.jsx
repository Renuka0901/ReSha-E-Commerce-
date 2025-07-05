import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSignup.css';

const UserSignup = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });
  const [profile, setProfile] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfile(imageUrl);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const newUser = { ...form }; // do not include base64
    users.push(newUser);
    try {
      localStorage.setItem('users', JSON.stringify(users));
      alert('Account created successfully! Please login.');
      navigate('/user/login');
    } catch (err) {
      alert('Storage quota exceeded. Please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="user-bg">
      <div className="user-signup-container">
        <form onSubmit={handleSubmit} className="user-signup-form">
          <h2>Create User Account</h2>
          <input type="text" name="name" placeholder="Name" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Email" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
          <input type="file" accept="image/*" onChange={handleImageChange} required />

          {profile && (
            <div className="image-preview">
              <img src={profile} alt="Preview" width="100" height="100" style={{ borderRadius: '50%' }} />
            </div>
          )}

          <button type="submit">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default UserSignup;
