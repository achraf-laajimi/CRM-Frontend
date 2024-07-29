import React from 'react';
import './review.css';
import Navbar from '../navbar/navbar';

const reviews = [
  {
    name: "Glee Smiley",
    date: "24 JUNE 2022",
    time: "12:42 AM",
    content: "We recently hadhbhbjuhjnhhhoj. Good quality, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!",
    tags: ["Great", "Good Services"]
  },
  {
    name: "Dracule Mihawk",
    date: "24 JUNE 2022",
    time: "12:42 AM",
    content: "We recently hadhbhbjuhjnhhhoj. Good quality, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!",
    tags: ["Recommended", "Great"]
  },
  {
    name: "Samuel Hawkins",
    date: "24 JUNE 2022",
    time: "12:42 AM",
    content: "We recently hadhbhbjuhjnhhhoj. Good quality, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!",
    tags: []
  },
  {
    name: "Dicky Sitompul",
    date: "24 JUNE 2022",
    time: "12:42 AM",
    content: "We recently hadhbhbjuhjnhhhoj. Good quality, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back!",
    tags: ["Delicious", "Excellent"]
  },
];

const newestReview = {
  name: "Dicky Sitompul",
  rating: 4.5,
  content: "We recently hadhbhbjuhjnhhhoj. Good quality, pleasant environment, personal attention through all the evening. Thanks to the team and we will be back! .",
  tags: ["Great", "Good Services"]
};

const Reviews: React.FC = () => {
  return (
    <div className='review'>
        <Navbar/>
        <div className='revieww'>
        <div className="reviews-header">
          <h2>Reviews</h2>
          <p>Customer Reviews</p>
        </div>
    <div className="reviews">
    
      <div className="recent-review">
      <div className="jou">
        <h2>Recent Review</h2>
        <div className='lat'><span>latest</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi3" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"/>
</svg></div></div>
        <p className='pp'>Here is customer review</p>
        <div className="reviews-list">
          {reviews.map((review, index) => (
            <div className="review-item" key={index}>
              <img src={`https://randomuser.me/api/portraits/med/${index % 2 === 0 ? 'women' : 'men'}/${index + 1}.jpg`} alt={review.name} />
              <div>
               
                <h3>{review.name}</h3>
              
                <p className='p'>{review.date}, ({review.time})</p>
                <p className='p1'>{review.content}</p>
                <div className="tags">
                  {review.tags.map((tag, idx) => (
                    <span className="tag" key={idx}>{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="newest-review">
        <div className="kat">
        <h3>Newest</h3>
        <div className="katt">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi1" viewBox="0 0 16 16" stroke='0.2'>
  <path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
</svg><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi2" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708"/>
</svg></div></div>
        <div className="review-item">
          <img src="https://randomuser.me/api/portraits/med/women/1.jpg" alt={newestReview.name} />
          <div>
            <h4>{newestReview.name}</h4>
            <div className="rating">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>☆</span>
              <span>{newestReview.rating}</span>
            </div>
            <p>{newestReview.content}</p>
            <div className="tagss">
              {newestReview.tags.map((tag, idx) => (
                <span className="tag" key={idx}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div></div>
    </div></div>
  );
};

export default Reviews;
