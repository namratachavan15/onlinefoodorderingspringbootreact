import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink } from 'reactstrap';
import {
  FaShoppingBag, FaChartBar, FaBox, FaHamburger, FaUtensils,
  FaCalendarAlt, FaCogs, FaSignOutAlt
} from 'react-icons/fa';
import { useAuth } from '../../component/Auth/AuthContext';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';
import "./AdminSidebar.css"
const menu = [
  { title: 'Dashboard', icon: <FaChartBar />, path: '/' },
  { title: 'Orders', icon: <FaShoppingBag />, path: '/orders' },
  { title: 'Menu', icon: <FaBox />, path: '/menu' },
  { title: 'FoodCategory', icon: <FaHamburger />, path: '/category' },
  { title: 'Ingredients', icon: <FaUtensils />, path: '/ingredients' },
  { title: 'Events', icon: <FaCalendarAlt />, path: '/event' },
  { title: 'Details', icon: <FaCogs />, path: '/details' },
  { title: 'Logout', icon: <FaSignOutAlt />, path: '/' },
];

const AdminSideBar = ({ onItemClick }) => {
  const { logout } = useAuth();
  const { logoutRestaurant } = useRestaurantContext();
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    if (item.title === 'Logout') {
      logout(navigate);
      logoutRestaurant();
    } else {
      navigate(`/admin/restaurant${item.path}`);
      if (onItemClick) onItemClick(); // 👈 close sidebar on mobile
    }
  };

  return (
    <div className="sidebar" style={{ }}>
      <Nav vertical>
        {menu.map((item, index) => (
          <div key={index} className="nav-item-wrapper">
            <NavItem>
              <NavLink
                onClick={() => handleNavigate(item)}
                className="d-flex align-items-center p-3 cursor-pointer"
                style={{ fontSize: '1.2rem', fontWeight: '500', color: 'white' }}
              >
                <div className="me-2">{item.icon}</div>
                <span>{item.title}</span>
              </NavLink>
            </NavItem>
            {index !== menu.length - 1 && <hr className="my2" />}
          </div>
        ))}
      </Nav>
    </div>
  );
};


export default AdminSideBar;
