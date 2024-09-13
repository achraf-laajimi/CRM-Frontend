import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaStar } from 'react-icons/fa';
import Navbar from '../navbar/navbar';
import { getUser } from '../../api/apiRep';
import './review.css';

interface Review {
  rating: number;
  comment: string;
  user: string; // userId might be optional if missing
}

interface Product {
  imageUrl: string;
  name: string;
  description: string;
  rating: number;
  price: number;
  reviews: Review[];
}

interface UserDetails {
  username: string;
  email: string;
  imageUrl:string
}

const ProductReview: React.FC = () => {
  const location = useLocation();
  const state = location.state as { product: Product };

  const [userDetails, setUserDetails] = useState<Record<string, UserDetails>>({});
  const [visibleComments, setVisibleComments] = useState(2);

  const product = state?.product;

  useEffect(() => {
    if (!product) return;
  
    console.log('Product:', product);
  
    const fetchUserDetails = async () => {
      try {
        // Check if reviews are present
        if (!product.reviews || product.reviews.length === 0) {
          console.warn('No reviews found for this product.');
          return;
        }
  
        // Map reviews to fetch user data
        const userPromises = product.reviews.map(async (review) => {
          if (!review.user) {
            console.warn('Missing userId for a review:', review);
            return null; // Skip this review if userId is not present
          }
          
          try {
            const userData = await getUser(review.user);
            return { userId: review.user, userDetails: userData };
          } catch (userError) {
            console.error(`Error fetching user data for ID ${review.user}:`, userError);
            return null; // Handle user fetch error
          }
        });
  
        const usersData = await Promise.all(userPromises);
  
        // Log all user data fetched
        console.log('User Data:', usersData);
  
        // Build user details map
        const userDetailsMap = usersData.reduce((acc, user) => {
          if (user) {
            acc[user.userId] = user.userDetails;
          }
          return acc;
        }, {} as Record<string, UserDetails>);
  
        // Update state with user details
        setUserDetails(userDetailsMap);
      } catch (err) {
        console.error('Error fetching user details:', err);
      }
    };
  
    fetchUserDetails();
  }, [product]);
  

  if (!product) {
    return <p>Product data is not available.</p>;
  }

  const handleLoadMore = () => {
    setVisibleComments((prev) => prev + 5);
  };

  return (
    <div className="review">
      <Navbar />
      <div className="revieww">
        <div className="product-header">
          <img src={product.imageUrl} alt={product.name} className="product-image" />
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <div className="product-rating">
              {[...Array(5)].map((_, index) => (
                <FaStar key={index} className={index < product.rating ? 'star-filled' : 'star-empty'} />
              ))}
              <span className="rating-count">({product.rating})</span>
            </div>
            <p className="product-price">${product.price}</p>
          </div>
        </div>

        <div className="reviews-section">
          <h2>Reviews</h2>
          <div className="reviews-list">
            {product.reviews.slice(0, visibleComments).map((review, index) => (
              <div key={index} className="review-item">
                <div className="reviewer-info">
                  <img src={userDetails[review.user]?.imageUrl} alt="Buyer" className="reviewer-avatar" />
                  <div>
                    <p className="reviewer-name">{userDetails[review.user]?.username || 'Unknown User'}</p>
                    <p className="reviewer-email">{userDetails[review.user]?.email || 'No email provided'}</p>
                  </div>
                </div>
                <div className="review-content">
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < review.rating ? 'star-filled' : 'star-empty'} />
                    ))}
                    <span className="rating-count">({review.rating})</span>
                  </div>
                  <p className="review-text">{review.comment}</p>
                </div>
              </div>
            ))}
          </div>
          {visibleComments < product.reviews.length && (
            <div className="load-more">
              <button onClick={handleLoadMore} className="load-more-button">
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
