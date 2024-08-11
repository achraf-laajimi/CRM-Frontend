import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../api/apiRep';
import './edituser.css';
import { toast, ToastContainer } from 'react-toastify';

// Define interface for update data
interface UserUpdateData {
  username: string; // Use 'username' as the key
  email: string;
}

// Define interface for user data
interface User {
  username: string; // Use 'username' to match frontend usage
  email: string;
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [username, setUsername] = useState(''); // Use 'username' for the state
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const data = await getUser(userId);
          setUser(data);
          setUsername(data.username); // Store the username in state
          setEmail(data.email);
        } catch (error) {
          console.error('Error fetching user:', error);
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
          username, // Use 'username' as key and value
          email,
        };

        await updateUser(userId, updateData); // Send 'username' to the backend
        toast.success('User updated successfully!');
        navigate('/customers');
      }
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username} // Bind input to 'username'
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
};

export default EditUser;
