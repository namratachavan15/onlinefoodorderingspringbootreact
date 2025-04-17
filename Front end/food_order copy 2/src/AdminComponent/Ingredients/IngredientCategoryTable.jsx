import React, { useEffect } from 'react'
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { Card, CardHeader, Table,Modal,ModalBody } from 'reactstrap'; 
import CreateIngredientCategoryForm from './CreateIngredientCategoryForm';
import { useState } from 'react';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';
import { useIngredients } from '../../component/State/Ingredient/IngredientsContext';
const menus=[1,1,1,1,1,1]
const IngredientCategoryTable = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const jwt=localStorage.getItem('jwt')
  const {getIngredientsCategory,category}=useIngredients()
  const {usersRestaurant} =useRestaurantContext()
  useEffect(()=>{
    getIngredientsCategory({ id:usersRestaurant.id, jwt })
  },[usersRestaurant.id, jwt])

  return (
    <div style={{ backgroundColor: '#191919', color: 'white'}}>
    <Card className="mt-3 w-100" style={{ backgroundColor: '#1e1e1e', color: 'white', border: 'none' }}>
      <CardHeader className='d-flex'>
        <h5>Ingredient Category</h5>
        <IoMdCreate  onClick={toggle} className='ml-auto' style={{ cursor: 'pointer' }} />
      </CardHeader>
      <Table className="table-dark mb-0" responsive >
        <thead style={{ backgroundColor: '#191919', color: 'white' }}>
          <tr>
           
            <th>Id</th>
            <th>name</th>
            
            
          </tr>
        </thead>
        <tbody>
          {category.map((item, index) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              
              
            </tr>
          ))}
        </tbody>
      </Table>
    </Card>
    <Modal isOpen={modal} toggle={toggle} centered>
        {/* <ModalHeader toggle={toggle} style={{ backgroundColor:'#0D0D0D' }}>Create Food Category</ModalHeader> */}
        <ModalBody style={{ backgroundColor: '#191919', color: 'white' }}>
       <CreateIngredientCategoryForm/>
        </ModalBody>
      </Modal>
  </div>
  )
}

export default IngredientCategoryTable
