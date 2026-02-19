import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      <div className="grid md:grid-cols-2 gap-6">
        {/* Products Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Products Management</h2>
          <p className="text-gray-600 mb-4">Add, edit, or remove products from your store.</p>
          <Link
            to="/admin/products"
            className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-600"
          >
            Manage Products
          </Link>
        </div>
        
        {/* Orders Management */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Orders Management</h2>
          <p className="text-gray-600 mb-4">View and manage customer orders.</p>
          <Link
            to="/admin/orders"
            className="inline-block px-6 py-2 bg-primary text-white rounded-lg hover:bg-indigo-600"
          >
            Manage Orders
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
