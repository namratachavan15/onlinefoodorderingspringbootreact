import React from 'react';
import { FaShoppingBag, FaHeart, FaHome, FaWallet, FaBell, FaCalendarAlt, FaSignOutAlt, FaPlusCircle } from 'react-icons/fa';
import { useMediaQuery } from 'react-responsive'; // Use react-responsive for media queries
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useRestaurantContext } from '../State/Restaurant/RestaurantContext';
import { useCart } from '../State/Cart/CartContext';

const menu = [
  { title: 'Orders', icon: <FaShoppingBag /> },
  { title: 'Favourites', icon: <FaHeart /> },
  { title: 'Address', icon: <FaPlusCircle /> },
  { title: 'Payments', icon: <FaWallet /> },
 
  // { title: 'Events', icon: <FaCalendarAlt /> },
  { title: 'Logout', icon: <FaSignOutAlt /> },
];

const ProfileNavigation = ({ open, handleClose }) => {
  const { logout } = useAuth();
  const {logoutRestaurant}=useRestaurantContext();
  const isSmallScreen = useMediaQuery({ query: '(max-width: 600px)' });
  const navigate = useNavigate();
  


  const handleNavigate = (item) => {
    if (item.title === "Logout") {
      logout(navigate); // Call logout and pass navigate to handle the redirection
      logoutRestaurant();
     
    } else {
      navigate(`/my-profile/${item.title.toLowerCase()}`);
    }
  };

  return (
    <div >
      <div
        className={`w-100vw lg:w-20vw d-flex flex-column justify-start text-xl pt-6`}
        style={{ display: isSmallScreen ? 'block' : 'flex' ,paddingBottom: '4rem',height:'800px',borderRight:'0.1rem solid' }}
      >
        {menu.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => handleNavigate(item)}
              className="d-flex align-items-center justify-between p-3 cursor-pointer"
              style={{ paddingLeft: '1rem', paddingRight: '1rem',borderRight: '1rem',height:'100px' }}
            >
              <div className="d-flex align-items-center justify-center" style={{ padding: '0rem' }}>
                <div className="me-2">{item.icon}</div>
                <span>{item.title}</span>
              </div>
            </div>
            {index !== menu.length - 1 && <hr className="my-2" />}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileNavigation;
