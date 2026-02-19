const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');

dotenv.config();

const sampleProducts = [
  {
    name: 'Wireless Bluetooth Headphones',
    description: 'High quality wireless headphones with noise cancellation and 20-hour battery life.',
    price: 79.99,
    stock: 50,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  },
  {
    name: 'Smart Watch Pro',
    description: 'Fitness tracker with heart rate monitor, GPS, and water resistance.',
    price: 199.99,
    stock: 30,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
  },
  {
    name: 'Running Shoes UltraBoost',
    description: 'Comfortable running shoes with advanced cushioning for maximum performance.',
    price: 129.99,
    stock: 100,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
  },
  {
    name: 'Leather Wallet Classic',
    description: 'Genuine leather wallet with multiple card slots and bill compartments.',
    price: 49.99,
    stock: 75,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
  },
  {
    name: 'Cotton T-Shirt Pack',
    description: 'Pack of 3 premium cotton t-shirts in various colors.',
    price: 39.99,
    stock: 200,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  },
  {
    name: 'Laptop Backpack',
    description: 'Stylish and durable backpack for laptops up to 15 inches.',
    price: 59.99,
    stock: 45,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
  },
  {
    name: 'Wireless Mouse',
    description: 'Ergonomic wireless mouse with precise tracking.',
    price: 29.99,
    stock: 150,
    category: 'Electronics',
    image: 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
  },
  {
    name: 'Denim Jeans Slim Fit',
    description: 'Classic slim fit denim jeans with stretch comfort.',
    price: 69.99,
    stock: 80,
    category: 'Clothing',
    image: 'https://images.unsplash.com/photo-1542272454315-4c01d7abdf4a?w=400',
  },
  {
    name: 'Sunglasses Aviator',
    description: 'Classic aviator sunglasses with UV protection.',
    price: 89.99,
    stock: 60,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400',
  },
  {
    name: 'Stainless Steel Water Bottle',
    description: 'Insulated water bottle that keeps drinks cold for 24 hours.',
    price: 24.99,
    stock: 120,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400',
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('MongoDB Connected...');
    
    // Clear existing products
    await Product.deleteMany({});
    console.log('Products cleared...');
    
    // Insert sample products
    await Product.insertMany(sampleProducts);
    console.log('Sample products added successfully!');
    
    console.log('Seeding completed!');
    process.exit(0);
  } catch (err) {
    console.error('Error seeding database:', err);
    process.exit(1);
  }
};

seedDatabase();
