import React from 'react';
import {
  FaShoppingBag,
  FaHeart,
  FaPlusCircle,
  FaWallet,
  FaSignOutAlt,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Auth/AuthContext';
import { useRestaurantContext } from '../State/Restaurant/RestaurantContext';
import { Nav, NavItem, NavLink } from 'reactstrap';
import './ProfileNavigation.css'

const menu = [
  { title: 'Profile', icon: <FaPlusCircle />, path: '/' },
  { title: 'Orders', icon: <FaShoppingBag />, path: '/orders' },
  { title: 'Favourites', icon: <FaHeart />, path: '/favourites' },
  { title: 'Address', icon: <FaPlusCircle />, path: '/address' },
  { title: 'Payments', icon: <FaWallet />, path: '/payments' },
  { title: 'Logout', icon: <FaSignOutAlt />, path: '/' },
];

const ProfileNavigation = ({ onItemClick }) => {
  const { logout } = useAuth();
  const { logoutRestaurant } = useRestaurantContext();
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    if (item.title === 'Logout') {
      logout(navigate);
      logoutRestaurant();
    } else {
      navigate(`/my-profile${item.path}`);
      if (onItemClick) onItemClick(); // close sidebar on mobile
    }
  };

  return (
    <div
      className="sidebar"
      style={{
        backgroundColor: 'black',
        width: '250px', // fixed width
        // minHeight: '100vh', // full height
        overflowY: 'auto', // scroll on overflow
        paddingTop: '1rem',
        position: 'relative',
      }}
    >
      <Nav vertical>
        {menu.map((item, index) => (
          <div key={index} >
            <NavItem>
              <NavLink
                onClick={() => handleNavigate(item)}
                className="d-flex align-items-center p-3 cursor-pointer"
                style={{
                  fontSize: '1.2rem',
                  fontWeight: '500',
                  color: 'white',
                }}
              >
                <div className="me-2">{item.icon}</div>
                <span>{item.title}</span>
              </NavLink>
            </NavItem>
            {index !== menu.length - 1 && <hr className="my-2" />}
          </div>
        ))}
      </Nav>
    </div>
  );
};

export default ProfileNavigation;
