
import React, { useEffect } from 'react';
import './Home.css';
import MultiitemCarousel from './MultiitemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { useCart } from './../State/Cart/CartContext';  // Importing the useCart hook
import { useRestaurantContext } from './../State/Restaurant/RestaurantContext';

const Home = () => {
  const { cartItems, findCart } = useCart(); // Accessing cart items and findCart function
  const { restaurants, getAllRestaurants, loading, error } = useRestaurantContext();
  const jwt = localStorage.getItem("jwt");

  // Avoid calling findCart repeatedly by checking if cartItems is already populated
  useEffect(() => {
    // Fetch cart and restaurant data only once after jwt is available
    if (jwt) {
      // Fetch cart only if it hasn't been fetched already
      if (cartItems.length === 0) {
        findCart(jwt); // Fetch the cart items when the component mounts
      }

      // Fetch restaurants only if it hasn't been fetched already
      if (restaurants.length === 0) {
        getAllRestaurants(jwt); // Fetch restaurants only if jwt exists and restaurants are empty
      }
    }
  }, [jwt]); // Dependencies to ensure the effect runs when jwt changes

  useEffect(() => {
    console.log("Cart Items: ", cartItems); // Log cart items when they are updated
  }, [cartItems]); // Log cartItems separately, after they change

  if (loading) {
    return <div>Loading...</div>; // You can add a loading spinner here
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="pb-10">
      <section className="banner -z-50 relative flex flex-col justify-center items-center">
        <div className="w-[50vw] z-10 text-center">
          <p className="text-2xl lg:text-6xl font-bold z-10 py-5">Swiggy Food</p>
          <p className="z-10 text-gray-300 text-xl lg:text-4xl">Taste the Convenience: Food, Fast, and Delivered.</p>
        </div>
        <div className="cover absolute top-0 left-0 right-0"></div>
      </section>

      <section className="p-10 lg:py-10 lg:px-20">
        <p className="text-2xl font-semibold text-gray-400 py-3 pb-10">Top Meals</p>
        <MultiitemCarousel />
      </section>

      <section className="px-5 lg:px-20 pt-10">
        <h1 className="text-2xl font-semibold text-gray-400 pb-5">Order From Our Handpicked Favourites</h1>
        <div className="flex flex-wrap items-center justify-normal g-3" style={{gap:'150px'}}>

          {
            restaurants.length > 0 ? (
              restaurants.map((item, index) => (
                <RestaurantCard key={index} item={item} />
              ))
            ) : (
              <div>No restaurants found.</div>
            )
          }
        </div>
      </section>
    </div>
  );
};

export default Home;
