import React, { useState } from 'react';
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

const UserProfile: React.FC = () => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleSaveChanges = () => {
    console.log('Profile saved', profile);
  };

  const handleDelete = () => {
    console.log('Profile deleted');
  };

  const handleFocus = (inputName: string) => {
    setIsFocused({ ...isFocused, [inputName]: true });
  };

  const handleBlur = (inputName: string) => {
    setIsFocused({ ...isFocused, [inputName]: false });
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
            <h3>Alaa Mohamed</h3>
            <p>Rep Commerciale</p>
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
              <input type="text" id="firstName" name="firstName" value={profile.firstName} onChange={handleChange} placeholder="e.g. Alaa" />
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={profile.lastName} onChange={handleChange} placeholder="e.g. Mohamed" />
            </div>
          </div>
          <div className='f1'>
            <div className="form-group">
              <label htmlFor="userName">User Name</label>
              <input type="text" id="userName" name="userName" value={profile.userName} onChange={handleChange} placeholder="e.g. alaa.mohamed" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" name="email" value={profile.email} onChange={handleChange} placeholder="e.g. alaa@example.com" />
            </div>
          </div>
          <div className='f1'>
            <div className="form-group">
              <label htmlFor="phoneNumber">Phone Number</label>
              <input type="tel" id="phoneNumber" name="phoneNumber" value={profile.phoneNumber} onChange={handleChange} placeholder="e.g. +20123456789" />
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
                />
              </div>
            </div>
          </div>
          <div className='f1'>
            <div className="form-group">
              <label htmlFor="newPassword">New Password</label>
              <div className="input-icon-wrapper">
                {!isFocused.newPassword && isInputEmpty('newPassword') && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="b1" viewBox="0 0 16 16">
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
                  </svg>
                )}
                <input
                  type="password"
                  id="newPassword"
                  name="newPassword"
                  value={profile.newPassword}
                  onChange={handleChange}
                  onFocus={() => handleFocus('newPassword')}
                  onBlur={() => handleBlur('newPassword')}
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <div className="input-icon-wrapper">
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
                />
              </div>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel" onClick={() => console.log('Canceled')}>Cancel</button>
            <button type="button" className="save-changes" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UserProfile;
