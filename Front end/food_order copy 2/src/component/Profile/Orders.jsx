import React from 'react'
import OrderCard from './OrderCard'
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../State/Order/OrderContext';
import { useAuth } from '../Auth/AuthContext';
import { useEffect } from 'react';
const Orders = () => {
  const { auth } = useAuth(); // Get auth from AuthContext
  const { orders, getUsersOrders } = useOrderContext(); // Get orders and action from OrderContext
  const navigate = useNavigate();

  // Extract JWT from auth context if available
  const jwt = auth?.jwt || localStorage.getItem('jwt'); // Fallback to localStorage if auth is unavailable
 
  useEffect(() => {
    // Only call getUsersOrders if JWT is available
    if (jwt) {
      console.log('Fetching user orders with JWT:', jwt);
      getUsersOrders(jwt); // Fetch orders
    } else {
      console.log('JWT is not available');
    }
  }, [jwt]); // Depend on jwt to trigger the effect when it changes
  
  // Debugging log for the orders state
 
  
  return (
    <div className='d-flex flex-column align-items-center' style={{backgroundColor:"#212529",height:"800px"}}>
      <h1 className=' text-center  font-weight-bold' style={{paddingTop:' 0.75rem',paddingBottom: '0.75rem',fontSize: '1.25rem',lineHeight: '0.75rem'}}>My Orders</h1>
      <div className='d-flex flex-column w-50 w-lg-50' style={{height:'50px'}}>
        {
         orders.map((order)=>order.items.map((item,index) =><OrderCard key={index} item={item} orders={order}/>))
        }
      </div>
    </div>
  )
}

export default Orders
