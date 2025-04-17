import React from 'react';
import { Button } from 'reactstrap'; // Reactstrap Button
import { FaUserCircle } from 'react-icons/fa'; // React Icon for user profile icon

const UserProfile = () => {
  const handleLogout = () => {
    // Handle logout functionality here
  };

  return (
    <div className=" d-flex flex-column justify-content-center align-items-center text-center">
      <div className="d-flex flex-column justify-content-center align-items-center">
        {/* React Icons User Icon */}
        <FaUserCircle style={{ fontSize: '9rem' }} />
        <h1 className="py-3 text-2xl font-weight-bold">Code with Zosh</h1>
        <p>Email: codewithzosh@gmail.com</p>
        {/* Reactstrap Button */}
        <Button onClick={handleLogout} style={{ margin: '2rem 0',backgroundColor:"#e91e63" }}>
          Logout
        </Button>
      </div>
    </div>
  );
};

export default UserProfile;
