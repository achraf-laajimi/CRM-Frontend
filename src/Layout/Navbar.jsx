import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { getUsers } from '../api/UserMethods';
import { getProducts } from '../api/ProductMethods';

const Navbar = ({ selectedItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchTerm) {
        setSuggestions([]);
        return;
      }

      setLoading(true);
      try {
        const [users, products] = await Promise.all([getUsers(), getProducts()]);

        console.log('Fetched users:', users);
        console.log('Fetched products:', products);

        const userSuggestions = users.filter(user =>
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
        );
        const productSuggestions = products.filter(product =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );

        console.log('User suggestions:', userSuggestions);
        console.log('Product suggestions:', productSuggestions);

        const combinedSuggestions = [
          ...userSuggestions.map(user => ({ type: 'user', ...user })),
          ...productSuggestions.map(product => ({ type: 'product', ...product }))
        ];

        setSuggestions(combinedSuggestions);
      } catch (error) {
        console.error('Error fetching suggestions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearch = async (event) => {
    event.preventDefault();

    if (!searchTerm) return;

    try {
      const matchingSuggestion = suggestions.find(suggestion =>
        (suggestion.type === 'user' && suggestion.username.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (suggestion.type === 'product' && suggestion.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );

      if (matchingSuggestion) {
        const route = matchingSuggestion.type === 'user'
          ? `/customers/${matchingSuggestion._id}`
          : `/products/${matchingSuggestion._id}`;
        navigate(route, { state: { [matchingSuggestion.type]: matchingSuggestion } });
        setSearchTerm(''); // Clear search term after navigation
        setSuggestions([]); // Clear suggestions after navigation
      } else {
        alert('No user or product found with that name!');
      }
    } catch (error) {
      console.error('Search error:', error);
      alert('An error occurred while searching.');
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const route = suggestion.type === 'user'
      ? `/customers/${suggestion._id}`
      : `/products/${suggestion._id}`;
    
    // Set the state object key based on the suggestion type
    const state = suggestion.type === 'user' 
      ? { customer: suggestion } 
      : { product: suggestion };
    
    navigate(route, { state });
    
    setSearchTerm(''); // Clear search term after navigation
    setSuggestions([]); // Clear suggestions after navigation
  };
  

  return (
    <nav className="bg-white shadow-md z-50 w-[calc(100%-240px)] fixed top-0 left-60 p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div className="flex items-center justify-between w-full">
        <span className="text-xl font-semibold text-gray-700">{selectedItem}</span>
        <form className="relative flex items-center mt-2 sm:mt-0" onSubmit={handleSearch}>
          <input
            className="bg-white text-black border border-gray-300 rounded p-2 mr-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            type="search"
            placeholder="Search Here ..."
            aria-label="Search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="bg-white text-orange-500 p-2 hover:text-orange-600" type="submit">
            <FaSearch />
          </button>
          {searchTerm && suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full bg-white border border-gray-300 mt-1 rounded-lg shadow-lg z-10">
              {suggestions.map((suggestion, index) => (
                <li
                  key={index}
                  className="p-2 text-black cursor-pointer hover:bg-gray-100"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  {suggestion.username || suggestion.name}
                </li>
              ))}
              {loading && <li className="p-2 text-gray-500">Loading...</li>}
            </ul>
          )}
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
