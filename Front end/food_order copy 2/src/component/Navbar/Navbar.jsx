import React, { useState } from 'react';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { AiOutlineUser } from 'react-icons/ai';
import {
  Navbar,
  NavbarBrand,
  Input,
  Button,
  Container,
  Badge
} from 'reactstrap';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../State/Cart/CartContext';

const NavbarComponent = () => {
  const { user } = useAuth();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const [searchKeyword, setSearchKeyword] = useState("");

  const handleSearch = () => {
    if (searchKeyword.trim() !== "") {
      navigate(`/search-results?query=${searchKeyword}`);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  const handleAvatarClick = () => {
    if (user && user.fullName) {
      navigate(user.role === "ROLE_CUSTOMER" ? "/my-profile" : "/admin/restaurant");
    } else {
      navigate("/account/login");
    }
  };

  return (
    <Navbar style={{ backgroundColor: '#E91E63' }} dark expand="md" className="py-3 sticky-top">
      <Container className="d-flex justify-content-between">
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
            type="text"
            placeholder="Search by name or cuisine..."
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onKeyDown={handleKeyPress}
            className="bg-white text-dark"
            style={{ maxWidth: "300px" }}
          />

          {/* Search Button */}
          <Button color="link" className="text-white" onClick={handleSearch}>
            <FaSearch size={22} />
          </Button>

          {/* Avatar Icon */}
          <Button color="link" className="text-white p-0" onClick={handleAvatarClick}>
            {user && user.fullName ? (
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
            ) : (
              <AiOutlineUser size={24} />
            )}
          </Button>

          {/* Cart Icon with Badge */}
          <Button
  color="link"
  className="text-white position-relative"
  onClick={() => {
    if (cartItems.length > 0) {
      navigate("/cart");
    }
    // else do nothing / stay on the current page
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
