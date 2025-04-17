import React, { useState } from 'react';
import { Card, Button, Row, Col, Badge } from 'reactstrap';
import { FaPlusCircle, FaMinusCircle, FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../State/Cart/CartContext';
import { useAuth } from '../Auth/AuthContext';


const CartItem = ({item}) => {
  const [quantity, setQuantity] = useState(5);
  const {auth}=useAuth();
  const jwt=localStorage.getItem("jwt");
   const {updateCartItem,removeCartItem}=useCart();
  const handleIncrease = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) setQuantity(prev => prev - 1);
  };

  const handleUpdateartItem=(value)=>{
    console.log("value="+value)
    if(value===-1 && item.quantity===1)
    {
      handleRemoveCartItem()
    }
    const data={cartItemId:item.id,quantity:item.quantity+value}
    
   
    updateCartItem({data,jwt})
    
  }

  const handleRemoveCartItem=()=>{
  
    removeCartItem({cartItemId:item.id,jwt:jwt})
  }
  return (
    <Card className="p-3 mb-3 text-white" style={{backgroundColor:"#0D0D0D",width:'500px'}} >
      <Row>
        <Col sm="3">
          <img
            src={item.food.images[0]}
            alt="Pizza"
            className="img-fluid"
          />
        </Col>
        <Col sm="6">
          <h5>{item.food.name}</h5>
          <div className="d-flex align-items-center">
            <Button color="link" onClick={()=>handleUpdateartItem(-1)}>
              <FaMinusCircle size={20} color="white" />
            </Button>
            <span className="mx-2">{item.quantity}</span>
            <Button color="link" onClick={()=>handleUpdateartItem(1)}>
              <FaPlusCircle size={20}  color="white" backgroundColor="black"/>
            </Button>
          </div>
        </Col>
         <Col sm="3" className="d-flex flex-column align-items-center">
          <p>₹{item.totalPrice}</p>
          <Button color="danger" size="sm">
            <FaTrashAlt  onClick={handleRemoveCartItem}/>
          </Button>
        </Col> 
      </Row>
      <div className="pt-3 space-x-2">
        {item.ingredients.map((item, index) => (
          <Badge
          key={index}
          className="mr-2"
          style={{ backgroundColor: 'gray', color: 'white' }} // Set background to gray and text color to white
        >
          {item}
        </Badge>
        ))}
      </div>
    </Card>
  );
};

export default CartItem;
