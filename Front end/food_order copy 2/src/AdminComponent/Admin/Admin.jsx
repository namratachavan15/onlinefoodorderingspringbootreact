import React, { useEffect, useState } from 'react';
import {Routes,Route} from 'react-router-dom'

import { Button } from 'reactstrap'; // Import reactstrap's Button for handling sidebar toggle
// Import the AuthContext to handle login/logout
import AdminSideBar from './AdminSidebar';
import { useAuth } from '../../component/Auth/AuthContext';
import Dashboard from '../Dashboard/Dashboard';
import Order from '../Orders/Order';
import Menu from '../Menu/Menu';
import FoodCategory from '../FoodCategory/FoodCategory';
import Ingredients from '../Ingredients/Ingredients';
import Events from '../Events/Events';
import RestaurantDetails from './RestaurantDetails';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';
import { useOrderContext } from '../../component/State/RestaurantOrder/OrderContext';

const Admin = () => {
  const [showSidebar, setShowSidebar] = useState(true);
  const { user } =useAuth // Get user data from context to display profile info or similar
   const jwt=localStorage.getItem("jwt")
   const {usersRestaurant,getRestaurantsCategory } = useRestaurantContext()
  const handleClose = () => setShowSidebar(false);
  const handleShow = () => setShowSidebar(true);
  const {fetchRestaurantOrder}= useOrderContext()

  useEffect(()=>{
    getRestaurantsCategory({jwt,restaurantId:usersRestaurant?.id})
    fetchRestaurantOrder({restaurantId:usersRestaurant?.id,jwt})
  },[])
  return (
    <div className="d-flex" style={{ minHeight: '100vh' }}>
      {/* Sidebar */}
      {showSidebar && <AdminSideBar handleClose={handleClose} />}

      {/* Main Content Area */}
      <div
        className="content-area"
        style={{
          flex: 1,
          marginLeft: showSidebar ? '250px' : '0',
          transition: 'margin-left 0.3s',
          padding: '20px',
        }}
      >
        <Routes>
            <Route path='/' element={<Dashboard/>}></Route>
            <Route path='/orders' element={<Order/>}></Route>
            <Route path='/menu' element={<Menu/>}></Route>
            <Route path='/category' element={<FoodCategory/>}></Route>
            <Route path='/ingredients' element={<Ingredients/>}></Route>
            <Route path='/event' element={<Events/>}></Route>
            <Route path='/details' element={<RestaurantDetails/>}></Route>
            </Routes>
      </div>
    </div>
  );
};

export default Admin;
