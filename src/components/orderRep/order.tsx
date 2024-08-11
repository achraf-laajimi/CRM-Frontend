import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './order.css';
import Navbar from '../navbar/navbar';
import { getOrders } from '../../api/orderRep';

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
  const ordersPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        setOrders(fetchedOrders);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };
    fetchOrders();
  }, []);

  const currentOrders = orders.slice(
    (currentPage - 1) * ordersPerPage,
    currentPage * ordersPerPage
  );

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

  return (
    <div className='order'>
      <Navbar />
      <div className="orders-container">
        <div className="orders-header">
          <h2>Orders</h2>
          <p>Here is your order list data</p>
        </div>
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
        <div className='mt'>
          <button className="upload-photo" onClick={handlePlaceOrder}>Place New Order</button>
        </div>
      </div>
    </div>
  );
};

export default OrdersTable;
