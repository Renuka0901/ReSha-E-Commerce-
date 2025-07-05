import React, { useState, useContext } from 'react';
import './Kids.css';
import { CartContext } from '../context/CartContext';

// T-Shirts
import ki1 from '../assets/ki1.jpeg';
import ki2 from '../assets/ki2.webp';
import ki3 from '../assets/ki3.webp';

// Dresses
import kd1 from '../assets/kd1.jpeg';
import kd2 from '../assets/kd2.jpeg';
import kd3 from '../assets/kd3.jpeg';

// Shoes
import ks1 from '../assets/ks1.jpeg';
import ks2 from '../assets/ks2.jpeg';
import ks3 from '../assets/ks3.jpeg';

const categories = ['All', 'T-Shirts', 'Dresses', 'Shoes'];

const kidsProducts = [
  { id: 1, category: 'T-Shirts', name: 'Green Typography T-Shirt', price: 499, image: ki1 },
  { id: 2, category: 'T-Shirts', name: 'Cotton Printed T-Shirt', price: 549, image: ki2 },
  { id: 3, category: 'T-Shirts', name: 'Round Neck T-Shirt', price: 599, image: ki3 },
  { id: 4, category: 'T-Shirts', name: 'Half Sleeve T-Shirt', price: 499, image: ki1 },
  { id: 5, category: 'Dresses', name: 'Girls Red Checked Dress', price: 1099, image: kd1 },
  { id: 6, category: 'Dresses', name: 'Party Wear Dress', price: 1299, image: kd2 },
  { id: 7, category: 'Dresses', name: 'Casual Cotton Dress', price: 999, image: kd3 },
  { id: 8, category: 'Dresses', name: 'Flared Midi Dress', price: 1199, image: kd1 },
  { id: 9, category: 'Shoes', name: 'Sporty Sneakers', price: 1299, image: ks1 },
  { id: 10, category: 'Shoes', name: 'Casual Running Shoes', price: 1499, image: ks2 },
  { id: 11, category: 'Shoes', name: 'Slip-on Kids Shoes', price: 1199, image: ks3 },
  { id: 12, category: 'Shoes', name: 'Stylish Kids Sneakers', price: 1599, image: ks1 },
];

const Kids = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useContext(CartContext);

  const filteredProducts =
    selectedCategory === 'All'
      ? kidsProducts
      : kidsProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="kids-page">
      <div className="banner">
        <h1>Kids Collection</h1>
        <p>Trendy Clothing and Accessories for Kids</p>
      </div>

      <div className="category-buttons">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-btn ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {filteredProducts.map((product) => (
          <div className="product-card" key={product.id}>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-details">
              <span className="product-category">{product.category}</span>
              <h3>{product.name}</h3>
              <p className="price">₹{product.price}</p>
              <button className="add-to-cart" onClick={() => addToCart(product)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Kids;
