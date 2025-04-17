import React, { useState } from 'react';
import {
  Button, Form, FormGroup, Label, Input, Row, Col, Spinner
} from 'reactstrap';
import { AiOutlinePlusCircle, AiOutlineCloseCircle } from 'react-icons/ai';
import { uploadImageToCloud } from '../../util/UploadToCloudary';
import { useRestaurantContext } from '../../component/State/Restaurant/RestaurantContext';

const CreateRestaurantForm = () => {
  const [uploadImage, setUploadImage] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "", description: "", cuisineType: "",
    streetAddress: "", city: "", stateProvider: "",
    postalCode: "", country: "", email: "",
    mobile: "", twitter: "", instagram: "",
    openingHours: "Mon-Sun : 9:00 AM - 12:00 PM",
    images: []
  });

  const jwt = localStorage.getItem("jwt");
  const { createRestaurant } = useRestaurantContext();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadImage(true);
    const image = await uploadImageToCloud(file);
    setFormValues(prev => ({
      ...prev,
      images: [...prev.images, image]
    }));
    setUploadImage(false);
  };

  const handleRemoveImage = (index) => {
    const updatedImages = [...formValues.images];
    updatedImages.splice(index, 1);
    setFormValues(prev => ({
      ...prev,
      images: updatedImages
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formValues.name,
      description: formValues.description,
      cuisineType: formValues.cuisineType,
      address: {
        streetAddress: formValues.streetAddress,
        city: formValues.city,
        stateProvider: formValues.stateProvider,
        postalCode: formValues.postalCode,
        country: formValues.country
      },
      contactInformation: {
        email: formValues.email,
        mobile: formValues.mobile,
        twitter: formValues.twitter,
        instagram: formValues.instagram,
      },
      open: 1,
      openingHours: formValues.openingHours,
      images: formValues.images,
    };
    createRestaurant(data, { token: jwt });
  };

  return (
    <div className="p-4" style={{ maxWidth: '960px',height:'300px' ,margin: '0 auto' }}>
      <h3 className="text-center mb-3">Add New Restaurant</h3>
      <Form onSubmit={handleSubmit}>
        
        {/* Image Upload and Preview */}
        <div className="d-flex align-items-center mb-3 overflow-auto" style={{ gap: "10px", whiteSpace: 'nowrap' }}>
          <label htmlFor="fileInput" className="cursor-pointer">
            <div className="border rounded d-flex justify-content-center align-items-center" style={{ width: 70, height: 70, cursor: 'pointer' }}>
              <AiOutlinePlusCircle size={24} />
            </div>
          </label>
          <input
            type="file"
            id="fileInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handleImageChange}
          />
          {uploadImage && <Spinner size="sm" color="primary" />}
          {formValues.images.map((img, idx) => (
            <div key={idx} className="position-relative" style={{ display: 'inline-block' }}>
              <img src={img} alt={`img-${idx}`} style={{ width: 70, height: 70, objectFit: 'cover', borderRadius: 4 }} />
              <button
                type="button"
                onClick={() => handleRemoveImage(idx)}
                className="position-absolute bg-transparent border-0"
                style={{ top: -5, right: -5 }}
              >
                <AiOutlineCloseCircle size={16} color="red" />
              </button>
            </div>
          ))}
        </div>

        {/* Main Form */}
        <Row form>
          <Col md={6}><FormGroup>
            <Label for="name">Name</Label>
            <Input name="name" value={formValues.name} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}/>
          </FormGroup></Col>

          <Col md={6}><FormGroup>
            <Label for="cuisineType">Cuisine Type</Label>
            <Input name="cuisineType" value={formValues.cuisineType} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}/>
          </FormGroup></Col>

          <Col md={12}><FormGroup>
            <Label for="description">Description</Label>
            <Input name="description" value={formValues.description} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}/>
          </FormGroup></Col>

          <Col md={6}><FormGroup>
            <Label for="openingHours">Opening Hours</Label>
            <Input name="openingHours" value={formValues.openingHours} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}/>
          </FormGroup></Col>

          <Col md={6}><FormGroup>
            <Label for="mobile">Mobile</Label>
            <Input name="mobile" value={formValues.mobile} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}/>
          </FormGroup></Col>

          <Col md={4}><FormGroup>
            <Label for="email">Email</Label>
            <Input type="email" name="email" value={formValues.email} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }} />
          </FormGroup></Col>

          <Col md={4}><FormGroup>
            <Label for="twitter">Twitter</Label>
            <Input name="twitter" value={formValues.twitter} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}/>
          </FormGroup></Col>

          <Col md={4}><FormGroup>
            <Label for="instagram">Instagram</Label>
            <Input name="instagram" value={formValues.instagram} onChange={handleInputChange}   style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}/>
          </FormGroup></Col>

          <Col md={6}><FormGroup>
            <Label for="streetAddress">Street Address</Label>
            <Input name="streetAddress" value={formValues.streetAddress} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }} />
          </FormGroup></Col>

          <Col md={3}><FormGroup>
            <Label for="city">City</Label>
            <Input name="city" value={formValues.city} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }}/>
          </FormGroup></Col>

          <Col md={3}><FormGroup>
            <Label for="stateProvider">State</Label>
            <Input name="stateProvider" value={formValues.stateProvider} onChange={handleInputChange} style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }} />
          </FormGroup></Col>

          <Col md={6}><FormGroup>
            <Label for="postalCode">Postal Code</Label>
            <Input name="postalCode" value={formValues.postalCode} onChange={handleInputChange} style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }} />
          </FormGroup></Col>

          <Col md={6}><FormGroup>
            <Label for="country">Country</Label>
            <Input name="country" value={formValues.country} onChange={handleInputChange}  style={{ backgroundColor: 'black', color: 'white', borderColor: 'gray' }} />
          </FormGroup></Col>
        </Row>

        <Button type="submit" className="mt-2 w-40" style={{backgroundColor:"#E91E63"}}>
            Create Restaurant
          </Button>
      </Form>
    </div>
  );
};

export default CreateRestaurantForm;
