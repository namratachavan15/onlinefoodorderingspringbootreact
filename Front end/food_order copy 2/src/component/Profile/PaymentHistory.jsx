import React, { useEffect } from 'react';
import { useOrderContext } from '../State/Order/OrderContext';
import { useAuth } from '../Auth/AuthContext';
import { Card, CardBody, CardTitle, CardText } from 'reactstrap';

const PaymentHistory = () => {
  const { orders } = useOrderContext();
  const { jwt } = useAuth();

  useEffect(() => {
    console.log("All Orders:", orders);
  }, [orders]);

  if (!orders || orders.length === 0) {
    return <div className="text-white text-center mt-4">No previous orders found.</div>;
  }

  return (
    <div className='bg-dark py-4 px-3' style={{ minHeight: '100vh' }}>
      <h1 className="text-center text-white mb-4">Payment History</h1>

      <div className="d-flex flex-wrap justify-content-center gap-4">
        {orders.map((order, idx) => (
          <Card key={order.id || idx} style={{ 
            width: '280px', 
            height: 'auto', 
            backgroundColor: '#191919', 
            color: 'white',
            flexShrink: 0 
          }}>
            <CardBody>
              <CardTitle tag="h5">Order #{order.id}</CardTitle>
              <CardText><strong>Status:</strong> {order.orderStatus}</CardText>
              <CardText><strong>Items:</strong></CardText>
              <ul style={{ fontSize: '0.9rem', paddingLeft: '1.2rem' }}>
                {order.items.slice(0, 3).map((item, index) => (
                  <li key={index}>
                    {item.food.name} - ${item.totalPrice}
                  </li>
                ))}
                {order.items.length > 3 && <li>+{order.items.length - 3} more</li>}
              </ul>
              <CardText><strong>Total:</strong> ${order.totalAmount}</CardText>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PaymentHistory;
