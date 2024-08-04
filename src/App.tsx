import React from 'react';
import Dashbord from './components/dashbordRep/dashbord';
import Analytics from './components/analyticsRep/analytics';
import Home from './components/home/Home';
import Profile from './components/profile/profile';
import Customers from './components/customersRep/customers';
import Order from './components/orderRep/order';
import Review from './components/review/review';
import Login from './components/login/Login';
import Signup from './components/signup/Signup';
import  { createContext, useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Assurez-vous d'inclure les styles de Toastify

export interface User {
  firstName: string;
  lastName: string;
  username: string;
  emailAddress: string;
  password: string;
  adresse: string;
  telephone: string;
  role: string;
}
interface UserContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;

}

export const UserContext = createContext<UserContextType | undefined>(undefined);


const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const getUser = async () => {
    try {
      const url = 'http://localhost:3000/auth/login/success';
      const { data } = await axios.get<{ user: { _json: User } }>(url, { withCredentials: true });
      setUser(data.user._json);
    } catch (err) {
      console.error('Error fetching user data:', err);
      setUser(null); // Handle errors by setting user to null
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        <Routes>
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/order" element={<Order />} />
          <Route path="/review" element={<Review />} />
      {/*     <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
          <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
          <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} /> */}
        </Routes>
        <ToastContainer
          position='top-center'
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme='colored'
        />
      </div>
    </UserContext.Provider>
  );
};


export default App;
