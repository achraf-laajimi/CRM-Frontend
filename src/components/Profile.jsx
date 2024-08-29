import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    address: '',
    email: '',
    city: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSave = () => {
    // Save profile logic here
    console.log('Profile saved', profile);
  };

  return (
    <div className="flex items-center justify-center ml-5 mt-12">
      <div className="flex flex-col p-6 bg-white rounded-lg shadow-md shadow-orange-500 max-w-4xl w-full md:w-[1000px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-orange-500">Edit Profile</h2>
        </div>
        <div className="flex flex-col md:flex-row items-center">
          <div className="relative mb-6 md:mb-0">
            <img 
              src="https://via.placeholder.com/150" 
              alt="Profile" 
              className="w-44 h-40 rounded-full object-cover"
            />
            <div className="absolute bottom-2 right-2 bg-gray-200 p-1 rounded-full cursor-pointer">
              <FaEdit className="text-gray-700" />
            </div>
          </div>
          <div className="md:ml-10 w-full flex flex-wrap">
            <div className="w-full md:w-1/2 md:pr-4 mb-4">
              <label htmlFor="name" className="block text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 p-2 w-full border border-gray-300 bg-white rounded text-cyan-700"
                value={profile.name}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-4 mb-4">
              <label htmlFor="address" className="block text-gray-700">Address</label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 p-2 w-full border border-gray-300 bg-white rounded text-cyan-700"
                value={profile.address}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 md:pr-4 mb-4">
              <label htmlFor="email" className="block text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 p-2 w-full border border-gray-300 bg-white rounded text-cyan-700"
                value={profile.email}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 md:pl-4 mb-4">
              <label htmlFor="city" className="block text-gray-700">City</label>
              <input
                type="text"
                id="city"
                name="city"
                className="mt-1 p-2 w-full border border-gray-300 bg-white rounded text-cyan-700"
                value={profile.city}
                onChange={handleChange}
              />
            </div>
            <div className="w-full md:w-1/2 md:pr-4 mb-4">
              <label htmlFor="password" className="block text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="mt-1 p-2 w-full border border-gray-300 bg-white rounded text-cyan-700"
                value={profile.password}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button 
            onClick={handleSave} 
            className="bg-orange-500 text-white py-2 px-6 rounded hover:bg-orange-600"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
