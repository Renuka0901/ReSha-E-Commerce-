// src/pages/Women.jsx
import React, { useState, useContext } from 'react';
import './Women.css';
import { CartContext } from '../context/CartContext';

// Product images
import kt1 from '../assets/kt1.jpeg';
import kt2 from '../assets/kt2.jpeg';
import kt3 from '../assets/kt3.webp';
import kt4 from '../assets/kt4.jpeg';
import wj1 from '../assets/wj1.jpeg';
import wj2 from '../assets/wj2.jpeg';
import wj3 from '../assets/wj3.jpeg';
import wt1 from '../assets/wt1.jpeg';
import wt2 from '../assets/wt2.jpeg';
import wt3 from '../assets/wt3.jpeg';
import top1 from '../assets/top1.jpeg';
import top2 from '../assets/top2.jpeg';
import top3 from '../assets/top3.jpeg';
import saree1 from '../assets/saree1.jpg';
import saree2 from '../assets/saree2.jpeg';
import saree3 from '../assets/saree3.avif';

const categories = ['All', 'Kurtis', 'Jeans', 'Jackets', 'Tops', 'Sarees', 'Leggings', 'Sweaters'];

const womenProducts = [
  { id: 1, category: 'Kurtis', name: 'Floral Kurti', price: 899, image: kt1 },
  { id: 2, category: 'Kurtis', name: 'Formal Kurti', price: 1199, image: kt2 },
  { id: 3, category: 'Kurtis', name: 'Checked Kurti', price: 999, image: kt3 },
  { id: 4, category: 'Kurtis', name: 'White Kurti', price: 1099, image: kt4 },
  { id: 5, category: 'Kurtis', name: 'Striped Kurti', price: 1299, image: kt1 },
  { id: 6, category: 'Kurtis', name: 'Denim Kurti', price: 1499, image: kt2 },
  { id: 7, category: 'Kurtis', name: 'Printed Kurti', price: 1399, image: kt3 },
  { id: 8, category: 'Kurtis', name: 'Linen Kurti', price: 1699, image: kt4 },
  { id: 9, category: 'Jeans', name: 'Slim Fit Jeans', price: 1299, image: wj1 },
  { id: 10, category: 'Jeans', name: 'Distressed Jeans', price: 1499, image: wj2 },
  { id: 11, category: 'Jeans', name: 'Tapered Jeans', price: 1399, image: wj3 },
  { id: 12, category: 'Jeans', name: 'Relaxed Fit Jeans', price: 1599, image: wj1 },
  { id: 13, category: 'Jeans', name: 'Classic Blue Jeans', price: 1399, image: wj2 },
  { id: 14, category: 'Jeans', name: 'Washed Denim', price: 1599, image: wj3 },
  { id: 15, category: 'Jackets', name: 'Casual Jacket', price: 2499, image: wt1 },
  { id: 16, category: 'Jackets', name: 'Winter Jacket', price: 3299, image: wt2 },
  { id: 17, category: 'Jackets', name: 'Puffer Jacket', price: 2999, image: wt3 },
  { id: 18, category: 'Tops', name: 'Printed Top', price: 699, image: top1 },
  { id: 19, category: 'Tops', name: 'Graphic Top', price: 799, image: top2 },
  { id: 20, category: 'Tops', name: 'Casual V-Neck Top', price: 899, image: top3 },
  { id: 21, category: 'Sarees', name: 'Traditional Saree', price: 3499, image: saree1 },
  { id: 22, category: 'Sarees', name: 'Embroidered Saree', price: 4199, image: saree2 },
  { id: 23, category: 'Sarees', name: 'Partywear Saree', price: 3899, image: saree3 },
  { id: 24, category: 'Sarees', name: 'Cotton Saree', price: 2499, image: saree1 },
  { id: 25, category: 'Sarees', name: 'Georgette Saree', price: 3199, image: saree2 },
  { id: 26, category: 'Sarees', name: 'Banarasi Saree', price: 4799, image: saree3 },
  { id: 27, category: 'Sarees', name: 'Festive Saree', price: 3099, image: saree1 },
  { id: 28, category: 'Sarees', name: 'Printed Saree', price: 2899, image: saree2 },
  { id: 29, category: 'Leggings', name: 'Comfort Leggings', price: 999, image: 'https://assets.myntassets.com/f_webp,q_90,w_240,c_limit,fl_progressive/assets/images/10237999/2023/4/1/leggings.jpg' },
  { id: 30, category: 'Sweaters', name: 'Woolen Sweater', price: 1799, image: 'https://assets.myntassets.com/f_webp,q_90,w_240,c_limit,fl_progressive/assets/images/15617714/2023/2/18/sweater.jpg' },
];

const Women = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { addToCart } = useContext(CartContext);

  const filteredProducts =
    selectedCategory === 'All'
      ? womenProducts
      : womenProducts.filter((product) => product.category === selectedCategory);

  return (
    <div className="women-page">
      <div className="banner">
        <h1>Women's Fashion</h1>
        <p>Discover Elegant and Trendy Styles</p>
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
              <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Women;