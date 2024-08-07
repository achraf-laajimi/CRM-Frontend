// src/components/Products.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrderStatus } from '../helpers'

const allOrders = [
  { id: 1, customer: 'John Doe', product: 'nike', date: '2024/05/14', status: 'NEW ORDER', revenue: 1458},
  { id: 2, customer: 'John Doe', product: 'nike', date: '2024/05/14', status: 'NEW ORDER', revenue: 1458},
  { id: 3, customer: 'John Doe', product: 'nike', date: '2024/05/14', status: 'NEW ORDER', revenue: 1458}
];

const Orders = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 15;
  const navigate = useNavigate();

  const totalPages = Math.ceil(allOrders.length / ordersPerPage);

  const currentOrders = allOrders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  // Handle previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Handle next page
  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  // Navigate to ProductReview
  const handleNavigateToReviews = (product) => {
    navigate(`/product/${product.id}`, { state: { product } });
  };

  return (
    <div className="flex flex-col items-center mx-5">
      <div className="flex flex-col w-[1000px] bg-white p-4 shadow-md rounded-lg">
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-4 text-gray-700">Customer Orders</h2>
          <p className="text-gray-700 mb-4">All the orders which are placed by different customers are showing below with order no. </p>
          <div className="overflow-x-auto">
            <table className="border-separate border border-slate-500 min-w-full divide-y divide-gray-200 bg-white shadow-md rounded-lg">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">CUSTOMER</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">PRODUCT</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">DATE</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">STATUS</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-stone-950 tracking-wider">REVENUE</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.customer}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.product}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{getOrderStatus(order.status)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{order.revenue}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="flex justify-between items-center border-t border-gray-300 p-4 mt-4">
          <p className="text-gray-700">
            Showing {Math.min(currentPage * ordersPerPage, allOrders.length)} of {allOrders.length} Orders
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
