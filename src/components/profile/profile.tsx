import React, { useEffect, useState } from 'react';
import "./profile.css";
import Navbar from '../navbar/navbar';
import img from './téléchargement.jpg';

interface Profile {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  phoneNumber: string;
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

interface UserProfileProps {
  user?: Profile; // Optional prop for user data
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  const [profile, setProfile] = useState<Profile>({
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    phoneNumber: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const [isFocused, setIsFocused] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  useEffect(() => {
    if (user) {
      // If user prop is available, use it to populate profile state
      setProfile(user);
    } else {
      // Otherwise, fetch data from the API
      const fetchProfile = async () => {
        try {
          const response = await fetch('/api/profile');
          const data = await response.json();
          setProfile(data);
        } catch (error) {
          console.error('Error fetching profile:', error);
        }
      };

      fetchProfile();
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('/api/updateProfile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profile),
      });

      if (response.ok) {
        console.log('Profile saved successfully');
      } else {
        console.error('Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
    }
  };

  const handleDelete = () => {
    console.log('Profile deleted');
  };

  const handleFocus = (inputName: string) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [inputName]: true
    }));
  };

  const handleBlur = (inputName: string) => {
    setIsFocused((prevState) => ({
      ...prevState,
      [inputName]: false
    }));
  };

  const isInputEmpty = (inputName: string) => {
    return profile[inputName as keyof Profile] === '';
  };

  return (
    <div className='profile'>
      <Navbar />
      <div className='profile-settings'>
        <h2>User Profile</h2>
        <div className="profile-header">
          <img src={img} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h3>{profile.userName}</h3>
            <p>{profile.email}</p>
            <p>Eastern European Time (EET), Cairo UTC +3</p>
          </div>
          <div className="profile-actions">
            <button className="upload-photo">Upload New Photo</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
          </div>
        </div>
        <form className="profile-form">
          <div className='f1'>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input 
                type="text" 
                id="firstName" 
                name="firstName" 
                value={profile.firstName} 
                onChange={handleChange} 
                placeholder={profile.firstName} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input 
                type="text" 
                id="lastName" 
                name="lastName" 
                value={profile.lastName} 
                onChange={handleChange} 
                placeholder={profile.lastName} 
              />
            </div>
          </div>
          <div className='f1'>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input 
                type="text" 
                id="userName" 
                name="userName" 
                value={profile.userName} 
                onChange={handleChange} 
                placeholder={profile.userName} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                value={profile.email} 
                onChange={handleChange} 
                placeholder={profile.email} 
              />
            </div>
          </div>
          <div className='f1'>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input 
                type="tel" 
                id="phoneNumber" 
                name="phoneNumber" 
                value={profile.phoneNumber} 
                onChange={handleChange} 
                placeholder={profile.phoneNumber} 
              />
            </div>
            <div className="form-group">
              <label htmlFor="currentPassword">Current Password</label>
              <div className="input-icon-wrapper">
                {!isFocused.currentPassword && isInputEmpty('currentPassword') && (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="b1" viewBox="0 0 16 16">
                 <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
               </svg>
                )}
                <input 
                  type="password" 
                  id="currentPassword" 
                  name="currentPassword" 
                  value={profile.currentPassword} 
                  onChange={handleChange} 
                  onFocus={() => handleFocus('currentPassword')} 
                  onBlur={() => handleBlur('currentPassword')} 
                  placeholder={profile.currentPassword} 
                />
              </div>
            </div>
          </div>
          <div className='f1'>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <input 
                type="password" 
                id="newPassword" 
                name="newPassword" 
                value={profile.newPassword} 
                onChange={handleChange} 
                onFocus={() => handleFocus('newPassword')} 
                onBlur={() => handleBlur('newPassword')} 
                placeholder={profile.newPassword}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              {!isFocused.confirmNewPassword && isInputEmpty('confirmNewPassword') && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="b1" viewBox="0 0 16 16">
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                  </svg>
                )}
              <input 
                type="password" 
                id="confirmNewPassword" 
                name="confirmNewPassword" 
                value={profile.confirmNewPassword} 
                onChange={handleChange} 
                onFocus={() => handleFocus('confirmNewPassword')} 
                onBlur={() => handleBlur('confirmNewPassword')} 
                placeholder="" 
              />
            </div>
          </div>
          <button className="save" type="button" onClick={handleSaveChanges}>Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
