// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import UserSignup from './pages/UserSignup';
import UserLogin from './pages/UserLogin';
import AdminSignup from './pages/AdminSignup';
import AdminLogin from './pages/AdminLogin';
import UserDashboard from './pages/UserDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Men from './pages/Men';
import Women from './pages/Women';
import Kids from './pages/Kids';
import Beauty from './pages/Beauty';
import UserList from './pages/Users';
import Orders from './pages/Orders';
import Products from './pages/Products';
import AddAdmin from './pages/AddAdmin';
import AddCart from './pages/AddCart';
import Checkout from './pages/Checkout';
import Offers from './pages/Offers'; // ✅ NEW: import Offers page
import ProtectedRoute from './components/ProtectedRoute';

import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <AuthProvider>
      <UserProvider>
        <CartProvider>
          <OrderProvider>
            <ProductProvider>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/user/signup" element={<UserSignup />} />
                <Route path="/user/login" element={<UserLogin />} />
                <Route path="/admin/signup" element={<AdminSignup />} />
                <Route path="/admin/login" element={<AdminLogin />} />

                {/* User Protected Routes */}
                <Route path="/user/dashboard" element={
                  <ProtectedRoute role="user"><UserDashboard /></ProtectedRoute>
                } />
                <Route path="/user/cart" element={
                  <ProtectedRoute role="user"><AddCart /></ProtectedRoute>
                } />
                <Route path="/checkout" element={
                  <ProtectedRoute role="user"><Checkout /></ProtectedRoute>
                } />

                {/* Category Pages */}
                <Route path="/user/men" element={<Men />} />
                <Route path="/user/women" element={<Women />} />
                <Route path="/user/kids" element={<Kids />} />
                <Route path="/user/beauty" element={<Beauty />} />

                {/* Admin Protected Routes */}
                <Route path="/admin/dashboard" element={
                  <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
                } />
                <Route path="/admin/users" element={
                  <ProtectedRoute role="admin"><UserList /></ProtectedRoute>
                } />
                <Route path="/admin/orders" element={
                  <ProtectedRoute role="admin"><Orders /></ProtectedRoute>
                } />
                <Route path="/admin/products" element={
                  <ProtectedRoute role="admin"><Products /></ProtectedRoute>
                } />
                <Route path="/admin/add-admin" element={
                  <ProtectedRoute role="admin"><AddAdmin /></ProtectedRoute>
                } />
                <Route path="/admin/offers" element={ // ✅ NEW route
                  <ProtectedRoute role="admin"><Offers /></ProtectedRoute>
                } />
              </Routes>
            </ProductProvider>
          </OrderProvider>
        </CartProvider>
      </UserProvider>
    </AuthProvider>
  );
}

export default App;
