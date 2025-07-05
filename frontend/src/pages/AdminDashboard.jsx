import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

import adminBackground from '../assets/adm.avif'; // ✅ Import the image

const AdminDashboard = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  return (
    <div
      className="dashboard-wrapper stylish-admin"
      style={{
        backgroundImage: `url(${adminBackground})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <header className="dashboard-header stylish-header">
        <div className="logo">🛍️ Admin </div>
        <div className="user-actions">
          <span className="admin-email">👤 {user?.email}</span>
          <button className="logout-btn" onClick={logout}>🚪 Logout</button>
        </div>
      </header>

      <nav className="nav-links stylish-nav nav-below">
        <button className="nav-btn" onClick={() => navigate('/admin/orders')}>📦 Orders</button>
        <button className="nav-btn" onClick={() => navigate('/admin/products')}>🛒 Products</button>
        <button className="nav-btn" onClick={() => navigate('/admin/users')}>👥 Users</button>
        <button className="nav-btn" onClick={() => navigate('/admin/add-admin')}>➕ Add Admin</button>
        <button className="nav-btn" onClick={() => navigate('/admin/offers')}>🎁 Offers</button> {/* ✅ New Offers Button */}
      </nav>
    </div>
  );
};

export default AdminDashboard;
