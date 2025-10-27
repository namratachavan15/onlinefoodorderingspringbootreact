import React from 'react';
import { Button } from 'reactstrap';
import { FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => logout(navigate);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center text-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        
        <FaUserCircle style={{ fontSize: '9rem' }} />

        <h1 className="py-3 text-2xl font-weight-bold">
          {user?.fullName || "Anonymous User"}
        </h1>

        <p>Email: {user?.email || "Not Available"}</p>

        <Button
          onClick={handleLogout}
          style={{ margin: '2rem 0', backgroundColor: "#e91e63" }}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
