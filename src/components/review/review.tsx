import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Sidebar from '../sidebar/sidebar';
import './review.css';

interface Review {
  rating: number;
  comment: string;
}

interface Product {
  imageUrl: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  reviews: Review[];
}

const ProductReview: React.FC = () => {
  const location = useLocation();
  const state = location.state as { product: Product };

  const [visibleComments, setVisibleComments] = useState(2);

  if (!state || !state.product) {
    return <p>Product data is not available.</p>;
  }

  const product = state.product;

  const handleLoadMore = () => {
    setVisibleComments(prev => prev + 5);
  };

  return (
    <div className='review'>
      <Sidebar />
      <div className='revieww'>
        <div className='product-header'>
          <img src={product.imageUrl} alt={product.name} className='product-image' />
          <div className='product-details'>
            <h2 className='product-name'>{product.name}</h2>
            <p className='product-description'>{product.description}</p>
            <div className='product-rating'>
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className={index < product.rating ? 'star-filled' : 'star-empty'} />
              ))}
              <span className='rating-count'>({product.rating})</span>
            </div>
            <p className='product-price'>${product.price}</p>
          </div>
        </div>
        
        <div className='reviews-section'>
          <h2>Reviews</h2>
          <div className='reviews-list'>
            {product.reviews.slice(0, visibleComments).map((review, index) => (
              <div key={index} className='review-item'>
                <div className='reviewer-info'>
                  <img src="https://via.placeholder.com/100" alt="Buyer" className='reviewer-avatar' />
                  <div>
                    <p className='reviewer-name'>Jack Sparrow</p>
                    <p className='reviewer-email'>bob@example.com</p>
                  </div>
                </div>
                <div className='review-content'>
                  <div className='review-rating'>
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                    ))}
                    <span className='rating-count'>({review.rating})</span>
                  </div>
                  <p className='review-text'>{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
          {visibleComments < product.reviews.length && (
            <div className='load-more'>
              <button onClick={handleLoadMore} className='load-more-button'>
                View More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReview;
