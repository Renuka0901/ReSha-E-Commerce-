// src/pages/Men.jsx
import React, { useState, useContext } from 'react';
import './Men.css';
import { CartContext } from '../context/CartContext'; // ✅ Import the CartContext

// Shirt images
import s1 from '../assets/s1.jpeg';
import s3 from '../assets/s3.jpeg';
import s4 from '../assets/s4.jpeg';
import s5 from '../assets/s5.jpeg';
import s6 from '../assets/s6.jpeg';
import s7 from '../assets/s7.jpeg';
import s8 from '../assets/s8.jpeg';

// Jeans images
import j1 from '../assets/j1.jpeg';
import j2 from '../assets/j2.jpeg';
import j3 from '../assets/j3.jpeg';
import j4 from '../assets/j4.jpeg';

// Jacket images
import jk1 from '../assets/jk1.jpeg';
import jk2 from '../assets/jk2.jpeg';
import jk3 from '../assets/jk3.jpeg';

// T-Shirt images
import ts1 from '../assets/ts1.jpeg';
import ts2 from '../assets/ts2.jpeg';

const categories = ['All', 'Shirts', 'Jeans', 'Jackets', 'T-Shirts', 'Suits', 'Track Pants', 'Sweatshirts'];

const menProducts = [
  // Shirts
  { id: 1, category: 'Shirts', name: 'Casual Shirt', price: 899, image: s1 },
  { id: 2, category: 'Shirts', name: 'Formal Shirt', price: 1199, image: s8 },
  { id: 3, category: 'Shirts', name: 'Checked Shirt', price: 999, image: s3 },
  { id: 4, category: 'Shirts', name: 'White Shirt', price: 1099, image: s4 },
  { id: 5, category: 'Shirts', name: 'Striped Shirt', price: 1299, image: s5 },
  { id: 6, category: 'Shirts', name: 'Denim Shirt', price: 1499, image: s6 },
  { id: 7, category: 'Shirts', name: 'Printed Shirt', price: 1399, image: s7 },
  { id: 8, category: 'Shirts', name: 'Linen Shirt', price: 1699, image: s8 },

  // Jeans
  { id: 9, category: 'Jeans', name: 'Slim Fit Jeans', price: 1299, image: j1 },
  { id: 10, category: 'Jeans', name: 'Distressed Denim', price: 1499, image: j2 },
  { id: 11, category: 'Jeans', name: 'Tapered Jeans', price: 1399, image: j3 },
  { id: 12, category: 'Jeans', name: 'Relaxed Fit Jeans', price: 1599, image: j4 },
  { id: 13, category: 'Jeans', name: 'Classic Blue Jeans', price: 1399, image: j1 },
  { id: 14, category: 'Jeans', name: 'Washed Denim', price: 1599, image: j2 },

  // Jackets
  { id: 15, category: 'Jackets', name: 'Hooded Jacket', price: 2499, image: jk1 },
  { id: 16, category: 'Jackets', name: 'Winter Jacket', price: 3299, image: jk2 },
  { id: 17, category: 'Jackets', name: 'Puffer Jacket', price: 2999, image: jk3 },

  // T-Shirts
  { id: 18, category: 'T-Shirts', name: 'Printed T-Shirt', price: 699, image: ts1 },
  { id: 19, category: 'T-Shirts', name: 'Graphic T-Shirt', price: 799, image: ts2 },

  // Suits
  { id: 20, category: 'Suits', name: 'Men’s Classic Suit', price: 5499, image: 'https://assets.myntassets.com/f_webp,q_90,w_240,c_limit,fl_progressive/assets/images/13551322/2021/1/28/Suit.jpg' },

  // Track Pants
  { id: 21, category: 'Track Pants', name: 'Running Track Pant', price: 999, image: 'https://assets.myntassets.com/f_webp,q_90,w_240,c_limit,fl_progressive/assets/images/20157314/2022/9/6/TrackPant.jpg' },

  // Sweatshirts
  { id: 22, category: 'Sweatshirts', name: 'Winter Sweatshirt', price: 1799, image: 'https://assets.myntassets.com/f_webp,q_90,w_240,c_limit,fl_progressive/assets/images/23172592/2023/7/1/Sweatshirt.jpg' },
];

const Men = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useContext(CartContext); // ✅ Use addToCart from context

  const filteredProducts =
    selectedCategory === 'All'
      ? menProducts
      : menProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="men-page">
      <div className="banner">
        <h1>Men's Fashion</h1>
        <p>Explore Top Picks from All Categories</p>
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
              <button
                className="add-to-cart"
                onClick={() => addToCart({ ...product, id: Date.now() })} // ⬅️ unique ID for each add
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Men;
