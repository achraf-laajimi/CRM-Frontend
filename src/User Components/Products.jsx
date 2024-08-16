import React from 'react';
import { FaSort } from 'react-icons/fa';

const Products = () => {
  return (
    <div className="p-5">
      {/* Filters and Sorting Menu */}
      <div className="mb-5 flex flex-col sm:flex-row sm:justify-between">
        {/* Filters */}
        <div className="flex flex-col space-y-4 sm:w-1/3 mb-4 sm:mb-0">
          <h2 className="text-lg font-semibold text-neutral-800">Filters</h2>
          {/* Example filter options */}
          <div>
            <label className="block text-neutral-800">Category</label>
            <select className="bg-white border border-gray-300 rounded p-2 w-full">
              <option>All Categories</option>
              <option>Category 1</option>
              <option>Category 2</option>
              {/* Add more categories as needed */}
            </select>
          </div>
          <div>
            <label className="block text-neutral-800">Price Range</label>
            <select className="bg-white border border-gray-300 rounded p-2 w-full">
              <option>All Prices</option>
              <option>Under $50</option>
              <option>$50 - $100</option>
              <option>$100 - $200</option>
              <option>Over $200</option>
              {/* Add more price ranges as needed */}
            </select>
          </div>
          {/* Add more filters as needed */}
        </div>

        {/* Sorting Menu */}
        <div className="sm:w-2/3 flex items-center space-x-4">
          <h2 className="text-lg font-semibold text-neutral-800">Sort By:</h2>
          <select className="bg-white border border-gray-300 rounded p-2">
            <option>Newest</option>
            <option>Highest Price</option>
            <option>Lowest Price</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {/* Example Product Card */}
        <div className="bg-white border rounded-lg shadow-md overflow-hidden">
          <img src="https://via.placeholder.com/150" alt="Product" className="w-full h-40 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-semibold text-neutral-800">Product Name</h3>
            <p className="text-gray-600">$Price</p>
          </div>
        </div>
        {/* Repeat product cards as needed */}
      </div>
    </div>
  );
}

export default Products;
