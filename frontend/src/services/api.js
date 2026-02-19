import axios from 'axios';
import { mockProducts, mockCategories, mockUser, mockAdmin, mockOrders } from './mockData';

// Use environment variable to switch between mock and real API
const USE_MOCK = process.env.REACT_APP_USE_MOCK !== 'false';

// If using mock data, we don't need the real API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const userInfo = JSON.parse(localStorage.getItem('userInfo'));
  if (userInfo && userInfo.token) {
    config.headers.Authorization = `Bearer ${userInfo.token}`;
  }
  return config;
});

// MOCK API IMPLEMENTATIONS
// These replace the real API calls when USE_MOCK is true

export const login = async (email, password) => {
  if (USE_MOCK) {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Check for admin login
    if (email === 'admin@example.com' && password === 'admin123') {
      return { data: mockAdmin };
    }
    
    // Regular user login
    if (email && password) {
      const user = { ...mockUser, email, name: email.split('@')[0] };
      localStorage.setItem('userInfo', JSON.stringify(user));
      return { data: user };
    }
    throw new Error('Invalid credentials');
  }
  return axios.post(`${API_URL}/auth/login`, { email, password });
};

export const register = async (name, email, password) => {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = { ...mockUser, name, email };
    localStorage.setItem('userInfo', JSON.stringify(user));
    return { data: user };
  }
  return axios.post(`${API_URL}/auth/register`, { name, email, password });
};

export const getProfile = async () => {
  if (USE_MOCK) {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return { data: userInfo || mockUser };
  }
  return api.get('/auth/profile');
};

export const updateProfile = async (userData) => {
  if (USE_MOCK) {
    const userInfo = { ...JSON.parse(localStorage.getItem('userInfo')), ...userData };
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    return { data: userInfo };
  }
  return api.put('/auth/profile', userData);
};

export const getProducts = async (params) => {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 300));
    let products = [...mockProducts];
    
    // Search filter
    if (params?.keyword) {
      products = products.filter(p => 
        p.name.toLowerCase().includes(params.keyword.toLowerCase())
      );
    }
    
    // Category filter
    if (params?.category) {
      products = products.filter(p => p.category === params.category);
    }
    
    return { data: products };
  }
  return api.get('/products', { params });
};

export const getProductById = async (id) => {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 200));
    const product = mockProducts.find(p => p._id === id);
    if (!product) throw new Error('Product not found');
    return { data: product };
  }
  return api.get(`/products/${id}`);
};

export const getCategories = async () => {
  if (USE_MOCK) {
    return { data: mockCategories };
  }
  return api.get('/products/categories');
};

// Admin Product APIs
export const createProduct = async (productData) => {
  if (USE_MOCK) {
    const newProduct = { ...productData, _id: String(mockProducts.length + 1) };
    mockProducts.push(newProduct);
    return { data: newProduct };
  }
  return api.post('/products', productData);
};

export const updateProduct = async (id, productData) => {
  if (USE_MOCK) {
    const index = mockProducts.findIndex(p => p._id === id);
    if (index !== -1) {
      mockProducts[index] = { ...mockProducts[index], ...productData };
      return { data: mockProducts[index] };
    }
    throw new Error('Product not found');
  }
  return api.put(`/products/${id}`, productData);
};

export const deleteProduct = async (id) => {
  if (USE_MOCK) {
    const index = mockProducts.findIndex(p => p._id === id);
    if (index !== -1) {
      mockProducts.splice(index, 1);
    }
    return { data: { success: true } };
  }
  return api.delete(`/products/${id}`);
};

// Order APIs
export const createOrder = async (orderData) => {
  if (USE_MOCK) {
    await new Promise(resolve => setTimeout(resolve, 500));
    const newOrder = {
      ...orderData,
      _id: `order-${Date.now()}`,
      isPaid: true,
      isDelivered: false,
      createdAt: new Date().toISOString(),
    };
    // Store order in localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(newOrder);
    localStorage.setItem('orders', JSON.stringify(orders));
    return { data: newOrder };
  }
  return axios.post(`${API_URL}/orders`, orderData);
};

export const getOrderById = async (id) => {
  if (USE_MOCK) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    const order = orders.find(o => o._id === id) || mockOrders.find(o => o._id === id);
    if (!order) throw new Error('Order not found');
    return { data: order };
  }
  return api.get(`/orders/${id}`);
};

export const getMyOrders = async () => {
  if (USE_MOCK) {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    return { data: orders.length > 0 ? orders : mockOrders };
  }
  return api.get('/orders/myorders');
};

export const getOrders = async () => {
  if (USE_MOCK) {
    return { data: mockOrders };
  }
  return api.get('/orders');
};

export const updateOrderStatus = async (id, status) => {
  if (USE_MOCK) {
    return { data: { _id: id, status } };
  }
  return api.put(`/orders/${id}/status`, { status });
};

export const updateOrderToPaid = async (id, paymentResult) => {
  if (USE_MOCK) {
    return { data: { _id: id, isPaid: true } };
  }
  return api.put(`/orders/${id}/pay`, paymentResult);
};

export default api;
