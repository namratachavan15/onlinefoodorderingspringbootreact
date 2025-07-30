import React, { useState, useEffect } from "react";
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

const CreateIngredientForm = () => {
  const jwt = localStorage.getItem("jwt");
  const {
    createIngredient,
    category,
    getIngredientsOfRestaurant,
  } = useIngredients();
  const { usersRestaurant } = useRestaurantContext();

  const [formData, setFormData] = useState({
    name: "",
    categoryId: "",
  });

  // ✅ Only run this once when restaurant and jwt are available
  useEffect(() => {
    if (usersRestaurant?.id && jwt) {
      getIngredientsOfRestaurant({ id: usersRestaurant.id, jwt });
    }
  }, [usersRestaurant?.id, jwt]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      ...formData,
      restaurantId: usersRestaurant.id,
    };
    createIngredient({ data, jwt });

    // ✅ Clear the form only after submit
    setFormData({ name: "", categoryId: "" });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Container className="mt-5">
      <h1 className="text-center text-secondary mb-4">Create Ingredient</h1>
      <Row className="justify-content-center">
        <Col xs={12} sm={10} md={8} lg={6} style={{ width: "600px" }}>
          <Form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#1c1c1c",
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
              border: "none",
              width: "400px",
            }}
          >
            <FormGroup>
              <Label for="name" style={{ color: "#fff", fontWeight: "bold" }}>
                Ingredient Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Enter ingredient name"
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

            <FormGroup>
              <Label
                for="categoryId"
                style={{ color: "#fff", fontWeight: "bold" }}
              >
                Ingredient Category
              </Label>
              <Input
                type="select"
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleInputChange}
                style={{
                  backgroundColor: "#333",
                  color: "#fff",
                  borderColor: "#444",
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                  appearance: "none",
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                }}
              >
                <option
                  value=""
                  style={{ backgroundColor: "#333", color: "#ccc" }}
                >
                  Select Category
                </option>
                {category &&
                  category.map((item) => (
                    <option
                      key={item.id}
                      value={item.id}
                      style={{ backgroundColor: "#333", color: "#fff" }}
                    >
                      {item.name}
                    </option>
                  ))}
              </Input>
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
              Create Ingredient
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateIngredientForm;
