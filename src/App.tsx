import React, { createContext, useEffect, useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import Analytics from './components/analyticsRep/analytics';
import Customers from './components/customersRep/customers';
import EditUser from './components/customersRep/edituser';
import Dashbord from './components/dashbordRep/dashbord';
import Login from './components/login/Login';
import Order from './components/orderRep/order';
import PlaceOrder from './components/orderRep/placeorder';
import AddProductForm from './components/produitRep/ajoutProduct';
import EditProductForm from './components/produitRep/EditProductForm';
import ProductList from './components/produitRep/produit';
import Profile from './components/profile/profile';
import ProductReview from './components/review/review';
import Signup from './components/signup/Signup';

interface UserContextType {
  user: string | null;
  setUser: React.Dispatch<React.SetStateAction<string | null>>;
}

export const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {}
});

const App: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);

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
      <div className="App">
        <Routes>
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/dashbord" />} />
        <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/dashbord" />} />
          <Route path="/dashbord" element={user ? <Dashbord /> : <Navigate to="/login" />} />
          <Route path="/analytics" element={user ? <Analytics /> : <Navigate to="/login" />} />
          <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
          <Route path="/customers" element={user ? <Customers /> : <Navigate to="/login" />} />
          <Route path="/order" element={user ? <Order /> : <Navigate to="/login" />} />
          <Route path="/produit" element={user ? <ProductList /> : <Navigate to="/login" />} />
          <Route path="/add-product" element={user ? <AddProductForm /> : <Navigate to="/login" />} />
          <Route path="/edit-product" element={user ? <EditProductForm /> : <Navigate to="/login" />} />
          <Route path="/edit-user/:userId" element={user ? <EditUser /> : <Navigate to="/login" />} />
  
          <Route path="/passer" element={user ? <PlaceOrder /> : <Navigate to="/login" />} />
          <Route path="/review" element={user ? <ProductReview /> : <Navigate to="/login" />} />
          <Route path="/*" element={<h1>404</h1>} />
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
