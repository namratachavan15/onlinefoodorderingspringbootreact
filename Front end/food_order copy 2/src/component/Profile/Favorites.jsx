import React, { useEffect, useState } from 'react';
import { useAuth } from '../Auth/AuthContext';
import RestaurantCard from './../Restaurant/RestaurantCard';
import { Row, Spinner } from 'react-bootstrap';

const Favorites = () => {
  const { user, loading, fetchUser, jwt } = useAuth();
  const [localLoading, setLocalLoading] = useState(true);

  useEffect(() => {
    const loadUserIfNeeded = async () => {
      // If favorites are not loaded yet, and we have a token
      if (jwt && (!user || !user.favorites || user.favorites.length === 0)) {
        await fetchUser(jwt);
      }
      setLocalLoading(false);
    };

    loadUserIfNeeded();
  }, [jwt, user?.favorites?.length]);

  const favourites = user?.favorites || [];

  if (loading || localLoading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="primary" />
        <p>Loading your favourites...</p>
      </div>
    );
  }

  return (
    <div className='bg-dark' style={{ minHeight: '800px' }}>
      <h1 className="py-3 text-xl font-semibold text-center text-light">My Favourites</h1>
      {favourites.length > 0 ? (
        <Row className="d-flex ms-3">
          {favourites.map((item, index) => (
            <RestaurantCard key={index} item={item} />
          ))}
        </Row>
      ) : (
        <div className="text-center text-light">
          <p>No favorites found.</p>
        </div>
      )}
    </div>
  );
};

export default Favorites;
