import React, { useEffect } from 'react';
import OrderCard from './OrderCard';
import { useNavigate } from 'react-router-dom';
import { useOrderContext } from '../State/Order/OrderContext';
import { useAuth } from '../Auth/AuthContext';
 import './Orders.css'
const Orders = () => {
  const { auth } = useAuth();
  const { orders, getUsersOrders } = useOrderContext();
  const navigate = useNavigate();

  const jwt = auth?.jwt || localStorage.getItem('jwt');

  useEffect(() => {
    if (jwt) {
      getUsersOrders(jwt);
    }
  }, [jwt]);

  return (
    <div className="container py-3">
    <h2 className="text-white mb-4 text-center">My Orders</h2>
  
    <div className="row justify-content-center">
      <div className="col-lg-8 col-md-10 col-sm-12">
        {orders.length > 0 ? (
          orders.map((order, orderIndex) =>
            order.items.map((item, itemIndex) => (
              <OrderCard
                key={`${orderIndex}-${itemIndex}`}
                item={item}
                orders={order}
              />
            ))
          )
        ) : (
          <p className="text-white text-center">No orders available.</p>
        )}
      </div>
    </div>
  </div>
    );
};

export default Orders;
