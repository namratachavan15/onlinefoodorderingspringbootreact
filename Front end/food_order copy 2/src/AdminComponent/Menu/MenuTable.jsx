import React, { useEffect, useState } from 'react';
import './Menu.css';
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Card, CardHeader, Table, Modal, ModalBody, Button } from 'reactstrap';
import CreateMenuForm from './CreateMenuForm';
import { useMenuItemContext } from '../../component/State/Menu/MenuItemContext';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';

const MenuTable = () => {
  const jwt = localStorage.getItem('jwt');
  const { getMenuItemsByRestaurantId, menuItems, deleteMenuItem } = useMenuItemContext();
  const { usersRestaurant } = useRestaurantContext();

  const [menuModal, setMenuModal] = useState(false);

  const toggleMenuModal = () => setMenuModal(!menuModal);

  useEffect(() => {
    if (usersRestaurant?.id) {
      getMenuItemsByRestaurantId({
        restaurantId: usersRestaurant.id,
        jwt,
        vegetarian: undefined,
        seasonal: undefined,
        foodCategory: undefined,
      });
    }
  }, [usersRestaurant?.id, jwt]);

  const handleDeleteFood = (foodId) => {
    deleteMenuItem({ foodId, jwt });
  };

  return (
    <div className="p-3" style={{ backgroundColor: '#191919', color: 'white' }}>
      <Card className="w-100" style={{ backgroundColor: '#1e1e1e', color: 'white', border: 'none' }}>
        <CardHeader className='d-flex justify-content-between align-items-center'>
          <h5 className="mb-0">Menu</h5>
          <IoMdCreate size={24} onClick={toggleMenuModal} style={{ cursor: 'pointer' }} />
        </CardHeader>

        <div className="table-responsive">
          <Table className='table-dark mb-0' responsive>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Ingredients</th>
                <th>Price</th>
                <th>Availability</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {menuItems.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img
                      src={item.images?.[0] || ''}
                      alt={item.name}
                      width="50"
                      height="50"
                      style={{ borderRadius: '8px', objectFit: 'cover' }}
                    />
                  </td>
                  <td>{item.name}</td>
                  <td>
                    {item.ingredients?.length > 0 ? (
                      <div className="d-flex flex-wrap gap-1">
                        {item.ingredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="badge badge-pill"
                            style={{
                              backgroundColor: '#343a40',
                              color: '#fff',
                              padding: '6px 10px',
                              fontSize: '0.8rem',
                            }}
                          >
                            {ingredient.name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-muted">No ingredients</span>
                    )}
                  </td>
                  <td>₹{item.price}</td>
                  <td>{item.available ? "In stock" : "Out of stock"}</td>
                  <td>
                    <MdDelete
                      onClick={() => handleDeleteFood(item.id)}
                      style={{ cursor: 'pointer', color: '#e74c3c' }}
                      size={20}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Menu Item Modal */}
      <Modal isOpen={menuModal} toggle={toggleMenuModal} centered>
        <ModalBody style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
          <CreateMenuForm />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default MenuTable;
