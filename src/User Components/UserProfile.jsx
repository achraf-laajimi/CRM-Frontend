import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../User api/UserMethods';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const UserProfile = () => {
  const [userId, setUserId] = useState('66b4a8fe5a8f9dbce57e4049');
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    userName: '',
    img: '',
    email: '',
    phoneNumber: '',
    role: '',
    adresse: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });

  const [isFocused, setIsFocused] = useState({
    newPassword: false,
    confirmNewPassword: false
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const userData = await getUser(userId);
        setProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          userName: userData.username || '',
          email: userData.email || '',
          phoneNumber: userData.telephone || '',
          role: userData.role || '',
          adresse: userData.adresse || '',
          currentPassword: userData.password || '',
          newPassword: '',
          confirmNewPassword: ''
        });
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
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
          ...(profile.newPassword && { password: profile.newPassword })
        };

        const response = await updateUser(userId, updateData);

        if (response._id === userId) {
            alert('Profile updated successfully');
        } else {
            alert('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
        alert('Error updating profile');
    }
  };

  const handleFocus = (inputName) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [inputName]: true
    }));
  };

  const handleBlur = (inputName) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [inputName]: false
    }));
  };

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 'currentPassword':
        setShowCurrentPassword((prev) => !prev);
        break;
      case 'newPassword':
        setShowNewPassword((prev) => !prev);
        break;
      case 'confirmNewPassword':
        setShowConfirmNewPassword((prev) => !prev);
        break;
      default:
        break;
    }
  };

  return (
      <div className='absolute top-20 w-4/5 p-8 rounded-lg bg-white mt-2'>
        <h2 className="text-2xl font-bold mb-6 text-orange-500">User Profile</h2>
        <div className="flex items-center mb-5 border-b">
          <img src={profile.img} alt="Profile" className="rounded-full w-24 h-24 mr-5" />
          <div className="text-sm text-gray-600">
            <h3 className="text-xl font-semibold text-black">{profile.userName}</h3>
            <p className='text-lg'>{profile.role}</p>
            <p>{profile.adresse}</p>
          </div>
          <div className="ml-auto flex flex-col gap-2">
            <button className="bg-[#ff5722] text-white py-2 px-3 rounded-md">Upload New Photo</button>
          </div>
        </div>
        <form className="space-y-4">
          <div className='flex gap-8'>
            <div className="w-full">
              <label htmlFor="firstName" className="block font-bold mb-1">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={profile.firstName} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white" 
              />
            </div>
            <div className="w-full">
              <label htmlFor="lastName" className="block font-bold mb-1">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={profile.lastName} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              />
            </div>
          </div>
          <div className='flex gap-8'>
            <div className="w-full">
              <label htmlFor="userName" className="block font-bold mb-1">User Name</label>
              <input 
                type="text" 
                id="userName" 
                name="userName" 
                value={profile.userName} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              />
            </div>
            <div className="w-full">
              <label htmlFor="email" className="block font-bold mb-1">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={profile.email} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              />
            </div>
          </div>
          <div className='flex gap-8'>
            <div className="w-full">
              <label htmlFor="phoneNumber" className="block font-bold mb-1">Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                value={profile.phoneNumber} 
                onChange={handleChange} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              />
            </div>
            <div className="w-full relative">
              <label htmlFor="currentPassword" className="block font-bold mb-1">Current Password</label>
              <input 
                type={showCurrentPassword ? 'text' : 'password'} 
                id="currentPassword" 
                name="currentPassword" 
                value={profile.currentPassword} 
                onChange={handleChange} 
                disabled
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-6" onClick={() => togglePasswordVisibility('currentPassword')}>
                {showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className='flex gap-8'>
            <div className="w-full relative">
              <label htmlFor="newPassword" className="block font-bold mb-1">New Password</label>
              <input 
                type={showNewPassword ? 'text' : 'password'} 
                id="newPassword" 
                name="newPassword" 
                value={profile.newPassword} 
                onChange={handleChange} 
                onFocus={() => handleFocus('newPassword')} 
                onBlur={() => handleBlur('newPassword')} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-6" onClick={() => togglePasswordVisibility('newPassword')}>
                {showNewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
            <div className="w-full relative">
              <label htmlFor="confirmNewPassword" className="block font-bold mb-1">Confirm New Password</label>
              <input 
                type={showConfirmNewPassword ? 'text' : 'password'} 
                id="confirmNewPassword" 
                name="confirmNewPassword" 
                value={profile.confirmNewPassword} 
                onChange={handleChange} 
                onFocus={() => handleFocus('confirmNewPassword')} 
                onBlur={() => handleBlur('confirmNewPassword')} 
                className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 cursor-pointer mt-6" onClick={() => togglePasswordVisibility('confirmNewPassword')}>
                {showConfirmNewPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <button type="button" className="bg-[#ff5722] text-white py-3 px-6 rounded-md mt-5" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </form>
      </div>
  );
};

export default UserProfile;
