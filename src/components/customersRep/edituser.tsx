import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, updateUser } from '../../api/apiRep';
import './edituser.css';

// Définir l'interface pour les données de mise à jour
interface UserUpdateData {
  name: string;   // Utiliser name
  email: string;
}

// Définir l'interface pour l'utilisateur
interface User {
  username: string; // Utiliser username pour correspondre à l'interface User
  email: string;
}

const EditUser: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [name, setName] = useState(''); // Renommer username en name
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const { userId } = useParams<{ userId: string }>();

  useEffect(() => {
    const fetchUser = async () => {
      if (userId) {
        try {
          const data = await getUser(userId);
          setUser(data);
          setName(data.username); // Remplacer username par name
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
          name: name, // Utiliser name
          email: email,
        };

        await updateUser(userId, updateData); // Assurez-vous que updateUser attend ce type
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
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
