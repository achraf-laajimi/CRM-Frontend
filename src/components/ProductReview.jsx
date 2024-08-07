// src/components/ProductReview.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';

const ProductReview = () => {
  const { state } = useLocation();
  if (!state || !state.product) {
    return <p>Product data is not available.</p>;
  }
  const product = state.product;

  // Load more state
  const [visibleComments, setVisibleComments] = useState(2);

  // Handle load more
  const handleLoadMore = () => {
    setVisibleComments(prev => prev + 5);
  };

  return (
    <div className='max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg'>
      <div className='flex items-center'>
        <img className='w-64 h-60 rounded-lg mr-4' src={`https://via.placeholder.com/150?text=${product.name}`} alt={product.name} />
        <div className='space-y-3.5 mx-5'>
          <h2 className='text-2xl font-bold text-gray-500'>{product.name}</h2>
          <p className='text-black'>jkdkvfj jkhvsdd khjjjjjjjjjjjj jhhhkkkkkkkkkkkk hjsdcxiuj jhuiiiiiuh 120X451CM</p>
          <div className='flex items-center'>
            {[...Array(5)].map((_, index) => (
              <FaStar key={index} className={index < product.rating ? 'text-yellow-500' : 'text-gray-300'} />
            ))}
            <span className='ml-2 text-gray-600'>({product.rating})</span>
          </div>
          <p className='text-xl font-bold text-green-600'>${product.price}</p>
        </div>
      </div>
      <div className='mt-10'>
        <h2 className='text-2xl text-black font-semibold mb-4'>Reviews</h2>
        <div className='space-y-4'>
          {product.comments.slice(0, visibleComments).map((comment, index) => (
            <div key={index} className='border-t pt-4 mt-4 flex'>
              <div className='w-1/4 flex items-start mr-4'>
                <img className='w-12 h-12 rounded-full' src="https://via.placeholder.com/100" alt="Buyer" />
                <div className='ml-3'>
                  <p className='text-gray-600'>Jack Sparrow</p>
                  <p className='text-gray-400'>bob@example.com</p>
                </div>
              </div>
              <div className='w-3/4'>
                <div className='flex mb-2 items-center justify-end'>
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className={i < comment.rating ? 'text-yellow-500' : 'text-gray-300'} />
                  ))}
                  <span className='ml-2 text-gray-600'>({comment.rating})</span>
                </div>
                <p className='text-gray-700 text-right'>{comment.text}</p>
              </div>
            </div>
          ))}
        </div>
        {visibleComments < product.comments.length && (
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
