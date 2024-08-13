import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../api/apiRep';
import './edituser.css';

interface UserUpdateData {
  firstName: string;
  lastName: string;
  email: string;
}

interface User {
  username: string;
  email: string;
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const data = await getUser(userId);
          setUser(data);
          setFirstName(data.username); // Assuming 'username' is used as 'firstName'
          setEmail(data.email);
        } catch (error) {
          console.error('Error fetching user:', error);
          setError('Failed to load user data.');
        }
      }
    };

    fetchUser();
  }, [userId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (userId) {
        const updateData: UserUpdateData = {
          firstName,
          lastName,
          email,
        };

        await updateUser(userId, updateData);
        navigate('/customers');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      setError('Failed to update user. Please try again later.');
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="edit-user-container">
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
        />
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default EditUser;
