// src/context/ProductContext.jsx
import React, { createContext, useState, useContext, useEffect } from 'react';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // Load from localStorage on initial render
  const [products, setProducts] = useState(() => {
    try {
      const stored = localStorage.getItem('products');
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Failed to parse products from localStorage:', error);
      return [];
    }
  });

  // Sync with localStorage whenever products change
  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  // Add a new product
  const addProduct = (product) => {
    setProducts((prev) => [...prev, product]);
  };

  // Delete product by ID
  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  // Update product by ID
  const updateProduct = (updatedProduct) => {
    setProducts((prev) =>
      prev.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      )
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, setProducts, addProduct, deleteProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook for easy access
export const useProduct = () => useContext(ProductContext);
