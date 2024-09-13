import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaList } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { RiProfileLine, RiDashboardFill, RiNotificationBadgeFill } from "react-icons/ri";
import { logoutUser } from '../api/UserMethods';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sidebar = ({ setSelectedItem }) => {
  const handleLogout = async ()=> {
    try {
      console.log('Attempting to log out...');
      await logoutUser(); // Cette fonction appelle le backend et nettoie le cookie
      Cookies.remove('token');
      toast.success('Logout successful!');
      window.location.href = '/login';
   
      console.log('Logout successful, navigating to login...');
  
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };
  return (
    <div className="bg-white w-60 p-3 flex flex-col h-screen fixed border-r border-gray-200">
      <div className="flex gap-2 px-1 py-3">
        <h1 className="text-neutral-800 text-lg font-semibold mb-5">title</h1>
      </div>
      <div className="py-8 flex flex-col space-y-2.5 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-left gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
          onClick={() => setSelectedItem('Dashboard')}
        >
          <RiDashboardFill className="text-xl ml-[-80px]" />
          <span>Dashboard</span>
        </NavLink>
        <NavLink
          to="/customers"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
          onClick={() => setSelectedItem('Customers')}
        >
          <FaUsers className="text-xl ml-[-80px]" />
          <span>Customers</span>
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
          onClick={() => setSelectedItem('Products')}
        >
          <MdOutlineProductionQuantityLimits className="text-xl ml-[-90px]" />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
          onClick={() => setSelectedItem('Orders')}
        >
          <FaList className="text-xl ml-[-95px]" />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
          onClick={() => setSelectedItem('Profile Settings')}
        >
          <RiProfileLine className="text-xl ml-[-45px]" />
          <span>Profile Settings</span>
        </NavLink>
        <NavLink
          to="/notifications"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
          onClick={() => setSelectedItem('Notifications')}
        >
          <RiNotificationBadgeFill className="text-xl ml-[-60px]" />
          <span>Notifications</span>
        </NavLink>
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-gray-200 mt-auto">
      <button onClick={handleLogout} className="logout-btn">
        <CiLogout /> Logout
      </button>
      </div>
    </div>
  );
};

export default Sidebar;
