import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaTrash } from 'react-icons/fa';
import { getProducts, unlikeProduct } from '../User api/Methods';

const ProductItem = ({ name, price, image, onUnlike }) => (
  <div className="bg-white p-4 rounded-lg flex items-center shadow mb-4">
    <img src={image} alt="Product" className="w-24 h-24 rounded-lg mr-4" />
    <div className="flex-1">
      <p className="text-gray-700 text-base">{name}</p>
      <span className="text-black text-lg font-bold mt-2 block">{price}</span>
      <div className="flex items-center mt-2">
        <button className="bg-[#ff8c72] text-white px-4 py-2 rounded-lg text-sm mr-2 hover:bg-[#ff705b]">
          Acheter
        </button>
        <div className="text-[#ff8c72] p-2 cursor-pointer" onClick={onUnlike}>
          <FaTrash />
        </div>
      </div>
    </div>
  </div>
);

const Wishlist = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts();
        const likedProducts = fetchedProducts.filter(product =>
          product.likes.length > 0 // Filtrer les produits qui ont au moins un like
        );
        setProducts(likedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleUnlike = async (productId) => {
    try {
      await unlikeProduct(productId); // Suppose que cette fonction gère l'utilisateur automatiquement
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error unliking product:', error);
    }
  };

  return (
    <div className="bg-[#f9d2c4] p-5 rounded-lg shadow-md mx-auto w-[1180px] h-[580px]">
      <h1 className="text-xl font-bold text-gray-900 mb-5">
        Votre liste d’envies ({products.length})
      </h1>
      {products.length > 0 ? (
        products.map(product => (
          <ProductItem
            key={product._id}
            name={product.name}
            price={product.price}
            image={product.imageUrl}
            onUnlike={() => handleUnlike(product._id)}
          />
        ))
      ) : (
        <p className="text-gray-700">Votre liste d'envies est vide.</p>
      )}
    </div>
  );
};

export default Wishlist;
