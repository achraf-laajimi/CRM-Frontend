import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import './App.css'; // Make sure this includes any necessary global styles


const App = () => {
  const [selectedItem, setSelectedItem] = useState('Dashboard');

  return (
    <Router>
        <Sidebar setSelectedItem={setSelectedItem} />
        <div className="flex-1 flex flex-col ml-60"> {/* Adjusted left margin for the main content */}
          <Navbar selectedItem={selectedItem} />
          <div className="flex-1 p-5 overflow-auto mt-20 ml-5"> {/* Adjusted top margin for main content */}
            <Routes>
              <Route path="/" element={<Outlet />}>
                <Route index element={<Dashboard />} />
                <Route path="products" element={<Products />} />
                <Route path="customers" element={<Customers />} />
                <Route path="orders" element={<Orders />} />
                <Route path="profile" element={<Profile />} />
                <Route path="notifications" element={<Notifications />} />
                <Route path="products/:id" element={<ProductReview />} />
                <Route path="customers/:id" element={<CustomerProfile />} />
              </Route>
            </Routes>
          </div>
        </div>
    </Router>
  );
};

export default App;
