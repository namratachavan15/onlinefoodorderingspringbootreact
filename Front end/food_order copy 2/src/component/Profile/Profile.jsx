import React, { useState } from 'react';
import ProfileNavigation from './ProfileNavigation';
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Orders from './Orders';
import Address from './Address';
import Favorites from './Favorites';
import PaymentHistory from './PaymentHistory';
import './Profile.css';

const Profile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  return (
    <div className="profile-container">
      <div className="sidebar" style={{backgroundColor:'black'}}>
        <ProfileNavigation open={openSideBar} />
      </div>
      <div className="main-content">
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
