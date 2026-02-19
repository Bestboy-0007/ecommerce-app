import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import * as api from '../services/api';

const Home = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const searchTerm = searchParams.get('search') || '';
  const category = searchParams.get('category') || '';

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const params = {};
        if (searchTerm) params.search = searchTerm;
        if (category) params.category = category;
        
        const [productsRes, categoriesRes] = await Promise.all([
          api.getProducts(params),
          api.getCategories(),
        ]);
        
        setProducts(productsRes.data.products);
        setCategories(categoriesRes.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchTerm, category]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 py-8">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <div>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg p-8 mb-8">
        <h1 className="text-4xl font-bold mb-4">Welcome to ShopHub</h1>
        <p className="text-lg">Discover amazing products at great prices!</p>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-3">Categories</h2>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => window.history.pushState({}, '', '/')}
            className={`px-4 py-2 rounded-full ${
              !category ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => window.history.pushState({}, '', `/?category=${encodeURIComponent(cat)}`)}
              className={`px-4 py-2 rounded-full ${
                category === cat ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results Info */}
      {(searchTerm || category) && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold">
            {searchTerm && `Search results for "${searchTerm}"`}
            {category && ` - Category: ${category}`}
          </h2>
          <p className="text-gray-500">{products.length} products found</p>
        </div>
      )}

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-xl text-gray-500">No products found</p>
        </div>
      )}
    </div>
  );
};

export default Home;
