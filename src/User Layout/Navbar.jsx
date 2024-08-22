import React, { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { RiUserFollowLine, RiNotification3Line, RiMessage3Line } from "react-icons/ri";
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = ({ filter, setFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook pour la navigation
  const location = useLocation(); // Hook pour obtenir la route actuelle

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    if (setFilter) {
      setFilter(e.target.value);
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const goToOrders = () => {
    navigate('/vos-commandes');
  };

  const goToMsg = () => {
    navigate('/message');
  };

  const goToWish = () => {
    navigate('/wishliste');
  };

  const username = "JohnDoe"; // Remplacez par le nom d'utilisateur réel

  // Affiche la barre de recherche uniquement sur la page des produits
  const showSearch = location.pathname === '/';

  return (
    <nav className="bg-white shadow-md z-40 w-[calc(100%-240px)] fixed top-0 left-60 p-4 flex items-center justify-between">
      <div className="flex-1 flex items-center">
        {showSearch ? (
          <form className="flex items-center ml-[-420px]">
            <input
              className="bg-white border border-gray-300 rounded p-2 mr-2 flex-1 focus:outline-none focus:ring-2 focus:ring-orange-400"
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
        ) : (
          <div className="flex-1"></div>  // Placeholder to maintain alignment when search bar is hidden
        )}
      </div>
      <div className="flex items-center space-x-4 relative">
        <div className="flex items-center space-x-1 mx-9 cursor-pointer" onClick={toggleDropdown}>
          <RiUserFollowLine className="text-xl text-neutral-800" />
          <span className="text-neutral-800 font-semibold">Welcome, {username}</span>
          <FaChevronDown className="text-neutral-800" />
        </div>
        {dropdownOpen && (
          <div className="absolute top-12 bg-white border border-gray-200 rounded shadow-lg w-48 z-10">
            <ul className="flex flex-col">
              <li className="px-6 py-2 text-gray-700 cursor-pointer hover:bg-slate-100" onClick={goToOrders}>
                Vos commandes
              </li>
              <li className="px-6 py-2 text-gray-700 cursor-pointer hover:bg-slate-100" onClick={goToWish}>
                Votre liste d'envie
              </li>
              <li className="px-6 py-2 text-gray-700 cursor-pointer hover:bg-slate-100" onClick={goToMsg}>
                Vos messages
              </li>
              <li className="px-12 py-2 text-orange-500 cursor-pointer border-t">Déconnexion</li>
            </ul>
          </div>
        )}
 {/*        <RiNotification3Line className="text-xl text-gray-600 cursor-pointer" /> */}
        <RiMessage3Line className="text-xl text-gray-600 cursor-pointer" onClick={goToMsg} />
      </div>
    </nav>
  );
};

export default Navbar;
