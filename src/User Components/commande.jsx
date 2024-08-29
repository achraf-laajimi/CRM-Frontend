import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const Commande = () => {
  const [cartItems, setCartItems] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const storedCartItems = JSON.parse(localStorage.getItem(`cartItems_${userId}`)) || [];
      
      // Process cart items to ensure they are unique and aggregate quantities
      const processedItems = [];
      const processedQuantities = {};
      
      storedCartItems.forEach(item => {
        if (processedQuantities[item._id]) {
          processedQuantities[item._id] += 1;
        } else {
          processedQuantities[item._id] = 1;
          processedItems.push(item);
        }
      });

      setCartItems(processedItems);
      setQuantities(processedQuantities);
    }
  }, [userId]);

  const handleQuantityChange = (productId, delta) => {
    if (!userId) return;

    setQuantities(prev => {
      const newQuantity = Math.max((prev[productId] || 1) + delta, 0);

      const updatedCartItems = newQuantity === 0
        ? cartItems.filter(item => item._id !== productId)
        : cartItems.map(item =>
            item._id === productId
              ? { ...item, quantity: newQuantity }
              : item
          );

      if (newQuantity === 0) {
        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(updatedCartItems));
      } else {
        const existingItemIndex = updatedCartItems.findIndex(item => item._id === productId);
        if (existingItemIndex > -1) {
          updatedCartItems[existingItemIndex] = { ...updatedCartItems[existingItemIndex], quantity: newQuantity };
        } else {
          updatedCartItems.push({ _id: productId, quantity: newQuantity });
        }
        localStorage.setItem(`cartItems_${userId}`, JSON.stringify(updatedCartItems));
      }

      return {
        ...prev,
        [productId]: newQuantity,
      };
    });
  };

  const handleRemoveItem = (productId) => {
    if (!userId) return;

    const updatedCartItems = cartItems.filter(item => item._id !== productId);
    setCartItems(updatedCartItems);
    localStorage.setItem(`cartItems_${userId}`, JSON.stringify(updatedCartItems));
    setQuantities(prev => {
      const newQuantities = { ...prev };
      delete newQuantities[productId];
      return newQuantities;
    });
  };

  const totalItemsInCart = Object.values(quantities).reduce((total, qty) => total + qty, 0);

  return (
    <div className="bg-gray-100 p-4 min-h-screen w-full max-w-7xl mx-auto rounded-lg w-[1200px]">
      <div className="flex justify-between items-center bg-white p-4 shadow mb-4 rounded-lg">
        <div className="text-orange-500 text-2xl font-bold">Nom-Site</div>
        <div className="relative">
          <div className="text-2xl">🛒</div>
          <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItemsInCart}
          </span>
        </div>
      </div>

      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <h2 className="text-xl font-bold">Panier ({totalItemsInCart})</h2>
        </div>

        {cartItems.length === 0 ? (
          <p className="text-neutral-600">Votre panier est vide.</p>
        ) : (
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item._id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover" />
                <div className="flex-1">
                  <div className="text-gray-800">{item.name}</div>
                  <div className="text-sm text-gray-500">{item.description}</div>
                </div>
                <div className="text-right">
                  <div className="text-orange-500 font-bold">{item.price} $</div>
                  <div className="text-sm text-gray-400 line-through">{item.oldPrice} $</div>
                  <div className="text-sm text-red-500">-{item.discount}%</div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleQuantityChange(item._id, -1)}
                    className="px-2 py-1 bg-gray-200 text-gray-600 rounded"
                  >
                    -
                  </button>
                  <span className="mx-2">{quantities[item._id]}</span>
                  <button
                    onClick={() => handleQuantityChange(item._id, 1)}
                    className="px-2 py-1 bg-orange-500 text-white rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => handleRemoveItem(item._id)}
                    className="text-red-500 bg-transparent border-0 cursor-pointer"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                      <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                    </svg>
                    SUPPRIMER
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Commande;
