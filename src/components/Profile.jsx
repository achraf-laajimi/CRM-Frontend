import React, { useState, useEffect } from 'react';
import { FaEdit, FaEye, FaEyeSlash } from 'react-icons/fa';
import {  jwtDecode} from 'jwt-decode';
import { getUser, updateUser } from '../api/UserMethods'; // Replace with your actual API functions

const Profile = () => {
  const [userId, setUserId] = useState('');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    profileImage: '',
    email: '',
    phoneNumber: '',
    role: '',
    adresse: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
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
          const userData = await getUser(userId);
          setProfile({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            userName: userData.username || '',
            email: userData.email || '',
            phoneNumber: userData.telephone || '',
            profileImage: userData.imageUrl,
            role: userData.role || '',
            adresse: userData.adresse || '',
            currentPassword: '',
            newPassword: '',
            confirmNewPassword: '',
          });
        } catch (error) {
          console.error('Error fetching profile:', error.response ? error.response.data : error.message);
        }
      }
    };
    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      if (profile.newPassword !== profile.confirmNewPassword) {
        alert('New passwords do not match');
        return;
      }

      const updateData = {
        firstName: profile.firstName,
        lastName: profile.lastName,
        username: profile.userName,
        email: profile.email,
        telephone: profile.phoneNumber,
        adresse: profile.adresse,
        ...(profile.newPassword && { password: profile.newPassword }),
        ...(profile.profileImage !== 'https://via.placeholder.com/150' && { imageUrl: profile.profileImage }),
      };

      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (token) {
        const response = await updateUser(userId, updateData);

        if (response._id === userId) {
          alert('Profile updated successfully');
        } else {
          alert('Failed to update profile');
        }
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Error updating profile');
    }
  };

  const togglePasswordVisibility = (field) => {
    if (field === 'currentPassword') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'newPassword') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirmNewPassword') {
      setShowConfirmNewPassword(!showConfirmNewPassword);
    }
  };

  return (
    <div className="flex items-center justify-center ml-5 mt-12">
      <div className="flex flex-col p-6 bg-white rounded-lg shadow-md shadow-orange-500 max-w-4xl w-full md:w-[1000px]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-orange-500">Edit Profile</h2>
        </div>
        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="relative mb-6 md:mb-0">
          {/*   <img
              src={profile.profileImage}
              alt="Profile"
              className="w-44 h-40 rounded-full object-cover"
            /> */}
            <div className="absolute bottom-2 right-2 bg-gray-200 p-1 rounded-full cursor-pointer">
              <FaEdit className="text-gray-700" />
            </div>
          </div>
          <form className="flex-1 space-y-4">
            <div className="flex gap-8">
              <div className="w-full">
                <label htmlFor="firstName" className="block font-bold mb-1 text-black">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={profile.firstName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                />
              </div>
              <div className="w-full">
                <label htmlFor="lastName" className="block font-bold mb-1 text-black">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={profile.lastName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <label htmlFor="userName" className="block font-bold mb-1 text-black">User Name</label>
                <input
                  type="text"
                  id="userName"
                  name="userName"
                  value={profile.userName}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                />
              </div>
              <div className="w-full">
                <label htmlFor="email" className="block font-bold mb-1 text-black">Email Address</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full">
                <label htmlFor="phoneNumber" className="block font-bold mb-1 text-black">Phone Number</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={profile.phoneNumber}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                />
              </div>
            </div>
            <div className="flex gap-8">
              <div className="w-full relative">
                <label htmlFor="newPassword" className="block font-bold mb-1 text-black">New Password</label>
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  id="newPassword"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-6"
                  onClick={() => togglePasswordVisibility('newPassword')}
                >
                  {showNewPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
              <div className="w-full relative">
                <label htmlFor="confirmNewPassword" className="block font-bold mb-1 text-black">Confirm New Password</label>
                <input
                  type={showConfirmNewPassword ? 'text' : 'password'}
                  id="confirmNewPassword"
                  name="confirmNewPassword"
                  value={profile.confirmNewPassword}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-black"
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-6"
                  onClick={() => togglePasswordVisibility('confirmNewPassword')}
                >
                  {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
          </form>
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
