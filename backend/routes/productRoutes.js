const express = require('express');
const router = express.Router();
const Product = require('../models/ProductModel'); // ✅ Correct path

// POST - Add new product
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json({ message: 'Product added', product: newProduct });
  } catch (error) {
    console.error('❌ Product POST error:', error);
    res.status(500).json({ message: 'Product add failed', error });
  }
});

// GET - All products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    console.error('❌ Product GET error:', error);
    res.status(500).json({ message: 'Failed to fetch products', error });
  }
});

module.exports = router;
