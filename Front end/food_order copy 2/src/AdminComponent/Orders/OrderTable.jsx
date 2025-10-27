import React, { useState, useEffect } from 'react';
import { Card, CardHeader, Table, Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Row, Col } from 'reactstrap';
import { IoMdCreate } from 'react-icons/io';
import { useOrderContext } from '../../component/State/RestaurantOrder/OrderContext';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';
import './Order.css';

const orderStatus = [
  { label: 'Pending', value: 'PENDING' },
  { label: 'Completed', value: 'COMPLETED' },
  { label: 'ALL', value: 'ALL' },
];

const OrderTable = ({ filterValue }) => {
  const jwt = localStorage.getItem('jwt');
  const { fetchRestaurantOrder, updateOrderStatus, orders } = useOrderContext();
  const { usersRestaurant } = useRestaurantContext();
  const [dropdownOpen, setDropdownOpen] = useState({});

  useEffect(() => {
    if (usersRestaurant?.id && jwt) {
      fetchRestaurantOrder({
        restaurantId: usersRestaurant.id,
        orderStatus: filterValue,
        jwt,
      });
    }
  }, [usersRestaurant?.id, filterValue, jwt]);

  const toggleDropdown = (orderId) => {
    setDropdownOpen((prevState) => ({
      ...prevState,
      [orderId]: !prevState[orderId],
    }));
  };

  const handleUpdateOrder = (orderId, orderStatusValue) => {
    updateOrderStatus({ orderId, orderStatus: orderStatusValue, jwt });
    setDropdownOpen((prevState) => ({
      ...prevState,
      [orderId]: false,
    }));
  };

  return (
    <div style={{ backgroundColor: '#191919', color: 'white' }}>
      <Card className="mt-3 w-100" style={{ backgroundColor: '#191919', color: 'white' }}>
        <CardHeader className="d-flex">
          <h5>All Orders</h5>
          {/* <IoMdCreate size={24} className="ml-auto" style={{ cursor: 'pointer' }} /> */}
        </CardHeader>
        <div className="table-responsive">
          <Table responsive className="table-dark mb-0">
            <thead>
              <tr>
                <th>Id</th>
                <th>Image</th>
                <th>Customer</th>
                <th>Price</th>
                <th>Name</th>
                <th>Ingredients</th>
                <th>Status</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>
                      {item.items.map((orderItem, index) => (
                        <img
                          key={index}
                          src={orderItem.food?.images[0]}
                          alt={orderItem.food?.name}
                          
                          width="50"
                          height="50"
                          style={{ marginRight: '5px' }}
                        />
                      ))}
                    </td>
                    <td>{item.customer?.fullName}</td>
                    <td>₹{item.totalAmount}</td>
                    <td>
                      {item.items.map((orderItem, index) => (
                        <p key={index}>{orderItem.food?.name}</p>
                      ))}
                    </td>
                    <td>
                      {item.items.map((orderItem, index) => (
                        <div key={index} className="ingredient-pill">
                          {orderItem.ingredients.map((ingredient, idx) => (
                            <span key={idx} style={{ marginRight: '5px' }}>
                              {ingredient.name}
                            </span>
                          ))}
                        </div>
                      ))}
                    </td>
                    <td>{item.orderStatus}</td>
                    <td>
                      <Dropdown isOpen={dropdownOpen[item.id]} toggle={() => toggleDropdown(item.id)}>
                        <DropdownToggle caret>{item.orderStatus}</DropdownToggle>
                        <DropdownMenu>
                          {orderStatus.map((status) => (
                            <DropdownItem key={status.value} onClick={() => handleUpdateOrder(item.id, status.value)}>
                              {status.label}
                            </DropdownItem>
                          ))}
                        </DropdownMenu>
                      </Dropdown>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
                    No Orders Available
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>
      </Card>
    </div>
  );
};

export default OrderTable;
