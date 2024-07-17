import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashbord from './components/dashbord/dashbord';
import Analytics from './components/analytics/analytics';
import Home from './components/home/Home';
import Profile from './components/profile/profile';
import Customers from './components/customers/customers'

const App: React.FC = () => {
  return (
    <Router>
      <div>
      
        <Routes>
          <Route path="/dashbord" element={<Dashbord />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
