import React, { useEffect, useState } from 'react';
import "./profile.css";
import Sidebar from '../sidebar/sidebar';
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
  profileImage?: File | null;
}

interface UserProfileProps {
  user?: Profile;
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
    profileImage: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const [isFocused, setIsFocused] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  useEffect(() => {
    if (user) {
      setProfile(user);
      if (user.profileImage) {
        setImagePreview(URL.createObjectURL(user.profileImage));
      }
    } else {
      const fetchProfile = async () => {
        try {
          const response = await fetch('/api/profile');
          const data = await response.json();
          setProfile(data);
          if (data.profileImage) {
            setImagePreview(data.profileImage); // Assuming the backend returns a URL
          }
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfile((prevProfile) => ({
      ...prevProfile,
      profileImage: file
    }));
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSaveChanges = async () => {
    try {
      const formData = new FormData();
      formData.append('firstName', profile.firstName);
      formData.append('lastName', profile.lastName);
      formData.append('userName', profile.userName);
      formData.append('email', profile.email);
      formData.append('phoneNumber', profile.phoneNumber);
      formData.append('currentPassword', profile.currentPassword);
      formData.append('newPassword', profile.newPassword);
      formData.append('confirmNewPassword', profile.confirmNewPassword);

      if (profile.profileImage) {
        formData.append('profileImage', profile.profileImage);
      }

      const response = await fetch('/api/updateProfile', {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        const updatedProfile = await response.json();
        // Met à jour l'état local avec les données sauvegardées
        setProfile(updatedProfile);
        // Met à jour la prévisualisation de l'image si elle est retournée par le backend
        if (updatedProfile.profileImage) {
          setImagePreview(updatedProfile.profileImage);
        } else {
          setImagePreview(null); // Si pas d'image, réinitialiser la prévisualisation
        }
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
      <Sidebar />
      <div className='profile-settings'>
        <h2>User Profile</h2>
        <div className="profile-header">
          <img src={imagePreview || img} alt="Profile" className="profile-pic" />
          <div className="profile-info">
            <h3>{profile.userName}</h3>
            <p>{profile.email}</p>
            <p>Eastern European Time (EET), Cairo UTC +3</p>
          </div>
          <div className="profile-actions">
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {/* <button className="upload-photo">Upload New Photo</button>
            <button className="delete" onClick={handleDelete}>Delete</button> */}
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
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="b11" viewBox="0 0 16 16">
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
              <div className="input-icon-wrapper">
                {!isFocused.newPassword && isInputEmpty('newPassword') && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="b11" viewBox="0 0 16 16">
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
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
                  placeholder={profile.newPassword} 
                />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <div className="input-icon-wrapper">
                {!isFocused.confirmNewPassword && isInputEmpty('confirmNewPassword') && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="b11" viewBox="0 0 16 16">
                    <path d="M3.5 11.5a3.5 3.5 0 1 1 3.163-5H14L15.5 8 14 9.5l-1-1-1 1-1-1-1 1-1-1-1 1-1-1-1 1H6.663a3.5 3.5 0 0 1-3.163 2M2.5 9a1 1 0 1 0 0-2 1 1 0 0 0 0 2"/>
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
                  placeholder={profile.confirmNewPassword} 
                />
              </div>
            </div>
          </div>
          <div className="form-group">
            <button type="button" className="save" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;