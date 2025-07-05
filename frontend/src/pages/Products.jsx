import React, { useState } from 'react';
import './Products.css';
import { useProduct } from '../context/ProductContext';

const Products = () => {
  const { products, addProduct, deleteProduct, updateProduct } = useProduct();
  const [searchTerm, setSearchTerm] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const [newProduct, setNewProduct] = useState({
    id: null,
    name: '',
    description: '',
    category: '',
    price: '',
    image: '',
    stock: 'In Stock',
    quantity: 0,
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  const handleEdit = (product) => {
    setNewProduct(product);
    setImagePreview(product.image);
    setIsEditing(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = () => {
    const id = Date.now();
    addProduct({
      ...newProduct,
      id,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    });
    resetForm();
  };

  const handleUpdateProduct = () => {
    updateProduct({
      ...newProduct,
      price: Number(newProduct.price),
      quantity: Number(newProduct.quantity),
    });
    resetForm();
  };

  const resetForm = () => {
    setNewProduct({
      id: null,
      name: '',
      description: '',
      category: '',
      price: '',
      image: '',
      stock: 'In Stock',
      quantity: 0,
    });
    setImagePreview(null);
    setIsEditing(false);
  };

  const filtered = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-page">
      <h1 className="title">Product Management</h1>

      <input
        type="text"
        className="product-search"
        placeholder="Search product name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="add-product-form">
        <h2>{isEditing ? 'Edit Product' : 'Add New Product'}</h2>
        <input
          type="text"
          placeholder="Name"
          value={newProduct.name}
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Description"
          value={newProduct.description}
          onChange={(e) =>
            setNewProduct({ ...newProduct, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Category (e.g., Men, Women, Kids, Beauty)"
          value={newProduct.category}
          onChange={(e) =>
            setNewProduct({ ...newProduct, category: e.target.value })
          }
        />
        <input
          type="number"
          placeholder="Price"
          value={newProduct.price}
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />

        <input type="file" accept="image/*" onChange={handleImageChange} />
        {imagePreview && (
          <img
            src={imagePreview}
            alt="Preview"
            className="product-img"
            style={{ marginTop: '10px', width: '150px' }}
          />
        )}

        <select
          value={newProduct.stock}
          onChange={(e) =>
            setNewProduct({ ...newProduct, stock: e.target.value })
          }
        >
          <option>In Stock</option>
          <option>Out of Stock</option>
          <option>Limited Stock</option>
        </select>
        <input
          type="number"
          placeholder="Quantity"
          value={newProduct.quantity}
          onChange={(e) =>
            setNewProduct({ ...newProduct, quantity: e.target.value })
          }
        />
        {isEditing ? (
          <>
            <button onClick={handleUpdateProduct}>Update Product</button>
            <button onClick={resetForm} className="cancel-edit">Cancel</button>
          </>
        ) : (
          <button onClick={handleAddProduct}>Add Product</button>
        )}
      </div>

      <div className="product-grid">
        {filtered.map((product) => (
          <div key={product.id} className="product-card">
            <img
              src={product.image}
              alt={product.name}
              className="product-img"
            />
            <div className="product-info">
              <h3>{product.name}</h3>
              <p><strong>ID:</strong> {product.id}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ₹{product.price}</p>
              <p><strong>Stock:</strong> {product.stock}</p>
              <p><strong>Quantity:</strong> {product.quantity}</p>
            </div>
            <div className="product-actions">
              <button className="edit-btn" onClick={() => handleEdit(product)}>Edit</button>
              <button className="delete-btn" onClick={() => handleDelete(product.id)}>Delete</button>
            </div>
          </div>
        ))}
        {filtered.length === 0 && <p className="no-products">No products found.</p>}
      </div>
    </div>
  );
};

export default Products;
