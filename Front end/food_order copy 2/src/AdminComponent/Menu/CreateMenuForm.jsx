import React, { useEffect, useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Row, Col, Spinner
} from 'reactstrap';
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { useMenuItemContext } from '../../component/State/Menu/MenuItemContext';
import { useIngredients } from '../../component/State/Ingredient/IngredientsContext';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';
import { uploadImageToCloud } from './../../util/UploadToCloudary';

const CreateMenuForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const jwt = localStorage.getItem('jwt');
  const { createMenuItem } = useMenuItemContext();
  const { getIngredientsOfRestaurant, ingredients } = useIngredients();
  const { usersRestaurant, getRestaurantsCategory, restaurantCategory } = useRestaurantContext();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: null,
    vegetarian:false,
    seasonal: false,
    ingredients: [],
    images: [],
  });

  useEffect(() => {
    if (usersRestaurant?.id) {
      getIngredientsOfRestaurant({ jwt, id: usersRestaurant.id });
      getRestaurantsCategory({ restaurantId: usersRestaurant?.id, jwt });
    }
  }, [usersRestaurant?.id]);

  const handleChange = (e) => {
    const { name, value, type, checked, selectedOptions } = e.target;
    if (type === 'checkbox') {
      setFormData({ ...formData, [name]: checked });
    } else if (type === 'select-multiple') {
      const selectedIngredients = Array.from(selectedOptions, (option) => {
        const ingredient = ingredients.find((ing) => ing.id === parseInt(option.value));
        return { id: ingredient.id, name: ingredient.name, category: ingredient.category };
      });
      setFormData({ ...formData, ingredients: selectedIngredients });
    } else if (type === 'select-one') {
      setFormData({ ...formData, [name]: parseInt(value) });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadImage(true);
    const image = await uploadImageToCloud(file);
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, image],
    }));
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updated = [...formData.images];
    updated.splice(index, 1);
    setFormData({ ...formData, images: updated });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const menuData = {
      ...formData,
      restaurantId: usersRestaurant.id,
      foodcategory: formData.category,
      ingredients: formData.ingredients.map((ing) => ({
        id: ing.id,
        name: ing.name,
        category: ing.category
      })),
    };
    createMenuItem({ menu: menuData, jwt });
  };

  return (
    <div className="container py-4">
      <h2 className="text-center mb-4">Add New Menu Item</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="g-3 align-items-start">
          {/* Image Upload & Preview */}
          <Col xs="12" md="6">
            <div className="d-flex align-items-center flex-wrap gap-2">
              <label htmlFor="fileInput" className="cursor-pointer">
                <div className="d-flex justify-content-center align-items-center border rounded p-2" style={{ width: 80, height: 80 }}>
                  <AiOutlinePlusCircle size={24} />
                </div>
              </label>
              <input
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleImageChange}
                style={{ backgroundColor: '#191919', color: 'white',display:'none' }}
              />
              {uploadImage && <Spinner size="sm" color="primary" />}
              {formData.images.map((img, index) => (
                <div key={index} className="position-relative">
                  <img src={img} alt={`img-${index}`} style={{ width: 80, height: 80, objectFit: 'cover' }} />
                  <button
                    type="button"
                    className="position-absolute top-0 end-0 bg-transparent border-0"
                    onClick={() => handleRemoveImage(index)}
                  >
                    <AiOutlineCloseCircle size={16} />
                  </button>
                </div>
              ))}
            </div>
          </Col>

          {/* Name */}
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                style={{ backgroundColor: '#191919', color: 'white' }}
              />
            </FormGroup>
          </Col>

          {/* Description */}
          <Col xs="12" md="6">
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="text"
                name="description"
                id="description"
                value={formData.description}
                onChange={handleChange}
                style={{ backgroundColor: '#191919', color: 'white' }}
              />
            </FormGroup>
          </Col>

          {/* Price */}
          <Col xs="6" md="3">
            <FormGroup>
              <Label for="price">Price</Label>
              <Input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                style={{ backgroundColor: '#191919', color: 'white' }}
              />
            </FormGroup>
          </Col>

          {/* Category */}
          <Col xs="6" md="3">
            <FormGroup>
              <Label for="category">Category</Label>
              <Input
                type="select"
                name="category"
                id="category"
                value={formData.category || ''}
                onChange={handleChange}
                style={{ backgroundColor: '#191919', color: 'white' }}
              >
                <option value="" style={{ backgroundColor: '#191919', color: 'white' }}>Select Category</option>
                {restaurantCategory?.map((cat) => (
                  <option key={cat.id} value={cat.id} style={{ backgroundColor: '#191919', color: 'white' }}>{cat.name}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>

          {/* Ingredients */}
          <Col xs="12" md="3">
            <FormGroup>
              <Label for="ingredients">Ingredients</Label>
              <Input
                type="select"
                name="ingredients"
                id="ingredients"
                multiple
                value={formData.ingredients.map((i) => i.id)}
                onChange={handleChange}
                style={{ backgroundColor: '#191919', color: 'white' }}
              >
                {ingredients?.map((ing) => (
                  <option key={ing.id} value={ing.id}>{ing.name}</option>
                ))}
              </Input>
            </FormGroup>
          </Col>

          {/* Vegetarian / Seasonal */}
          <Col xs="6" md="3">
            <FormGroup>
              <Label for="vegetarian">Vegetarian</Label>
              <Input
                type="select"
                name="vegetarian"
                id="vegetarian"
                value={formData.vegetarian}
                onChange={handleChange}
                style={{ backgroundColor: '#191919', color: 'white' }}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </FormGroup>
          </Col>

          <Col xs="6" md="3">
            <FormGroup>
              <Label for="seasonal">Seasonal</Label>
              <Input
                type="select"
                name="seasonal"
                id="seasonal"
                value={formData.seasonal}
                onChange={handleChange}
                style={{ backgroundColor: '#191919', color: 'white' }}
              >
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </Input>
            </FormGroup>
          </Col>

          {/* Submit */}
          <Col xs="12"  className="text-center mt-3">
            <Button  type="submit" className="px-5" style={{ backgroundColor: "#E91E63" }}>
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default CreateMenuForm;
