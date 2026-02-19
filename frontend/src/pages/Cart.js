import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, cartTotal } = useCart();
  const navigate = useNavigate();

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (cartItems.length === 0) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
        <Link to="/" className="text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      
      <div className="bg-white rounded-lg shadow-md p-6">
        {cartItems.map((item) => (
          <CartItem key={item._id} item={item} />
        ))}
      </div>

      <div className="mt-6 bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <span className="text-xl font-semibold">Subtotal:</span>
          <span className="text-2xl font-bold">${cartTotal.toFixed(2)}</span>
        </div>
        
        <button
          onClick={handleCheckout}
          className="w-full py-3 px-6 bg-primary text-white rounded-lg font-semibold hover:bg-indigo-600 transition-colors"
        >
          Proceed to Checkout
        </button>
        
        <Link to="/" className="block text-center mt-4 text-primary hover:underline">
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default Cart;
