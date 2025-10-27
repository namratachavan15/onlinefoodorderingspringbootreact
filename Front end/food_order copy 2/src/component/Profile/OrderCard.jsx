import React from 'react';
import { Card, CardBody, Button } from 'reactstrap';
import { FaCheckCircle } from 'react-icons/fa';

const OrderCard = ({ item, orders }) => {
  return (
    <Card className="mb-3 text-white w-100" style={{ backgroundColor: '#191919' }}>
    <CardBody className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center">
      <div className="d-flex align-items-start">
        <img
          className="img-fluid me-3"
          src={item.food.images[0]}
          alt="Food"
          style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }}
        />
        <div>
          <p className="mb-1 fw-bold">{item.food.name}</p>
          <p className="mb-0">₹{item.totalPrice}</p>
        </div>
      </div>
      <div className="mt-3 mt-md-0">
        <Button
          className="border-0"
          style={{ color: '#e91e63', backgroundColor: 'black' }}
        >
          {orders.orderStatus}
        </Button>
      </div>
    </CardBody>
  </Card>
  
  );
};

export default OrderCard;
