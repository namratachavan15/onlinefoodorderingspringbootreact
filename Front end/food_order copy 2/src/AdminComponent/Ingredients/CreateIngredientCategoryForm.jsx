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
import { useIngredients } from "../../component/State/Ingredient/IngredientsContext";

const CreateIngredientCategoryForm = () => {
  const [formData, setFormData] = useState({ name: "" });
  const jwt = localStorage.getItem("jwt");

  const { createIngredientCategory,getIngredientsCategory } = useIngredients();
  const { usersRestaurant } = useRestaurantContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      name: formData.name,
      restaurantId: usersRestaurant.id,
    };
    createIngredientCategory({ data, jwt });
  getIngredientsCategory({ id: usersRestaurant.id, jwt });

  setFormData({ name: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="m-3">
      <h3 className="text-center text-secondary mb-4">Create Ingredient Category</h3>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} style={{ width: "600px" }}>
          <Form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#1c1c1c",
              padding: "30px",
              borderRadius: "12px",
              marginLeft:'15px',
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              border: "none",
              width: "400px",
            }}
          >
            <FormGroup>
              <Label
                for="name"
                style={{ color: "#fff", fontWeight: "bold" }}
              >
                Ingredient Category Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="e.g. Spices, Vegetables, etc."
                value={formData.name}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  borderColor: "#444",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                }}
              />
            </FormGroup>
            <Button
              type="submit"
              style={{
                backgroundColor: "#E91E63",
                color: "#fff",
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                width: "100%",
                boxShadow: "0 4px 8px rgba(233, 30, 99, 0.2)",
              }}
            >
              Create Category
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateIngredientCategoryForm;
