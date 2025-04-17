import React, { useState, useEffect } from 'react';
import { IoMdCreate } from "react-icons/io";
import { Card, CardHeader, Table, Modal, ModalBody } from 'reactstrap'; 
import CreateFoodCategoryForm from './CreateFoodCategoryForm';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';

const FoodCategoryTable = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const { usersRestaurant, getRestaurantsCategory, restaurantCategory } = useRestaurantContext();
  const jwt = localStorage.getItem("jwt");

  useEffect(() => {
    if (usersRestaurant?.id) {
      getRestaurantsCategory(usersRestaurant.id, jwt);
    }
  }, [usersRestaurant?.id, jwt]);

  return (
    <div className="p-3" style={{ backgroundColor: '#191919', color: 'white', minHeight: '100vh' }}>
      <Card className="w-100" style={{ backgroundColor: '#1e1e1e', color: 'white', border: 'none' }}>
        <CardHeader className='d-flex justify-content-between align-items-center'>
          <h5 className="mb-0">Food Category</h5>
          <IoMdCreate onClick={toggle} style={{ cursor: 'pointer' }} size={24} />
        </CardHeader>

        <div className="table-responsive">
          <Table className="table-dark mb-0" responsive>
            <thead>
              <tr>
                <th>Id</th>
                <th>Category Name</th>
              </tr>
            </thead>
            <tbody>
              {restaurantCategory.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Create Category Modal */}
      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalBody style={{ backgroundColor: '#1c1c1c', color: 'white' }}>
          <CreateFoodCategoryForm />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default FoodCategoryTable;
