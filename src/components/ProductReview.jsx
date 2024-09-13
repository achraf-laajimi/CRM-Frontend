// src/components/ProductReview.jsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import { getUser } from '../api/UserMethods'; // Make sure to import getUser

const ProductReview = () => {
  const { state } = useLocation();
  const [userDetails, setUserDetails] = useState({});
  const [visibleComments, setVisibleComments] = useState(2);

  if (!state || !state.product) {
    return <p>Product data is not available.</p>;
  }
  const product = state.product;

  // Calculate average rating
  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) return 0;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (totalRating / reviews.length).toFixed(1);
  };

  // Fetch user details
  const fetchUserDetails = async (userId) => {
    try {
      const user = await getUser(userId);
      setUserDetails(prev => ({ ...prev, [userId]: user }));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    // Fetch details for all users in reviews
    product.reviews.forEach(review => {
      if (!userDetails[review.user]) {
        fetchUserDetails(review.user);
      }
    });
  }, [product.reviews, userDetails]);

  function handleLoadMore() {
    setVisibleComments(prev => prev + 5);
  }

  return (
    <div className='w-[900px] mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <div className='flex items-center'>
        <img className='w-64 h-60 rounded-lg mr-4' src={product.imageUrl} alt={product.name} />
        <div className='space-y-3.5 mx-5'>
          <h2 className='text-2xl font-bold text-gray-500'>{product.name}</h2>
          <p className='text-black'>{product.description}</p>
          <div className='flex items-center'>
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className={index < Math.round(calculateAverageRating(product.reviews)) ? 'text-yellow-500' : 'text-gray-300'} />
            ))}
            <span className='ml-2 text-gray-600'>({calculateAverageRating(product.reviews)})</span>
          </div>
          <p className='text-xl font-bold text-green-600'>${product.price}</p>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-2xl text-black font-semibold mb-4'>Reviews</h2>
        <div className='space-y-4'>
          {product.reviews.slice(0, visibleComments).map((review, index) => {
            const user = userDetails[review.user] || {}; // Fetch user details or use empty object if not available
            return (
              <div key={index} className='border-t pt-4 mt-4 flex'>
                <div className='w-1/4 flex items-start mr-4'>
                  <img className='w-12 h-12 rounded-full' src="https://via.placeholder.com/100" alt="Buyer" />
                  <div className='ml-3'>
                    <p className='text-gray-600'>{user.username || 'Unknown User'}</p>
                    <p className='text-gray-400'>{user.email || 'Unknown Email'}</p>
                  </div>
                </div>
                <div className='w-3/4'>
                  <div className='flex mb-2 items-center justify-end'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'text-yellow-500' : 'text-gray-300'} />
                    ))}
                    <span className='ml-2 text-gray-600'>({review.rating})</span>
                  </div>
                  <p className='text-gray-700 text-right'>{review.comment}</p>
                </div>
              </div>
            );
          })}
        </div>
        {visibleComments < product.reviews.length && (
          <div className='flex justify-center mt-4'>
            <button 
              onClick={handleLoadMore}
              className='px-4 py-2 bg-orange-500 text-white rounded-md'
            >
              View More
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductReview;
