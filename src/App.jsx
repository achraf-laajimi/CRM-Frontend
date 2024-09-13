import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import { Outlet } from 'react-router-dom'
import Dashboard from './components/Dashboard';
import Customers from './components/Customers';
import Products from './components/Products';
import Orders from './components/Orders';
import Profile from './components/Profile';
import Notifications from './components/Notifications';
import CustomerProfile from './components/CustomerProfile';
import ProductReview from './components/ProductReview';
import Sidebar from './Layout/Sidebar';
import Navbar from './Layout/Navbar';
import Signup from './components/signup';
import Login from './components/Login';
import './App.css'; // Make sure this includes any necessary global styles

export const UserContext = createContext();
const App = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');
  const [user, setUser] = useState(null);
  const [filter, setFilter] = useState('');

  const getUser = () => {
    const token = Cookies.get('token'); // Obtenez le token des cookies
    console.log('Token récupéré:', token); // Vérifiez la présence du token

    if (token) {
      setUser(token); // Définissez l'utilisateur comme connecté si le token existe
    } else {
      console.warn('Aucun token trouvé, l\'utilisateur n\'est pas connecté.');
      setUser(null); // Assurez-vous que l'utilisateur est déconnecté si aucun token n'est trouvé
    }
  };

  useEffect(() => {
    getUser();
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      <Router>
      {user && <Sidebar setSelectedItem={setSelectedItem} />}
        <div className={user ? "flex-1 flex flex-col ml-60" : "flex-1 flex flex-col"}>
          {user && <Navbar selectedItem={selectedItem} />}
          <div className={user ? "flex-1 p-5 overflow-auto mt-20 ml-5" : "flex-1"}>
              <Routes>
                <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                <Route path="/" element={<Outlet />}>
                  <Route index element={<Dashboard />} />
                  <Route path="products" element={user ? <Products /> : <Navigate to="/login" />} />
                  <Route path="customers" element={user ? <Customers /> : <Navigate to="/login" />} />
                  <Route path="orders" element={user ? <Orders /> : <Navigate to="/login" />} />
                  <Route path="profile" element={<Profile />} />
                  <Route path="notifications" element={user ? <Notifications /> : <Navigate to="/login" />} />
                  <Route path="products/:id" element={user ? <ProductReview /> : <Navigate to="/login" />} />
                  <Route path="customers/:id" element={user ? <CustomerProfile /> : <Navigate to="/login" />} />
                </Route>
              </Routes>
            </div>
          </div>
          <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </Router>
    </UserContext.Provider>
  );
};

export default App;
