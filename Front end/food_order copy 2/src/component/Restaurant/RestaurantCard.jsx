import React, { useState, useEffect } from 'react';
import { Card, Button, Badge, Col } from 'react-bootstrap';
import { IoIosHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";
import { useAuth } from '../Auth/AuthContext'; // Custom hook for authentication
import './RestaurantCard.css';
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ item }) => {
  const { user, addToFavorites } = useAuth();
  const isOpen = item.open === true;
  const navigate=useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  // Check if the restaurant is already in the user's favorites when the component mounts
  useEffect(() => {
    const favoriteStatus = (user.favorites || []).some(fav => fav.id === item.id);
    setIsFavorite(favoriteStatus); // Set the initial state based on the user's favorites
  }, [user.favorites, item.id]); // Run again when the user favorites list changes

  const handleToggleFavorite = async () => {
    // Call the addToFavorites function which will handle both add and remove logic
    await addToFavorites(item.id); 
    setIsFavorite(!isFavorite); // Update the UI immediately after the toggle
  };

  const handleNavigateTorestaurant=()=>{
    if(item.open)
    {
      navigate(`/restaurant/${item.address.city}/${item.name}/${item.id}`)
    }
}
  return (
    <Col sm={6} md={4} lg={3} className="d-flex justify-content-center mb-3">
  <Card  style={{ backgroundColor: '#191919', color: '#6c757d',width:'300px' }}>
    <div className={`${isOpen ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
      <Card.Img
        variant="top"
        src={item.images[0]} // Assuming images is an array and item.images[1] is the valid URL
        alt={item.name}
        style={{ objectFit: 'cover', height: '150px',width:'300px' }}
      />
      <Badge pill className={`badge ${isOpen ? 'badge-success' : 'badge-danger'} position-absolute top-2 left-2`}>
        {isOpen ? 'Open' : 'Closed'}
      </Badge>
    </div>

    <Card.Body className="d-flex flex-column justify-content-between">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <Card.Text onClick={handleNavigateTorestaurant} style={{ color: 'white' }}>{item.name}</Card.Text>
          <Card.Text className="mb-0">{item.description}</Card.Text>
        </div>
        <Button
          variant="link"
          style={{
            color: 'white',
            padding: '0', 
            border: 'none', 
            background: 'transparent', 
            fontSize: '2.5rem',
          }}
          onClick={handleToggleFavorite}
        >
          {isFavorite ? (
            <IoMdHeart style={{ height: '30px', color: 'red' }} />
          ) : (
            <IoIosHeartEmpty style={{ height: '30px', color: 'white' }} />
          )}
        </Button>
      </div>
    </Card.Body>
  </Card>
</Col>

  );
};

export default RestaurantCard;
