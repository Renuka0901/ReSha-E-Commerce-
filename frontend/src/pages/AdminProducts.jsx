import React, { useContext, useState } from 'react';
import { ProductContext } from '../context/ProductContext';
import './Products.css';

const AdminProducts = () => {
  const { products, setProducts } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
  };

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <h1>Admin Product Management</h1>
      <input
        type="text"
        className="product-search"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="product-grid">
        {filtered.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-img" />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p>Category: {product.category}</p>
              <p>Price: ₹{product.price}</p>
              <p>Stock: {product.stock}</p>
              <p>Qty: {product.quantity}</p>
            </div>
            <div className="product-actions">
              <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProducts;
