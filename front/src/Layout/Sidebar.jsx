import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaUsers, FaList } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { CiLogout } from "react-icons/ci";
import { RiProfileLine, RiDashboardFill, RiNotificationBadgeFill } from "react-icons/ri";

const Sidebar = ({ setSelectedItem }) => {
  return (
    <div className="bg-white w-60 p-3 flex flex-col h-screen fixed border-r border-gray-200">
      <div className="flex items-center gap-2 px-1 py-3">
        <h1 className="text-neutral-800 text-lg font-semibold">title</h1>
      </div>
      <div className="py-8 flex flex-1 flex-col space-y-2.5 ">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
          onClick={() => setSelectedItem('Dashboard')}
        >
          <RiDashboardFill className="text-xl" />
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
          <FaUsers className="text-xl" />
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
          <MdOutlineProductionQuantityLimits className="text-xl" />
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
          <FaList className="text-xl" />
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
          <RiProfileLine className="text-xl" />
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
          <RiNotificationBadgeFill className="text-xl" />
          <span>Notifications</span>
        </NavLink>
      </div>
      <div className="flex flex-col gap-0.5 pt-2 border-t border-gray-200 mt-auto">
        <NavLink
          to="/logout"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
          onClick={() => setSelectedItem('LogOut')}
        >
          <CiLogout className="text-xl" />
          <span>LogOut</span>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
