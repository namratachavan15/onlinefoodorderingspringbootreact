import React from 'react'
import { Card, CardBody, Button } from 'reactstrap'
import { FaCheckCircle } from 'react-icons/fa'

const OrderCard = ({item,orders}) => {
  console.log('Orders:',JSON.stringify(orders));
  return (
    <Card className='d-flex justify-content-between align-items-center w-100 p-1 mb-4 bg-black'>
      <CardBody className='d-flex justify-content-between w-100 bg-black'>
        <div className='d-flex align-items-center'>
          <img 
            className='h-16 w-16 mr-4'
            src={item.food.images[0]} 
            alt="Pizza"
          />
          <div style={{color:'white'}}>
            <p>{item.food.name}</p>
            <p>${item.totalPrice}</p>
          </div>
        </div>
        <div>
          
          <Button className='mt-3' disabled style={{color:"#e91e63",backgroundColor:'black' }}>
             {orders.orderStatus}
          </Button>
        </div>
      </CardBody>
    </Card>
  )
}

export default OrderCard
