// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  // ✅ Initialize user from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Login function
  const login = ({ email, password, role }) => {
    const allUsers = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = allUsers.find(
      (u) => u.email === email && u.password === password && u.role === role
    );

    if (foundUser) {
      localStorage.setItem('user', JSON.stringify(foundUser));
      setUser(foundUser);
      alert('Login successful!');
      navigate(`/${role}/dashboard`);
      return true;
    } else {
      alert('Account not found!');
      if (window.confirm(`No ${role} account found. Would you like to create one?`)) {
        navigate(`/${role}/signup`);
      }
      return false;
    }
  };

  // ✅ Logout function
  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    navigate('/');
  };

  // ✅ Expose user, login, logout
  const value = { user, login, logout };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
