import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getOrderStatus } from '../helpers';
import { getOrders } from '../api/OrderMethods';
import { getUser } from '../api/UserMethods';

export default function RecentOrders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const fetchedOrders = await getOrders();
        const sortedOrders = fetchedOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders.slice(0, 6));
      } catch (error) {
        console.error('Error fetching recent orders:', error);
      }
    };

    fetchRecentOrders();
  }, []);

  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Orders</strong>
      <div className="border-x border-gray-200 rounded-sm mt-3">
        <table className="w-full text-gray-700 text-sm">
          <thead>
            <tr className='bg-slate-100'>
              <th className="px-2 py-3 text-left border-b">ID</th>
              <th className="px-2 text-left border-b">Customer</th>
              <th className="px-2 text-left border-b">Products</th>
              <th className="px-2 text-left border-b">Order Date</th>
              <th className="px-2 text-left border-b">Order Total</th>
              <th className="px-2 text-left border-b">Shipping Address</th>
              <th className="px-2 text-left border-b">Order Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td className="px-2 py-3 border-b">
                  <Link to={`/orders/${order._id}`} className="text-blue-400">#{order._id}</Link>
                </td>
                <td className="px-2 border-b">
                  <UserName user={order.user} />
                </td>
                <td className="px-2 border-b">{order.products.length}</td>
                <td className="px-2 border-b">{new Date(order.createdAt).toLocaleDateString()}</td>
                <td className="px-2 border-b">${order.totalAmount.toFixed(2)}</td>
                <td className="px-2 border-b">{order.shippingAddress}</td>
                <td className="px-2 border-b">{getOrderStatus(order.status)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function UserName({ user }) {
  const [userName, setUserName] = useState('Loading...');
  const [id,setId] = useState('')
  useEffect(() => {
    const fetchUserName = async () => {
      if (!user) {
        setUserName('Unknown User');
        return;
      }
      try {
        const userId = typeof user === 'object' && user._id ? user._id : user;
        const fetchedUser = await getUser(userId);

        if (fetchedUser && fetchedUser.username) {
          setUserName(`${fetchedUser.username}`);
          setId(userId);
        } else {
          setUserName('Unknown User');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserName('Error loading user');
      }
    };

    fetchUserName();
  }, [user]);
  
  return (
    <Link to={`/customers/${id}`} state={{ customer: user }} className="text-blue-400"> {userName} </Link>
  );
}
