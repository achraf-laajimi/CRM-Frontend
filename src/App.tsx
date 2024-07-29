import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashbord from './components/dashbordRep/dashbord';
import Analytics from './components/analyticsRep/analytics';
import Home from './components/home/Home';
import Profile from './components/profile/profile';
import Customers from './components/customersRep/customers';
import Order from './components/orderRep/order';
import Review from './components/review/review';


const App: React.FC = () => {
  return (
    <div>
      <Routes>
        <Route path="/dashbord" element={<Dashbord />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/customers" element={<Customers />} />
        <Route path="/order" element={<Order />} />
        <Route path="/review" element={<Review />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
