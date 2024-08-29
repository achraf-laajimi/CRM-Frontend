import React, { useState, useEffect } from 'react';
import { FaHeart, FaShoppingCart, FaFilter, FaTimes, FaCommentDots } from 'react-icons/fa';
import { getProducts, likeProduct, unlikeProduct } from '../User api/Methods';
import ProdReview from './ProdReview';
import { jwtDecode } from 'jwt-decode';

const Promote = ({ filter }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ color: '', gender: '', category: '' });
  const [sortOrder, setSortOrder] = useState('newest');
  const [userId, setUserId] = useState(''); // Remplacez par l'ID utilisateur réel
  const [selectedProduct, setSelectedProduct] = useState(null);

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
    const fetchProducts = async () => {
      try {
        const fetchedProducts = await getProducts(); // Remplacez avec `getPromotionalProducts` si disponible
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
      } catch (error) {
        console.error('Erreur lors du chargement des produits:', error);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    let updatedProducts = products;

    updatedProducts = updatedProducts.filter(product => {
      return (
        (!filters.color || product.colors.includes(filters.color)) &&
        (!filters.gender || product.gender === filters.gender) &&
        (!filters.category || product.category === filters.category)
      );
    });

    if (filter) {
      updatedProducts = updatedProducts.filter(product =>
        product.name.toLowerCase().includes(filter.toLowerCase())
      );
    }

    setFilteredProducts(updatedProducts);
  }, [filter, filters, products]);

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
      console.error('Erreur lors de la mise à jour du statut de like:', error);
    }
  };

  const handleAddToCart = (product) => {
    let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    cartItems.push(product);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const handleCommentClick = (product) => {
    setSelectedProduct(product);
  };

  const closeReviewModal = () => {
    setSelectedProduct(null);
  };

  const calculPromoPrice = (product) => {
    const promo = product.price * (product.promotionDetails / 100);
    return product.price - promo;
  };

  const filteredAndSortedProducts = sortProducts(filteredProducts);

  return (
    <div className="relative px-5 flex flex-col">
      {/* Section supérieure avec les filtres et le tri */}
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-2xl font-bold text-neutral-800">Promotions</h1>
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleFilter}
            className="bg-white border border-gray-300 rounded p-2 flex items-center space-x-2"
          >
            <FaFilter className="text-xl text-neutral-800" />
            <span className="text-neutral-800 font-semibold">Filtres</span>
          </button>
          <div className="flex items-center space-x-4">
            <h2 className="text-lg font-semibold text-neutral-800">Trier par :</h2>
            <select
              value={sortOrder}
              onChange={handleSortChange}
              className="bg-white border border-gray-300 rounded p-2"
            >
              <option value="newest">Nouveautés</option>
              <option value="highestPrice">Prix le plus élevé</option>
              <option value="lowestPrice">Prix le plus bas</option>
            </select>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isFilterOpen && (
        <div className="fixed inset-0 bg-neutral-800 opacity-50 z-40" onClick={toggleFilter}></div>
      )}

      {/* Barre latérale de filtres */}
      {isFilterOpen && (
        <div className="fixed top-0 right-0 w-64 h-full bg-white border-l border-gray-300 p-4 z-50">
          <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-4">
            <h2 className="text-lg font-semibold text-neutral-800">Filtres</h2>
            <button onClick={toggleFilter} className="text-white">
              <FaTimes />
            </button>
          </div>
          {/* Filtres */}
          <div className="space-y-4">
            {/* Filtre par couleur */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Couleurs</h3>
              <label className="block">
                <input
                  type="radio"
                  name="color"
                  value="red"
                  checked={filters.color === 'red'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Rouge
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
                Bleu
              </label>
            </div>
            {/* Filtre par genre */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Genre</h3>
              <label className="block">
                <input
                  type="radio"
                  name="gender"
                  value="men"
                  checked={filters.gender === 'men'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Hommes
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
                Femmes
              </label>
            </div>
            {/* Filtre par catégorie */}
            <div>
              <h3 className="font-semibold text-neutral-800 mb-2">Catégories</h3>
              <label className="block">
                <input
                  type="radio"
                  name="category"
                  value="shoes"
                  checked={filters.category === 'shoes'}
                  onChange={handleFilterChange}
                  className="mr-2"
                />
                Chaussures
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
            </div>
          </div>
        </div>
      )}

      {/* Liste des produits */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map(product => (
            <div key={product._id} className="border-2 border-custom-orange rounded-lg p-4 bg-white relative">
              <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover mb-4" />
              {/* Valeur de la promotion */}
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
                -{product.promotionDetails}%
              </span>
              <h3 className="text-lg font-semibold mb-2 text-neutral-800">{product.name}</h3>
              <p className="text-sm text-neutral-600 mb-2">{product.description}</p>
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-gray-500 line-through">{product.price} $</span>
                <span className="text-green-500">{calculPromoPrice(product)} $</span>
              </div>
              <div className="flex justify-between items-center">
                <button
                  onClick={() => handleLikeClick(product._id, product.likes.includes(userId))}
                  className={`p-2 rounded-full ${
                    product.likes.includes(userId) ? 'text-red-500' : 'text-gray-400'
                  }`}
                >
                  <FaHeart />
                </button>
                <button
                  onClick={() => handleCommentClick(product)}
                  className="p-2 rounded-full text-neutral-800 bg-gray-200"
                >
                  <FaCommentDots />
                </button>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="p-2 rounded-full text-neutral-800 bg-gray-200"
                >
                  <FaShoppingCart />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucun produit trouvé</p>
        )}
      </div>

      {selectedProduct && (
        <ProdReview
          product={selectedProduct}
          onClose={closeReviewModal}
          userId={userId}
        />
      )}
    </div>
  );
};

export default Promote;
