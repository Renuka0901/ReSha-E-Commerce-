import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import homeImage from '../assets/home1.jpg'; // ✅ Make sure path is correct

const Home = () => {
  return (
    <div
      className="home-container"
      style={{ backgroundImage: `url(${homeImage})` }}
    >
      <div className="home-box">
        <h1 className="home-title">Welcome to ReSha</h1>
        <p className="home-subtext">Please select your login type</p>
        <div className="home-links">
          <Link to="/user/login" className="home-btn user-btn">User Login</Link>
          <Link to="/admin/login" className="home-btn admin-btn">Admin Login</Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
