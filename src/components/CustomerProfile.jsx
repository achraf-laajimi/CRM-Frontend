import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { blockUser } from '../api/UserMethods';
import { getComments } from '../api/ProductMethods';

const CustomerProfile = () => {
  const location = useLocation();
  const customer = location.state?.customer;
  const [customerComments, setCustomerComments] = useState([]);

  if (!customer) {
    return <p>Customer does not exist</p>;
  }

  useEffect(() => {
    const fetchCustomerComments = async () => {
      if (customer && customer._id) {
        try {
          const reviews = await getComments(customer._id);
          console.log('Fetched reviews:', reviews);
          // Assuming reviews contain product information
          setCustomerComments(reviews);
        } catch (error) {
          console.error('Error fetching customer comments:', error);
        }
      }
    };

    fetchCustomerComments();
  }, [customer]);

  const block = async () => {
    try {
      await blockUser(customer._id); // Use '_id' to correctly reference the customer ID
      alert('Customer has been blocked successfully.');
    } catch (error) {
      console.error('Error blocking customer:', error);
      alert('Failed to block the customer.');
    }
  };

  return (
    <div className="w-full md:w-[75%] bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <img 
          src={customer.imageUrl} 
          alt="Profile" 
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="ml-4">
          <p className="text-gray-700 text-xl font-semibold">{customer.firstName} {customer.lastName} (Full Name)</p>
          <p className="text-gray-500 text-sm">{customer.email}</p>
        </div>
      </div>
      <button 
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 mb-6" onClick={block}
      >
        Block Customer
      </button>
      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-700">Comments</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {customerComments.map((comment) => (
            <div key={comment._id} className="bg-gray-50 p-4 rounded-lg shadow-sm flex flex-col items-center">
              <div className="flex items-start mb-2">
                <img 
                  src={customer.imageUrl} 
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
                  className="w-[75%] h-24 rounded  mx-4 mt-5"
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
