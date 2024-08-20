import React, { useState } from 'react';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { RiUserFollowLine, RiNotification3Line, RiMessage3Line } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

const Navbar = ({ setFilter }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate(); // Hook pour la navigation

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setFilter(term); // Mise à jour du filtre dans App
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Empêche le rechargement de la page
    setFilter(searchTerm); // Assurez-vous que le filtre est mis à jour
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const goToOrders = () => {
    navigate('/vos-commandes'); // Remplacez '/vos-commandes' par l'URL que vous souhaitez
  };

  const goToMsg = () => {
    navigate('/message'); // Remplacez '/message' par l'URL que vous souhaitez
  };

  const goToWish = () => {
    navigate('/wishliste'); // Remplacez '/wishliste' par l'URL que vous souhaitez
  };

  const username = "JohnDoe"; // Remplacez par le nom d'utilisateur réel

  return (
    <nav className="bg-white shadow-md z-40 w-[calc(100%-240px)] fixed top-0 left-60 p-4 flex items-center justify-between">
      <form className="flex items-center" onSubmit={handleSubmit}>
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
        <RiNotification3Line className="text-xl text-gray-600 cursor-pointer" />
        <RiMessage3Line className="text-xl text-gray-600 cursor-pointer" onClick={goToMsg} />
      </div>
    </nav>
  );
};

export default Navbar;
