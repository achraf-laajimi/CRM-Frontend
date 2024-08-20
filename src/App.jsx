import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import './App.css';
import Sidebar from './User Layout/Sidebar';
import Navbar from './User Layout/Navbar';
import Profile from './User Components/Profile';
import Help from './User Components/Help';
import Promote from './User Components/Promote';
import Products from './User Components/Products';
import Commande from './User Components/commande';
import Message from './User Components/message';
import Messages from './User Components/messages';
import UserProfile from './User Components/UserProfile';
import Wishliste from './User Components/wishlsite';

function App() {
  const [filter, setFilter] = useState("");

  return (
    <Router>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-60"> {/* Adjusted left margin for the main content */}
        <Navbar filter={filter} setFilter={setFilter} />
        <div className="flex-1 p-5 overflow-auto mt-20 ml-5"> {/* Adjusted top margin for main content */}
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route index element={<Products filter={filter} />} />
              <Route path="profile" element={<Profile />} />
              <Route path="userprofile" element={<UserProfile />} />
              <Route path="help" element={<Help />} />
              <Route path="promote" element={<Promote />} />
              <Route path="message" element={<Message />} />
              <Route path="messages" element={<Messages />} />
              <Route path="wishliste" element={<Wishliste />} />
            </Route>
            <Route path="vos-commandes" element={<Commande />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
