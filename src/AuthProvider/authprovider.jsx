// authprovider.jsx
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = Cookies.get('token');
        if (token) {
          const { data } = await axios.get('http://localhost:3000/auth/user', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(data.user);
        }
      } catch (error) {
        console.error('Error during authentication check:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
