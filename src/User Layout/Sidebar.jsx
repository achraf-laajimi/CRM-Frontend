import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaMoneyBillWave } from "react-icons/fa";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { RiProfileLine, RiAdvertisementLine, RiQuestionLine } from "react-icons/ri";
import { jwtDecode } from 'jwt-decode';
import { getUser} from '../User api/UserMethods';

const Sidebar = () => {
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const userImage = "/path/to/user-image.jpg"; // Replace this with actual image path

  useEffect(() => {
    // Decode the token to get the user ID
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        setUserId(decodedToken.id); 
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }

    const fetchProfile = async () => {
      if (userId && token) {
        try {
          const userData = await getUser(userId, token);
          console.log(userData);
          setUserName(userData.username);
        } catch (error) {
          console.error('Error fetching profile:', error.response ? error.response.data : error.message);
        }
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <div className="bg-white w-60 p-3 flex flex-col h-screen fixed border-r border-gray-200">
      <div className="flex items-left gap-2 py-3">
        <h1 className="text-neutral-800 text-lg font-semibold">title</h1>
      </div>
      <div className="py-8 flex flex-1 flex-col space-y-2.5 mt-[-296px]">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex items-left gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
        >
          <MdOutlineProductionQuantityLimits className="text-xl ml-[-80px]" />
          <span>Products</span>
        </NavLink>
        <NavLink
          to="/userprofile"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
        >
          <RiProfileLine className="text-xl ml-[-85px]" />
          <span>Profile</span>
        </NavLink>
  {/*       <NavLink
          to="/income"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
        >
          <FaMoneyBillWave className="text-xl" />
          <span>Income</span>
        </NavLink> */}
        <NavLink
          to="/promote"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ml-[-100px]${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
        >
          <RiAdvertisementLine className="text-xl ml-[-69px]" />
          <span>Promote</span>
        </NavLink>
        <NavLink
          to="/help"
          className={({ isActive }) =>
            `flex items-center gap-2 px-2 py-1 text-neutral-400 hover:text-orange-500 ${
              isActive
                ? 'bg-orange-100 border-l-4 border-orange-500 text-orange-500'
                : 'hover:bg-orange-50 hover:border-l-4 hover:border-orange-500'
            }`
          }
        >
          <RiQuestionLine className="text-xl ml-[-100px]" />
          <span>Help</span>
        </NavLink>
      </div>
     {/*  <div className="flex items-center gap-2 px-2 py-1 text-neutral-400 mt-auto">
        <img
          src={userImage}
          alt="User"
          className="w-8 h-8 rounded-full border border-gray-300"
        />
        <span className='text-neutral-800 text-lg font-semibold'>{userName}</span>
      </div> */}
    </div>
  );
};

export default Sidebar;
