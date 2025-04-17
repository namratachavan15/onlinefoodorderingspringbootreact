import React from 'react';
import { Routes, Route } from 'react-router-dom';
// Correct relative import paths
import Home from '../Home/Home';  
//import RestaurantDetails from '../RestaurantDetails/RestaurantDetails'; 
import Cart from '../Cart/Cart';  
import Profile from '../Profile/Profile';  
import Navbar from '../Navbar/Navbar';  
import RestaurantDetails from '../Restaurant/RestaurantDetails';
import Auth from '../Auth/Auth';
import PaymentSuccess from '../PaymentSuccess/PaymentSuccess';
import SearchResults from '../Restaurant/SearchResults';

const CustomerRouter = () => {
  return (
    <div>
        <Navbar />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account/:register' element={<Home />} />
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>} />
            {/* <Route path='/restaurant' element={<RestaurantDetails/>} /> */}
            <Route path='/cart' element={<Cart />} />
            <Route path='/my-profile/*' element={<Profile />} />
            <Route path='/payment/success/' element={<PaymentSuccess/>} />
            <Route path='/search-results' element={<SearchResults/>} />
        </Routes>
        <Auth/>
    </div>
  );
};

export default CustomerRouter;
