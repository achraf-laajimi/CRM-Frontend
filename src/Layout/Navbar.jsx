import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';

const Navbar = ({ selectedItem, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <nav className="bg-white shadow-md z-50 w-[calc(100%-240px)] fixed top-0 left-60 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="flex items-center justify-between w-full">
        <span className="text-xl font-semibold text-gray-700">{selectedItem}</span>
        <form className="flex items-center mt-2 sm:mt-0">
          <input
            className="bg-white border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            type="search"
            placeholder="Search Here ..."
            aria-label="Search"
            value={searchTerm}
            onChange={handleChange}
          />
          <button className="bg-white text-orange-500 p-2 hover:text-orange-600" type="submit">
            <FaSearch />
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
