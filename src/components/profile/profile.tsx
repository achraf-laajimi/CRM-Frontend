import React, { useEffect, useState } from 'react';
import "./profile.css";
import Navbar from '../navbar/navbar';
import { jwtDecode } from 'jwt-decode';
import { getUser, updateProfile } from '../../api/apiRep';

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

interface UpdateUserResponse {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  telephone: string;
  profileImage?: string; // Add profileImage URL if returned from backend
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
    profileImage: null,
  });

  const [isFocused, setIsFocused] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  const [userId, setUserId] = useState<string>('');
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    // Decode the token to get the user ID
    const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
    
    if (token) {
      try {
        const decodedToken: any = jwtDecode(token);
        setUserId(decodedToken.id); 
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, []);

  useEffect(() => {
    // Fetch user profile if userId is available
    const fetchProfile = async () => {
      if (userId) {
        const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
        if (token) {
          try {
            const userData = await getUser(userId);
            setProfile({
              firstName: userData.firstName || '',
              lastName: userData.lastName || '',
              userName: userData.username || '',
              email: userData.email || '',
              phoneNumber: userData.telephone || '',  
              currentPassword: '', // Don't load the password from the server
              newPassword: '',
              confirmNewPassword: '',
          
            });
            // Set initial image preview if available
            if (userData.profileImage) {
              setImagePreview(userData.profileImage);
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        }
      }
    };

    fetchProfile();
  }, [userId]);

  useEffect(() => {
    if (user) {
      // If user prop is available, use it to populate profile state
      setProfile(user);
      if (user.profileImage) {
        setImagePreview(URL.createObjectURL(user.profileImage));
      }
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setProfile((prevProfile) => ({
      ...prevProfile,
      profileImage: file
    }));
    if (file) {
      setImagePreview(URL.createObjectURL(file)); // Affiche un aperçu de l'image
    }
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

  const handleSaveChanges = async () => {
    if (profile.newPassword !== profile.confirmNewPassword) {
      alert('Les nouveaux mots de passe ne correspondent pas');
      return;
    }
  
    const updateData = new FormData(); // Utilisez FormData pour les fichiers
    updateData.append('firstName', profile.firstName);
    updateData.append('lastName', profile.lastName);
    updateData.append('username', profile.userName);
    updateData.append('email', profile.email);
    updateData.append('telephone', profile.phoneNumber);
    if (profile.newPassword) {
      updateData.append('password', profile.newPassword);
    }
    if (profile.profileImage) {
      updateData.append('profileImage', profile.profileImage); // Ajouter l'image au FormData
    }
  
    try {
      const response: UpdateUserResponse = await updateProfile(userId, updateData);
      if (response._id === userId) {
        alert('Profil mis à jour avec succès');
        if (response.profileImage) {
          setImagePreview(response.profileImage); // Mettre à jour l'aperçu avec l'URL du backend
          setProfile((prevProfile) => ({
            ...prevProfile,
            profileImage: null // Réinitialiser après envoi
          }));
        }
      } else {
        alert('Échec de la mise à jour du profil');
      }
    } catch (error) {
      alert('Une erreur est survenue lors de la mise à jour du profil');
    }
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
      {/*   {imagePreview && <img src={imagePreview} alt="Profile" className="profile-pic" />} */}
          <div className="profile-info">
            <h3>{profile.userName}</h3>
            <p>{profile.email}</p>
          </div>
        {/*   <div className="profile-actions">
            <input type="file" onChange={handleFileChange} />
          </div> */}
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
              <input 
                type="password" 
                id="currentPassword" 
                name="currentPassword" 
                value={profile.currentPassword} 
                onChange={handleChange} 
                placeholder="Enter current password" 
                onFocus={() => handleFocus('currentPassword')}
                onBlur={() => handleBlur('currentPassword')}
              />
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
                placeholder="Enter new password" 
                onFocus={() => handleFocus('newPassword')}
                onBlur={() => handleBlur('newPassword')}
              />
            </div>
            <div className="form-group">
              <label htmlFor="confirmNewPassword">Confirm New Password</label>
              <input 
                type="password" 
                id="confirmNewPassword" 
                name="confirmNewPassword" 
                value={profile.confirmNewPassword} 
                onChange={handleChange} 
                placeholder="Confirm new password" 
                onFocus={() => handleFocus('confirmNewPassword')}
                onBlur={() => handleBlur('confirmNewPassword')}
              />
            </div>
          </div>
          <div className='f1'>
            <button type="button" className="save-button" onClick={handleSaveChanges}>Save Changes</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile;
