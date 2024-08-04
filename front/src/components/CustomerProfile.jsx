import React from 'react';
import { useLocation } from 'react-router-dom';

const CustomerProfile = () => {
  const location = useLocation();
  const customer = location.state?.customer;

  if (!customer) {
    return <p>Select a customer to view their profile</p>;
  }

  const customerComments = [
    { productId: 1, productName: 'Product A', productImage: 'https://via.placeholder.com/80', comment: 'Great product, highly recommend!' },
    { productId: 2, productName: 'Product B', productImage: 'https://via.placeholder.com/80', comment: 'Not satisfied with the quality.' },
    { productId: 3, productName: 'Product C', productImage: 'https://via.placeholder.com/80', comment: 'Excellent value for money.' },
    // Add more comments as needed
  ];

  return (
    <div className="w-full md:w-[75%] bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <img 
          src="https://via.placeholder.com/150" 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-gray-700 text-xl font-semibold">{customer.name}</p>
          <p className="text-gray-500 text-sm">{customer.email}</p>
        </div>
      </div>
      <button 
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-6"
      >
        Block Customer
      </button>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Comments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {customerComments.map((comment) => (
            <div key={comment.productId} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="flex items-start mb-2">
                <img 
                  src="https://via.placeholder.com/50" 
                  alt="Customer" 
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div className="flex-1">
                  <p className="text-gray-800">{comment.comment}</p>
                </div>
              </div>
                <img 
                  src={comment.productImage} 
                  alt={comment.productName} 
                  className="w-[75%] h-20 rounded object-cover mx-4 mt-5"
                />
              <p className="text-gray-700">{comment.productName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;
