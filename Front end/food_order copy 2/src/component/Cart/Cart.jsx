import React from 'react';
import { Button, Modal, Form, Input, FormGroup, Card, Row, Col } from 'reactstrap';
import AddressCart from './AddressCart';
import CartItem from './CartItem';
import { FaLocationArrow } from 'react-icons/fa';
import './Cart.css';
import { useCart } from '../State/Cart/CartContext';
import { useOrderContext } from './../State/Order/OrderContext';
import { useAuth } from '../Auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useRestaurantContext } from '../State/Restaurant/RestaurantContext';

const Cart = () => {
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = React.useState({
    streetAddress: '',
    state: '',
    pincode: '',
    city: '',
  });

  const handleOpenAddressModel = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { cartItems, clearCart, cart } = useCart();
  const { user } = useAuth();
  const { createOrder } = useOrderContext();
  const { restaurant } = useRestaurantContext();
  const navigate = useNavigate();
  const jwt = localStorage.getItem('jwt');

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      jwt: jwt,
      order: {
        restaurantId: restaurant?.id,
        deliveryAddress: {
          fullName: user?.fullName || '',
          streetAddress: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          postalCode: formData.pincode,
          country: 'India',
        },
        cartItems: cart.items,
      },
    };

    await createOrder(data);
    await clearCart(jwt);
    navigate('/payment/success/');
  };

  const createOrderUsingSelectedAddress = () => {
    console.log('Address selected!');
  };

  // Calculate totals dynamically
  const deliveryFee = 21;
  const gstCharge = 33;

  const itemsTotal = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);
  const totalPay = itemsTotal > 0 ? itemsTotal + deliveryFee + gstCharge : 0;

  return (
    <>
      <main>
        <Row className="d-flex justify-content-between">
          <Col lg="4" className="pt-10">
            {cartItems.map((item, index) => (
              <CartItem key={index} item={item} />
            ))}

            <hr className="my-13" />

            <div className="billDetails px-5 text-sm">
              <p className="font-extralight py-5">Bill Detail</p>
              <div className="space-y-2">
                <div className="d-flex justify-content-between text-gray-400">
                  <p>Item Total</p>
                  <p>₹{itemsTotal}</p>
                </div>
                <div className="d-flex justify-content-between text-gray-400">
                  <p>Delivery Fee</p>
                  <p>₹{itemsTotal > 0 ? deliveryFee : 0}</p>
                </div>
                <div className="d-flex justify-content-between text-gray-400">
                  <p>GST and Restaurant Charges</p>
                  <p>₹{itemsTotal > 0 ? gstCharge : 0}</p>
                </div>
                <hr className="my-4" />
                <div className="d-flex justify-content-between text-gray-400">
                  <p>Total Pay</p>
                  <p>₹{totalPay}</p>
                </div>
              </div>
            </div>
          </Col>

          <Col lg="7" className="d-flex justify-content-center pt-10 pl-10">
            <div>
              <h1 className="text-center font-semibold text-2xl py-10">Choose Delivery Address</h1>
              <Row className="d-flex justify-content-center">
                {[1, 1, 1, 1, 1].map((item, index) => (
                  <Col key={index} md="4" lg="3" className="mb-4">
                    <AddressCart key={index} handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={true} />
                  </Col>
                ))}
                <Col md="4" lg="3">
                  <Card className="d-flex flex-row gap-3 p-4 w-100" style={{ backgroundColor: '#191919' }}>
                    <FaLocationArrow size={15} className="text-white" />
                    <div className="space-y-3 text-gray-500">
                      <h1 className="font-semibold text-sm">Add New Address</h1>
                      <Button
                        outline
                        block
                        onClick={handleOpenAddressModel}
                        style={{
                          color: '#E91E63',
                          borderColor: '#E91E63',
                          backgroundColor: 'transparent',
                        }}
                      >
                        ADD
                      </Button>
                    </div>
                  </Card>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </main>

      <Modal isOpen={open} toggle={handleClose} className="custom-modal" style={{ width: '450px' }}>
        <Form onSubmit={handleSubmit} style={{ backgroundColor: '#0D0D0D' }} className="p-4">
          <div className="modal-body" style={{ backgroundColor: '#0D0D0D' }}>
            <FormGroup>
              <Input
                type="text"
                name="streetAddress"
                id="streetAddress"
                placeholder="Street Address"
                value={formData.streetAddress}
                onChange={handleFormChange}
                required
                style={{ backgroundColor: 'black', color: 'white' }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="state"
                id="state"
                placeholder="State"
                value={formData.state}
                onChange={handleFormChange}
                required
                style={{ backgroundColor: 'black', color: 'white' }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="city"
                id="city"
                placeholder="City"
                value={formData.city}
                onChange={handleFormChange}
                required
                style={{ backgroundColor: 'black', color: 'white' }}
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="text"
                name="pincode"
                id="pincode"
                placeholder="Pincode"
                value={formData.pincode}
                onChange={handleFormChange}
                required
                style={{ backgroundColor: 'black', color: 'white' }}
              />
            </FormGroup>
          </div>
          <div className="modal-footer">
            <Button block type="submit" style={{ backgroundColor: '#E91E63' }}>
              DELIVER HERE
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default Cart;
