import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './order.css';
import Navbar from '../navbar/navbar';
import { getOrders } from '../../api/orderRep';

// Définir l'interface pour le type Order
interface Order {
  id: string;
  createdAt: string;
  customer: string;
  shippingAddress: string;
  totalAmount: string;
  status: string;
}

const OrdersTable: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]); // Typage du state avec Order[]
  const [currentPage, setCurrentPage] = useState<number>(1);
  const ordersPerPage = 15;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const fetchedOrders = await getOrders(); // Assurez-vous que getOrders renvoie des données de type Order[]
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

  // Handle previous page
  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  // Handle next page
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handlePlaceOrder = () => {
    navigate('/place-order'); // Redirection vers la page pour passer une nouvelle commande
  };

  return (
    <div className='order'>
      <Navbar />
      <div className="orders-container">
        <div className="orders-header">
          <h2>Orders</h2>
          <p>Here is your order list data</p>
          <button className="filter-button">
            <span className='span'>Filter Order</span>
          </button>
        </div>
        <div className='tablou'>
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer Name</th>
                <th>Location</th>
                <th>Amount</th>
                <th>Status Order</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{formatDate(order.createdAt)}</td>
                  <td>{order.customer}</td>
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
