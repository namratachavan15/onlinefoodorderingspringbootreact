import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Image } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import MenuCard from './MenuCard';
import { useParams } from 'react-router-dom';
import { useRestaurantContext } from '../State/Restaurant/RestaurantContext';
import { useMenuItemContext } from '../State/Menu/MenuItemContext';
import './RestaurantCard.css'
import './RestaurantDetails.css'
const foodTypes = [
  { label: "All", value: "all" },
  { label: "Vegetarian Only", value: "vegetarian" },
  { label: "Non-Vegetarian", value: "non_vegetarian" },
  { label: "Seasonal", value: "seasonal" }
];

const RestaurantDetails = () => {
  const { id } = useParams();
  const { restaurant, restaurantCategory, getRestaurantById, getRestaurantsCategory } = useRestaurantContext();
  const { getMenuItemsByRestaurantId, menuItems } = useMenuItemContext();
  const [foodType, setFoodType] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleFilter = (e) => {
    setFoodType(e.target.value)
   
  };

  const handleFilterCategory = (e) => {
    const selectedValue = e.target.value; // Get selected category
    setSelectedCategory(selectedValue);  // Update the selected category
   
  };

  // Fetch restaurant data when component mounts
  useEffect(() => {
    if (id) {
      getRestaurantById(id, localStorage.getItem('jwt'));
      getRestaurantsCategory(id, localStorage.getItem('jwt'));
    } else {
      console.log("Restaurant ID is undefined.");
    }
  }, [id]);

  // Fetch menu items based on the selected category
  useEffect(() => {
    getMenuItemsByRestaurantId({
      restaurantId: id,
      jwt: localStorage.getItem('jwt'),
      filters: {
        vegetarian:foodType==="vegetarian",
        nonveg:foodType==="non_vegetarian",
        seasonal:foodType==="seasonal",
        food_category: selectedCategory // Use selected category here
      }
    });
  }, [selectedCategory,foodType]);

  const categoriesList = restaurantCategory?.map(item => item.name) || [];

  return (
    <Container className='px-5'>
      <section>
        <h3 className='text-white py-2 mt-4'>Home/india/indian fast food/</h3>
        <Row style={{ height: '600px' }}>
          <Col xs={12} style={{ height: '300px' }}>
            <Image
              className='w-100'
              src={restaurant?.images[1]}
              alt="Restaurant"
              fluid
              style={{ height: '300px' }}
            />
          </Col>
          <Col xs={12} lg={6} style={{ height: '300px' }}>
            <Image
              className='w-100'
              src="https://media.istockphoto.com/id/1131393938/photo/very-stylish-indian-gourmet-restaurant.jpg?s=2048x2048&w=is&k=20&c=d7djnSC6-uLAjpdM8GPwAJP7sp2v1F4kU3f_0Bz0xDc="
              alt="Restaurant Interior"
              fluid
              style={{ height: '300px' }}
            />
          </Col>
          <Col xs={12} lg={6} style={{ height: '300px' }}>
            <Image
              className='w-100 '
              src="https://cdn.pixabay.com/photo/2013/12/31/21/47/restaurant-237060_1280.jpg"
              alt="Restaurant Setting"
              fluid
              style={{ height: '300px' }}
            />
          </Col>
        </Row>
        <div className='pt-3 pb-5'>
          <h1 className='text-4xl font-semibold'>{restaurant?.name}</h1>
          <p className='text-gray-600 mt-1'>{restaurant?.description}</p>
          <div className='mt-3'>
            <p className='text-gray-600 d-flex align-items-center gap-3'>
              <FaMapMarkerAlt />
              <span>Mumbai, Maharashtra</span>
            </p>
            <p className='text-gray-600 d-flex align-items-center gap-3'>
              <FaCalendarAlt />
              <span>Mon-Sun: 9:00 AM - 9:00 PM (Today)</span>
            </p>
          </div>
        </div>
      </section>
      <hr />
      <section className='pt-4 d-flex flex-column flex-lg-row'>
        <Col xs={12} lg={3} className='filter'>
          <div className='box p-3 shadow'>
            <h5>Food Type</h5>
            <Form>
              <Form.Group className="mb-5">
                {foodTypes.map((item) => (
                  <Form.Check
                    key={item.value}
                    type="radio"
                    label={item.label}
                    value={item.value}
                    name="food_type"
                    onChange={handleFilter}
                    checked={foodType === item.value}
                    className='mb-5'
                  />
                ))}
              </Form.Group>
            </Form>
            <h5>Food Category</h5>
            <Form>
              <Form.Group className="mb-5">
                {categoriesList.length > 0 ? (
                  categoriesList.map((item) => (
                    <Form.Check
                      key={item}
                      type="radio"
                      label={item}
                      value={item}  // Use `item` instead of `item.name`
                      name="food_category"
                      onChange={handleFilterCategory}  // Trigger category change
                      className="mb-5"
                    />
                  ))
                ) : (
                  <p>No categories available.</p>
                )}
              </Form.Group>
            </Form>
          </div>
        </Col>

        <Row className="g-4" style={{width:'600px',marginLeft:'20px'}}>
          {menuItems.length > 0 ? (
            menuItems.map((item, index) => (
              <Col key={index} className='menuItem'>
                <MenuCard item={item} />
              </Col>
            ))
          ) : (
            <p>No menu items available for this category.</p>
          )}
        </Row>
      </section>
    </Container>
  );
};

export default RestaurantDetails;
