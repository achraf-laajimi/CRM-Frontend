import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../api/OrderMethods';
import { getUser } from '../api/UserMethods';
import { getOrderStatus } from '../helpers';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [userDetails, setUserDetails] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;
  const navigate = useNavigate();
  const [error, setError] = useState('');

  const fetchUserDetails = async (userId) => {
    try {
      const user = await getUser(userId);
      setUserDetails(prev => ({ ...prev, [userId]: user }));
    } catch (err) {
      setError('Error fetching user data');
      console.error('Error fetching user details:', err);
    }
  };

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);

        fetchedOrders.forEach(order => {
          let userId = '';

          if (order.user) {
            // Check if user is an object and has an _id
            if (typeof order.user === 'string') {
              userId = order.user; // User ID is already a string
            } else if (order.user._id) {
              userId = order.user._id.toString(); // Convert ObjectId to string
            } else {
              console.error('Invalid user object:', order.user);
            }

            // Fetch user details if not already fetched
            if (userId && !userDetails[userId]) {
              fetchUserDetails(userId);
            }
          }
        });
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [userDetails]);

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  function handlePreviousPage() {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  }

  function handleNextPage() {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  }

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col items-center mx-5">
      <div className="flex flex-col w-[1000px] bg-white p-4 shadow-md rounded-lg">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Customer Orders</h2>
          <p className="text-gray-700 mb-4">All the orders placed by different customers are shown below.</p>
          <div className="overflow-x-auto">
            <table className="border-separate border border-slate-500 min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">CUSTOMER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">ADDRESS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">DATE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">REVENUE</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => {
                  const user = userDetails[order.user?._id || order.user] || {}; // Handle both object and string IDs
                  return (
                    <tr key={order._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.username || 'Unknown'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.shippingAddress}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatDate(order.createdAt)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getOrderStatus(order.status)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.totalAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-gray-300 p-4 mt-4">
          <p className="text-gray-700">
            Showing {Math.min(currentPage * ordersPerPage, orders.length)} of {orders.length} Orders
          </p>
          <div>
            <button 
              className="bg-white text-gray-700 py-2 px-4 rounded mr-2 hover:border-transparent hover:text-orange-500" 
              onClick={handlePreviousPage} 
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <button 
              className="bg-white text-gray-700 py-2 px-4 rounded hover:border-transparent hover:text-orange-500" 
              onClick={handleNextPage} 
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
