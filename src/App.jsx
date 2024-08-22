import React, { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Sidebar from './User Layout/Sidebar';
import Navbar from './User Layout/Navbar';
import Help from './User Components/Help';
import Promote from './User Components/Promote';
import Products from './User Components/Products';
import Commande from './User Components/commande';
import Message from './User Components/message';
import Messages from './User Components/messages';
import UserProfile from './User Components/UserProfile';
import Wishliste from './User Components/wishlsite';
import Login from './User Components/login';
import Signup from './User Components/signup';

// Créez le contexte utilisateur
export const UserContext = createContext();

function App() {
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
        {user && <Sidebar />}
        <div className={user ? "flex-1 flex flex-col ml-60" : "flex-1 flex flex-col"}>
          {user && <Navbar filter={filter} setFilter={setFilter} />}
          <div className={user ? "flex-1 p-5 overflow-auto mt-20 ml-5" : "flex-1"}>
            <Routes>
              <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
              <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
              <Route path="/" element={user ? <Products filter={filter} /> : <Navigate to="/login" />} />
              <Route path="/userprofile" element={user ? <UserProfile /> : <Navigate to="/login" />} />
              <Route path="/help" element={user ? <Help /> : <Navigate to="/login" />} />
              <Route path="/promote" element={user ? <Promote /> : <Navigate to="/login" />} />
              <Route path="/message" element={user ? <Message /> : <Navigate to="/login" />} />
              <Route path="/messages" element={user ? <Messages /> : <Navigate to="/login" />} />
              <Route path="/wishliste" element={user ? <Wishliste /> : <Navigate to="/login" />} />
              <Route path="/vos-commandes" element={user ? <Commande /> : <Navigate to="/login" />} />
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
}

export default App;
