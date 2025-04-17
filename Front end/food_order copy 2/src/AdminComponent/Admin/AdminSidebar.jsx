import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Nav, NavItem, NavLink} from 'reactstrap'; // Import reactstrap components
import { FaShoppingBag, FaChartBar, FaBox, FaHamburger, FaUtensils, FaCalendarAlt, FaCogs, FaSignOutAlt } from 'react-icons/fa'; // React-icons for icons
import { useAuth } from '../../component/Auth/AuthContext';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';


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

const AdminSideBar = ({ handleClose }) => {
  const { logout } = useAuth(); // Access logout function from context
  const {logoutRestaurant}=useRestaurantContext()
  const navigate = useNavigate();

  const handleNavigate = (item) => {
    if (item.title === 'Logout') {
      logout(navigate); // Call logout from context
      logoutRestaurant();
      handleClose();
    } else {
      navigate(`/admin/restaurant${item.path}`);
    }
  };

  return (
    <div
      className="sidebar d-flex flex-column justify-start text-xl pt-6 gap-1"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100%',
        width: '250px',
        backgroundColor: 'black',
        color:'white',
        boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
        zIndex: 1050,
        paddingBottom: '4rem',
        borderRight: '1px solid #ddd',
      }}
    >
      <Nav vertical>
        {menu.map((item, index) => (
          <div key={index} style={{height:'80px'}}>
            <NavItem>
              <NavLink
                onClick={() => handleNavigate(item)}
                className="d-flex align-items-center p-3 cursor-pointer"
                style={{ fontSize: '1.2rem', fontWeight: '500', paddingLeft: '1rem', paddingRight: '1rem',color:'white' }}
              >
                <div className="me-2">{item.icon}</div>
                <span>{item.title}</span>
              </NavLink>
            </NavItem>
            {/* Use hr for dividers */}
            {index !== menu.length - 1 && <hr className="my-2" />}
          </div>
        ))}
      </Nav>
    </div>
  );};

export default AdminSideBar;
