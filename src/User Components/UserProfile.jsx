import React, { useEffect, useState } from 'react';
import { getUser, updateUser } from '../User api/UserMethods';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { jwtDecode } from 'jwt-decode'; // Use named import

const UserProfile = () => {
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
    profileImage: null
  });

  const [isFocused, setIsFocused] = useState({
    newPassword: false,
    confirmNewPassword: false
  });

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [imagePreview, setImagePreview] = useState('');

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
          console.log(userData)
          setProfile({
            firstName: userData.firstName || '',
            lastName: userData.lastName || '',
            userName: userData.username || '',
            email: userData.email || '',
            phoneNumber: userData.telephone || '',
            profileImage: userData.imageUrl,
            role: userData.role || '',
            adresse: userData.adresse || '',
            currentPassword: '', // Don't load the password from the server
            newPassword: '',
            confirmNewPassword: ''
            
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

      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      if (token) {
        const response = await updateUser(userId, updateData, token);

        if (response._id === userId) {
          alert('Profile updated successfully');
        } else {
          alert('Failed to update profile');
        }
      }

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
  const handleImageChange = (e) => {
    const file = e.target.files?.[0] || null;
    setProfile((prevProfile) => ({
      ...prevProfile,
      profileImage: file
    }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className='absolute top-20 w-4/5 p-8 rounded-lg bg-white mt-2'>
      <h2 className="text-2xl font-bold mb-6 text-orange-500">User Profile</h2>
      <div className="flex items-center mb-5 border-b">
        <img src={profile.profileImage} alt="Profile" className="rounded-full w-24 h-24 mr-5" />
        <div className="text-sm text-gray-600">
          <h3 className="text-xl font-semibold text-black">{profile.userName}</h3>
          <p className='text-lg'>{profile.role}</p>
          <p>{profile.adresse}</p>
        </div>
        <div className="ml-auto flex flex-col gap-2">

            <input type="file" accept="image/*" onChange={handleImageChange} />
        
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
        <button type="button" onClick={handleSaveChanges} className="w-full bg-[#ff5722] text-white font-bold py-2 px-4 rounded-md mt-4">
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
