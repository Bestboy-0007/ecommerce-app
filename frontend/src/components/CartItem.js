import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex items-center border-b border-gray-200 py-4">
      <div className="w-20 h-20 flex-shrink-0">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover rounded"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">
            No Image
          </div>
        )}
      </div>

      <div className="flex-1 ml-4">
        <Link to={`/product/${item._id}`} className="text-lg font-semibold text-gray-800 hover:text-primary">
          {item.name}
        </Link>
        <p className="text-gray-500 mt-1">${item.price.toFixed(2)}</p>
      </div>

      <div className="flex items-center">
        <button
          onClick={() => updateQuantity(item._id, item.qty - 1)}
          disabled={item.qty <= 1}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300 disabled:opacity-50"
        >
          -
        </button>
        <span className="mx-3 text-lg font-semibold">{item.qty}</span>
        <button
          onClick={() => updateQuantity(item._id, item.qty + 1)}
          className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
        >
          +
        </button>
      </div>

      <div className="ml-6 text-right">
        <p className="text-lg font-semibold">${(item.price * item.qty).toFixed(2)}</p>
        <button
          onClick={() => removeFromCart(item._id)}
          className="text-red-500 hover:text-red-700 text-sm mt-1"
        >
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
