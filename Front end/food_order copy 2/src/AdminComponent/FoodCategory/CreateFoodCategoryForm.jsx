import React, { useState } from "react";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  Container,
  Row,
  Col,
} from "reactstrap";
import { useRestaurantContext } from "../../component/State/Restaurant/RestaurantContext";
import "./FoodCategory.css";

const CreateFoodCategoryForm = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    restaurantId: "",
  });

  const { createCategory, usersRestaurant } = useRestaurantContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.categoryName,
      restaurantId: usersRestaurant.id,
    };
    createCategory({ reqData: data, jwt: localStorage.getItem("jwt") });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <div className="category-form-wrapper">
      <Container>
        <h1 className="text-center text-secondary mb-4">Create Food Category</h1>
        <Row className="justify-content-center">
          <Col xs="12" sm="10" md="8" lg="6" xl="5">
            <Form className="formcategory" onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="categoryName">Category Name</Label>
                <Input
                  type="text"
                  id="categoryName"
                  name="categoryName"
                  placeholder="Enter category name"
                  value={formData.categoryName}
                  onChange={handleInputChange}
                  required
                />
              </FormGroup>
              <Button type="submit">Create Category</Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CreateFoodCategoryForm;
