const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getCategories,
} = require('../controllers/productController');
const { protect } = require('../middleware/auth');
const { admin } = require('../middleware/admin');

// @desc    Get all products
// @route   GET /api/products
// @access  Public
router.get('/', getProducts);

// @desc    Get all categories
// @route   GET /api/products/categories
// @access  Public
router.get('/categories', getCategories);

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', getProductById);

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
router.post('/', protect, admin, createProduct);

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
router.put('/:id', protect, admin, updateProduct);

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;
