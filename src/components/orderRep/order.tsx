import React from 'react';
import './order.css';
import Navbar from '../navbar/navbar';

interface Order {
  id: string;
  date: string;
  customerName: string;
  location: string;
  amount: string;
  status: string;
}

const orders: Order[] = [
  { id: '#4546563', date: '26 March 2020, 12:42 AM', customerName: 'Roberto Carlo', location: 'Mumbai', amount: '$34.41', status: 'New Order' },
  { id: '#4546563', date: '26 March 2020, 12:42 AM', customerName: 'Roberto Carlo', location: 'Mumbai', amount: '$34.41', status: 'Preparing' },
  { id: '#4546563', date: '26 March 2020, 12:42 AM', customerName: 'Roberto Carlo', location: 'Mumbai', amount: '$34.41', status: 'Delivered' },
  { id: '#4546563', date: '26 March 2020, 12:42 AM', customerName: 'Roberto Carlo', location: 'Mumbai', amount: '$34.41', status: 'Preparing' },
  { id: '#4546563', date: '26 March 2020, 12:42 AM', customerName: 'Roberto Carlo', location: 'Mumbai', amount: '$34.41', status: 'Preparing' },
  { id: '#4546563', date: '26 March 2020, 12:42 AM', customerName: 'Roberto Carlo', location: 'Mumbai', amount: '$34.41', status: 'Delivered' },
  { id: '#4546563', date: '26 March 2020, 12:42 AM', customerName: 'Roberto Carlo', location: 'Mumbai', amount: '$34.41', status: 'New Order' },
  // Ajoutez d'autres commandes si nécessaire
];

const OrdersTable: React.FC = () => {
  return (
    <div className='order'>
          <Navbar />
    <div className="orders-container">
      <div className="orders-header">
        <h2>Orders</h2>
        <p>Here is your order list data</p>
        <button className="filter-button"><span className='span'>Filter Order</span> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="sliders2" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M10.5 1a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V4H1.5a.5.5 0 0 1 0-1H10V1.5a.5.5 0 0 1 .5-.5M12 3.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5m-6.5 2A.5.5 0 0 1 6 6v1.5h8.5a.5.5 0 0 1 0 1H6V10a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5M1 8a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2A.5.5 0 0 1 1 8m9.5 2a.5.5 0 0 1 .5.5v4a.5.5 0 0 1-1 0V13H1.5a.5.5 0 0 1 0-1H10v-1.5a.5.5 0 0 1 .5-.5m1.5 2.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 0 1h-2a.5.5 0 0 1-.5-.5"/>
</svg></button>
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
          {orders.map((order, index) => (
            <tr key={index}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.customerName}</td>
              <td>{order.location}</td>
              <td>{order.amount}</td>
              <td className='td'>
                <span className={`status ${order.status.toLowerCase().replace(' ', '-')}`}>
                  {order.status}
                </span>
                <button className="actions-buttons">...</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table></div>
    </div></div>
  );
};

export default OrdersTable;
