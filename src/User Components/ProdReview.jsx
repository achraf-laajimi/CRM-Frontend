import React, { useState, useEffect } from 'react';
import { FaStar, FaPaperPlane, FaTimes } from 'react-icons/fa';
import { addReview, getReviews } from '../User api/Methods'; // Import the API functions

const ProdReview = ({ product, onClose }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    // Fetch the reviews for the product when the component mounts
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await getReviews(product._id);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [product._id]);

  const handleRating = (rate) => {
    setRating(rate);
  };

  const handleCommentSubmit = async () => {
    if (!rating || !comment) {
      alert('Please provide a rating and a comment.');
      return;
    }

    try {
      const newReview = {
        userId: '66b9e52908f4cfb69c52f440', // Replace with actual user ID
        rating,
        comment,
      };
      await addReview(product._id, newReview);
      setReviews([...reviews, newReview]); // Update the reviews state with the new review
      setComment('');
      setRating(0);
    } catch (error) {
      console.error('Error adding review:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 relative w-full max-w-3xl md:max-w-2xl sm:max-w-xl">
        {/* Close button */}
        <FaTimes className="text-gray-500 cursor-pointer absolute top-4 right-4" onClick={onClose} />

        {/* Product Image */}
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-32 h-32 object-cover mx-auto mb-4 sm:w-24 sm:h-24"
        />

        {/* Rating and User Image */}
        <div className="flex items-center mb-4 border-b-2 pb-4 flex-col sm:flex-row">
          <img
            src="path/to/userImage"
            alt="User"
            className="w-12 h-12 rounded-full mb-4 sm:mb-0 sm:mr-4"
          />
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <FaStar
                key={i}
                className={`cursor-pointer ${i <= rating ? 'text-yellow-500' : 'text-gray-300'}`}
                onClick={() => handleRating(i)}
              />
            ))}
          </div>
        </div>

        {/* Reviews Section with Scrolling */}
        <div className="mb-4 max-h-64 sm:max-h-48 overflow-y-auto">
          {reviews.map((review, index) => (
            <div key={index} className="flex items-start mb-4 p-4 bg-gray-100 rounded-lg">
              <img src="path/to/reviewUserImage" alt="User" className="w-10 h-10 rounded-full mr-4" />
              <div>
                <div className="flex space-x-1 mb-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <FaStar
                      key={i}
                      className={`${i <= review.rating ? 'text-yellow-500' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment and Submit Section */}
        <div className="flex items-center mt-4 flex-col sm:flex-row">
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-grow border border-gray-300 rounded-lg p-2 mb-4 sm:mb-0 sm:mr-2 bg-white"
          />
          <FaPaperPlane
            className="text-orange-500 cursor-pointer text-2xl"
            onClick={handleCommentSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdReview;
