import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileNavigation from './ProfileNavigation';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Address from './Address';
import Favorites from './Favorites';
import PaymentHistory from './PaymentHistory';
import './Profile.css';

const Profile = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="d-flex flex-column" style={{ minHeight: '100vh' }}>
      {/* Top Navbar (Mobile only) */}
      <nav className="navbar navbar-light bg-light d-md-none w-100" style={{ position: 'fixed', zIndex: 1030,width:'100%' }}>
  <div className="container-fluid p-0">
    <button
      className="navbar-toggler d-lg-none"
      type="button"
      onClick={toggleSidebar}
    >
      <span className="navbar-toggler-icon"></span>
    </button>
  </div>
</nav>


      {/* Sidebar (Mobile view - toggleable) */}
      {sidebarOpen && (
  <div
    className="sidebar d-block d-md-none"
    style={{
      position: 'absolute',
      zIndex: 2000,
      backgroundColor: 'black',
      // width: '250px', // match width
      // height: '100vh',
    }}
  >
    <ProfileNavigation onItemClick={() => setSidebarOpen(false)} />
  </div>
)}

      {/* Sidebar (Desktop view - always visible) */}
      <div className="d-none d-md-block" style={{ backgroundColor: 'black' }}>
        <ProfileNavigation />
      </div>

      {/* Main Content */}
      <div
        className="content-area"
        style={{
          flex: 1,
          // transition: 'margin-left 0.3s',
          padding: '20px',
        }}
      >
        <Routes>
          <Route path="/" element={<UserProfile />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/address" element={<Address />} />
          <Route path="/favourites" element={<Favorites />} />
          <Route path="/payments" element={<PaymentHistory />} />
        </Routes>
      </div>
    </div>
  );
};

export default Profile;


