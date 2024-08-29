import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts } from '../User api/Methods'; // Assurez-vous que le chemin est correct
import { jwtDecode } from 'jwt-decode';

const ProductItem = ({ product, onBuy }) => (
  <div className="bg-white p-4 rounded-lg flex items-center shadow mb-4 w-[800px] ml-[182px]">
    <img src={product.imageUrl} alt={product.name} className="w-24 h-24 rounded-lg mr-4" />
    <div className="flex-1">
      <p className="text-gray-700 text-base">{product.name}</p>
      <span className="text-black text-lg font-bold mt-2 block">{product.price}</span>
      <div className="flex items-center mt-2">
        <button
          className="bg-[#ff8c72] text-white px-4 py-2 rounded-lg text-sm mr-2 hover:bg-[#ff705b] ml-[535px]"
          onClick={() => onBuy(product)}
        >
          Acheter
        </button>
      </div>
    </div>
  </div>
);

const Wishlist = () => {
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Extract user ID from token
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
    const fetchProducts = async () => {
      if (!userId) return; // Don't fetch products if userId is not set

      try {
        const fetchedProducts = await getProducts();
        const likedProducts = fetchedProducts.filter(product => 
          product.likes.includes(userId)
        );
        setProducts(likedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [userId]);
  const handleBuy = (product) => {
    let cart = JSON.parse(localStorage.getItem('cartItems')) || [];
    const existingProductIndex = cart.findIndex(item => item._id === product._id);

    if (existingProductIndex > -1) {
      // If the product is already in the cart, increase its quantity
      cart[existingProductIndex].quantity = (cart[existingProductIndex].quantity || 1) + 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem('cartItems', JSON.stringify(cart));
    navigate('/vos-commandes');
  };

  return (
    <div className="bg-[#f9d2c4] p-5 rounded-lg shadow-md mx-auto w-[1180px] h-[580px] overflow-auto">
      <h1 className="text-xl font-bold text-gray-900 mb-5">
        Votre liste d’envies ({products.length})
      </h1>
      {products.length > 0 ? (
        products.map(product => (
          <ProductItem
            key={product._id}
            product={product}
            onBuy={handleBuy}
          />
        ))
      ) : (
        <p className="text-gray-700">Votre liste d'envies est vide.</p>
      )}
    </div>
  );
};

export default Wishlist;


  {/* <div
          className="text-[#ff8c72] p-2 cursor-pointer"
          onClick={() => onUnlike(product.id)} // Utilisez le prop onUnlike
        >
          <FaTrash />
        </div> */}