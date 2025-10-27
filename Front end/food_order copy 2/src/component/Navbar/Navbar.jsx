import React, { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import {
  Navbar,
  NavbarBrand,
  Input,
  Button,
  Container,
  Badge,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from 'reactstrap';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../State/Cart/CartContext';

const NavbarComponent = () => {
  const { user, logout } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(prev => !prev);

  const handleSearch = () => {
    if (searchKeyword.trim() !== "") {
      navigate(`/search-results?query=${searchKeyword}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleAvatarClick = () => {
    if (!user || !user.fullName) {
      navigate("/account/login");
    }
  };

  const handleLogout = () => {
    logout(navigate); // calls logout from AuthContext
  };

  return (
    <Navbar style={{ backgroundColor: '#E91E63' }} dark expand="md" className="navcss py-3 sticky-top">
      <Container className="d-flex justify-content-between" style={{margin:'0px',padding:'0px'}}>
        {/* Logo */}
        <NavbarBrand
          onClick={() => navigate("/")}
          className="text-light fs-3 fw-semibold"
          style={{ cursor: 'pointer' }}
        >
          Swiggy Food
        </NavbarBrand>

        {/* Right Section */}
        <div className="d-flex align-items-center w-100 justify-content-end gap-3">
          <Input
            id="txtinput"
            type="text"
            placeholder="Search by name or cuisine..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-white text-dark txtInput"
            style={{ maxWidth: "300px" }}
          />

          {/* Search Button */}
          <Button color="link" className="text-white btnsearch" onClick={handleSearch}>
            <FaSearch size={22} />
          </Button>

          {/* Avatar Dropdown */}
          {/* Avatar Dropdown */}
{user && user.fullName ? (
  <Dropdown isOpen={dropdownOpen} toggle={toggleDropdown}>
    <DropdownToggle
      color="link"
      className="text-white p-0 border-0"
      style={{ cursor: 'pointer' }}
    >
      <span
        className="d-flex align-items-center justify-content-center rounded-circle fw-bold"
        style={{
          width: "32px",
          height: "32px",
          background: "#fff",
          color: "#E91E63"
        }}
      >
        {user.fullName.charAt(0).toUpperCase()}
      </span>
    </DropdownToggle>

    {/* ↓ DropdownMenu moved slightly downward */}
    <DropdownMenu
      end
      style={{
        marginTop: "12px",  // pushes dropdown down a bit
        borderRadius: "10px",
        boxShadow: "0px 4px 10px rgba(0,0,0,0.15)"
      }}
    >
      <DropdownItem
        onClick={() =>
          navigate(user.role === "ROLE_CUSTOMER" ? "/my-profile" : "/admin/restaurant")
        }
      >
        {user.role === "ROLE_CUSTOMER" ? "My Profile" : "Restaurant Dashboard"}
      </DropdownItem>
      <DropdownItem divider />
      <DropdownItem onClick={handleLogout} className="text-danger">
        Logout
      </DropdownItem>
    </DropdownMenu>
  </Dropdown>
) : (
  <Button color="link" className="text-white p-0" onClick={handleAvatarClick}>
    <AiOutlineUser size={24} />
  </Button>
)}

          {/* Cart Icon with Badge */}
          <Button
            color="link"
            className="text-white position-relative"
            onClick={() => {
              if (cartItems.length > 0) {
                navigate("/cart");
              }
            }}
          >
            {cartItems.length > 0 && (
              <Badge
                pill
                color="danger"
                className="position-absolute top-0 start-100 translate-middle"
              >
                {cartItems.length}
              </Badge>
            )}
            <FaShoppingCart size={22} />
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarComponent;
