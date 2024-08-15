import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getOrders } from '../../api/orderRep';
import Sidebar from '../sidebar/sidebar';
import './order.css';

interface Order {
  _id: string;
  createdAt: string;
  paymentMethod: string;
  shippingAddress: string;
  totalAmount: string;
  status: string;
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const ordersPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to load orders. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

  const totalPages = Math.ceil(orders.length / ordersPerPage);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePlaceOrder = () => {
    navigate('/passer');
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className='order'>
      <Sidebar />
      <div className="orders-container">
        <div className="orders-header">
          <h2>Orders</h2>
          <p>Here is your order list data</p>
        </div>
        {loading ? (
          <p>Loading orders...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <>
            <div className='tablou'>
              <table className="orders-table">
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Payment Method</th>
                    <th>Location</th>
                    <th>Amount</th>
                    <th>Status Order</th>
                  </tr>
                </thead>
                <tbody>
                  {currentOrders.map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td>{order.paymentMethod}</td>
                      <td>{order.shippingAddress}</td>
                      <td>{order.totalAmount}</td>
                      <td className='td'>
                        <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
           {/*  <div className="pagination">
              <button 
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button 
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div> */}
            <div className='mt'>
              <button className="upload-photo" onClick={handlePlaceOrder}>Place New Order</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrdersTable;
