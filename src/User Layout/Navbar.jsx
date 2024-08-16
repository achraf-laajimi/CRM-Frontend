import React, { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { RiUserFollowLine, RiNotification3Line, RiMessage3Line } from "react-icons/ri";

const Navbar = ({ handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    handleSearch(e.target.value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const username = "JohnDoe"; // Replace this with the actual username

  return (
    <nav className="bg-white shadow-md z-50 w-[calc(100%-240px)] fixed top-0 left-60 p-4 flex items-center justify-between">
      <form className="flex items-center">
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
      <div className="flex items-center space-x-4 relative">
        <div className='flex items-center space-x-1 mx-9 cursor-pointer' onClick={toggleDropdown}>
          <RiUserFollowLine className="text-xl text-neutral-800" />
          <span className="text-neutral-800 font-semibold">Welcome, {username}</span>
          <FaChevronDown className="text-neutral-800" />
        </div>
        {dropdownOpen && (
          <div className="absolute top-12 bg-white border border-gray-200 rounded shadow-lg w-48 z-10">
            <ul className="flex flex-col">
              <li className="px-6 py-2 text-gray-700 cursor-pointer hover:bg-slate-100">Vos commandes</li>
              <li className="px-6 py-2 text-gray-700 cursor-pointer hover:bg-slate-100">Votre liste d'envie</li>
              <li className="px-6 py-2 text-gray-700 cursor-pointer hover:bg-slate-100">Boite de réception</li>
              <li className="px-12 py-2 text-orange-500 cursor-pointer border-t">Déconnexion</li>
            </ul>
          </div>
        )}
        <RiNotification3Line className="text-xl text-gray-600 cursor-pointer" />
        <RiMessage3Line className="text-xl text-gray-600 cursor-pointer" />
      </div>
    </nav>
  );
};

export default Navbar;
