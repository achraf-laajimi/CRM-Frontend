import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaFilter, FaTimes, FaCommentDots } from 'react-icons/fa';
import { getProducts, likeProduct, unlikeProduct } from '../User api/Methods';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ color: '', gender: '', category: '' });
  const [sortOrder, setSortOrder] = useState('newest');
  const [userId, setUserId] = useState('66b9e52908f4cfb69c52f440'); // Replace with actual user ID

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchProducts();
  }, []);

  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const filterProducts = (products) => {
    return products.filter((product) => {
      return (
        (!filters.color || product.colors.includes(filters.color)) &&
        (!filters.gender || product.gender === filters.gender) &&
        (!filters.category || product.category === filters.category)
      );
    });
  };

  const sortProducts = (products) => {
    if (sortOrder === 'newest') {
      return products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortOrder === 'highestPrice') {
      return products.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'lowestPrice') {
      return products.sort((a, b) => a.price - b.price);
    }
    return products;
  };

  const handleLikeClick = async (productId, isLiked) => {
    try {
      if (isLiked) {
        await unlikeProduct(productId, userId);
      } else {
        await likeProduct(productId, userId);
      }

      // Update the product list with the new like/unlike status
      setProducts((prevProducts) =>
        prevProducts.map((product) =>
          product._id === productId
            ? {
                ...product,
                likes: isLiked
                  ? product.likes.filter((id) => id !== userId)
                  : [...product.likes, userId],
              }
            : product
        )
      );
    } catch (error) {
      console.error('Error updating like status:', error);
    }
  };

  const filteredAndSortedProducts = sortProducts(filterProducts(products));

  return (
    <div className="relative p-5 flex flex-col">
      {/* Top Section with Filters and Sort By */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-neutral-800">Products Section</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleFilter}
            className="bg-white border border-gray-300 rounded p-2 flex items-center space-x-2"
          >
            <FaFilter className="text-xl text-neutral-800" />
            <span className="text-neutral-800 font-semibold">Filters</span>
          </button>
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-neutral-800">Sort By:</h2>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="bg-white border border-gray-300 rounded p-2"
            >
              <option value="newest">Newest</option>
              <option value="highestPrice">Highest Price</option>
              <option value="lowestPrice">Lowest Price</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-neutral-800 opacity-50 z-40" onClick={toggleFilter}></div>
      )}

      {/* Filter Sidebar */}
      {isFilterOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white border-l border-gray-300 p-4 z-50">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
            <h2 className="text-lg font-semibold text-neutral-800">Filters</h2>
            <button onClick={toggleFilter} className="text-white">
              <FaTimes />
            </button>
          </div>
          <div className="space-y-4">
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Colors</h3>
              <label className="block">
                <input
                  type="radio"
                  name="color"
                  value="red"
                  checked={filters.color === 'red'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Red
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="color"
                  value="blue"
                  checked={filters.color === 'blue'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Blue
              </label>
              {/* Add more color options as needed */}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Gender</h3>
              <label className="block">
                <input
                  type="radio"
                  name="gender"
                  value="men"
                  checked={filters.gender === 'men'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Men
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="gender"
                  value="women"
                  checked={filters.gender === 'women'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Women
              </label>
              {/* Add more gender options as needed */}
            </div>
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Categories</h3>
              <label className="block">
                <input
                  type="radio"
                  name="category"
                  value="shoes"
                  checked={filters.category === 'shoes'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Shoes
              </label>
              <label className="block">
                <input
                  type="radio"
                  name="category"
                  value="pull"
                  checked={filters.category === 'pull'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Pull
              </label>
              {/* Add more categories as needed */}
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className={`flex-1 ${isFilterOpen ? 'mr-64' : ''} transition-all duration-300`}>
        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
          {filteredAndSortedProducts.map((product) => {
            const isLiked = product.likes.includes(userId);
            return (
              <div key={product._id} className="bg-white border rounded-lg shadow-md overflow-hidden">
                <img src={product.imageUrl} alt={product.name} className="w-full h-40 object-cover" />
                <div className="p-4 flex flex-col justify-between">
                  <div className="flex justify-between items-center mb-2 space-x-7">
                    <h3 className="text-lg font-semibold text-neutral-800">{product.name}</h3>
                    <div className="flex space-x-2">
                      <FaHeart
                        className={`cursor-pointer ${isLiked ? 'text-red-500' : 'text-gray-400'}`}
                        onClick={() => handleLikeClick(product._id, isLiked)}
                      />
                      <FaShoppingCart className="text-orange-500 cursor-pointer" />
                    </div>
                  </div>
                  <div className='flex justify-between items-center mb-2 space-x-7'>
                    <FaCommentDots className="text-orange-500 cursor-pointer mt-4 text-lg" />
                  <p className="text-gray-600 mt-4">${product.price}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Products;
