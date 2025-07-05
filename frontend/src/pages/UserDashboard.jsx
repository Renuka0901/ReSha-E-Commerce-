// src/pages/UserDashboard.jsx
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';
import { CartContext } from '../context/CartContext';
import { useProduct } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';

import bannerImage from '../assets/image.png';
import menImage from '../assets/men.jpg';
import womenImage from '../assets/women.webp';
import kidsImage from '../assets/kids.jpeg';
import beautyImage from '../assets/beauty.jpg';

import m1 from '../assets/m1.jpg';
import w1 from '../assets/w1.jpg';
import k1 from '../assets/k1.jpg';
import b1 from '../assets/b1.jpg';
import m2 from '../assets/m2.jpeg';
import k2 from '../assets/k2.jpg';
import b2 from '../assets/b2.jpg';
import m3 from '../assets/m3.jpeg';
import w3 from '../assets/w3.jpg';
import k3 from '../assets/k3.jpeg';
import b3 from '../assets/b3.jpg';
import m4 from '../assets/m4.jpg';
import w4 from '../assets/w4.jpg';
import k4 from '../assets/k4.jpg';
import b4 from '../assets/b4.webp';

const staticProducts = [
  { id: 1, name: 'Men Casual Shirt', category: 'Men', price: 899, image: m1 },
  { id: 2, name: 'Men Blue Jeans', category: 'Men', price: 1399, image: m2 },
  { id: 3, name: 'Floral Kurti', category: 'Women', price: 1199, image: w1 },
  { id: 4, name: 'Printed Top', category: 'Women', price: 999, image: w3 },
  { id: 5, name: 'Kids Green T-Shirt', category: 'Kids', price: 499, image: k1 },
  { id: 6, name: 'Kids Shoes', category: 'Kids', price: 1299, image: k2 },
  { id: 7, name: 'Face Cream', category: 'Beauty', price: 799, image: b1 },
  { id: 8, name: 'Perfume Spray', category: 'Beauty', price: 1499, image: b3 },
];

const topDealImages = [m1, w1, k1, b1, m2, k2, b2, m3, w3, k3, b3, m4, w4, k4, b4];

const UserDashboard = () => {
  const navigate = useNavigate();
  const { cartItems, addToCart } = useContext(CartContext);
  const { products } = useProduct();
  const { user, logout } = useAuth();

  const [showProfile, setShowProfile] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const combinedProducts = [...staticProducts, ...products];

  const filteredSearchResults = combinedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard-wrapper scrollable">
      <header className="dashboard-header ai-header">
        <div className="logo">𝓡𝓮𝓢𝓱𝓪 𝓢𝓽𝓸𝓻𝓮</div>
        <nav className="nav-links">
          <button onClick={() => navigate('/user/men')}>Men</button>
          <button onClick={() => navigate('/user/women')}>Women</button>
          <button onClick={() => navigate('/user/kids')}>Kids</button>
          <button onClick={() => navigate('/user/beauty')}>Beauty</button>
        </nav>
        <div className="user-actions">
          <input
            type="text"
            placeholder="Search for products"
            className="search-bar ai-search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="cart-icon" title="Cart" onClick={() => navigate('/user/cart')}>
            🛒<span className="cart-count">{cartItems.length}</span>
          </div>
          <button className="profile-btn" onClick={() => setShowProfile(!showProfile)}>👤</button>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>
      </header>

      {showProfile && (
        <div className="profile-dropdown ai-dropdown">
          {user ? (
            <>
              <p><strong>Name:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </>
          ) : (
            <p>No user info found. Please log in.</p>
          )}
        </div>
      )}

      <section className="dashboard-banner">
        <img src={bannerImage} alt="Banner" className="banner-image ai-banner" />
      </section>

      {searchTerm ? (
        <section className="search-results-section">
          <h2>Search Results for: "{searchTerm}"</h2>
          <div className="product-grid">
            {filteredSearchResults.length > 0 ? (
              filteredSearchResults.map((product) => (
                <div className="product-card" key={product.id}>
                  <img src={product.image} alt={product.name} className="product-image" />
                  <div className="product-details">
                    <span className="product-category">{product.category}</span>
                    <h3>{product.name}</h3>
                    <p className="price">₹{product.price}</p>
                    <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </section>
      ) : (
        <>
          <section className="category-section">
            <h2>Explore Categories</h2>
            <div className="category-cards">
              {[['Men', menImage], ['Women', womenImage], ['Kids', kidsImage], ['Beauty', beautyImage]].map(([label, img]) => (
                <div key={label} className="category-card ai-card" onClick={() => navigate(`/user/${label.toLowerCase()}`)}>
                  <img src={img} alt={label} />
                  <p>{label}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="featured-section">
            <h2>Top Deals</h2>
            <div className="featured-grid">
              {topDealImages.map((img, index) => (
                <div key={index} className="featured-card ai-card">
                  <img src={img} alt={`Deal ${index + 1}`} />
                  <p>Deal #{index + 1}: Special Offer</p>
                  <button className="category-btn" onClick={() => addToCart({
                    id: Date.now() + index,
                    name: `Deal Product #${index + 1}`,
                    price: 999,
                    image: img,
                    category: 'Deals'
                  })}>Add to Cart</button>
                </div>
              ))}
            </div>
          </section>

          <section className="featured-section">
            <h2>Latest Products</h2>
            <div className="product-grid">
              {products.length > 0 ? (
                products.map((product) => (
                  <div className="product-card" key={product.id}>
                    <img src={product.image} alt={product.name} className="product-image" />
                    <div className="product-details">
                      <span className="product-category">{product.category}</span>
                      <h3>{product.name}</h3>
                      <p className="price">₹{product.price}</p>
                      <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No latest products added yet.</p>
              )}
            </div>
          </section>
        </>
      )}

      <footer className="dashboard-footer">
        <p>© {new Date().getFullYear()} ReSha. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default UserDashboard;