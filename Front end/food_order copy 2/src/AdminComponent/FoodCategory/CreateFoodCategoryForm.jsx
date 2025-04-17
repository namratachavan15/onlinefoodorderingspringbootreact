import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button, Container, Row, Col } from "reactstrap";
import { useRestaurantContext } from "../../component/State/Restaurant/RestaurantContext";

const CreateFoodCategoryForm = () => {
  const [formData, setFormData] = useState({ categoryName: "", restaurantId: "" });
  const { createCategory } = useRestaurantContext();
  const { usersRestaurant } = useRestaurantContext();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const data = {
      name: formData.categoryName, // Ensure you're passing the correct field
      restaurantId: usersRestaurant.id, // Use actual restaurant ID if needed
    };
    createCategory({ reqData: data, jwt: localStorage.getItem("jwt") });
    console.log(data); // Log the submitted data
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Update the formData based on the input field name
    });
  };

  return (
    <Container className="mt-5" >
      <h1 className="text-center text-secondary mb-4">Create Food Category</h1>
      <Row className="justify-content-center ">
        <Col xs={12} sm={10} md={8} lg={6} style={{width:'600px'}}>
          <Form
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#1c1c1c", // Dark background for the form
              padding: "30px",
              borderRadius: "12px",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)", // Shadow for 3D effect
              border: "none",
              width:'400px'
            }}
          >
            <FormGroup>
              <Label for="categoryName" style={{ color: "#fff", fontWeight: "bold" }}>
                Category Name
              </Label>
              <Input
                type="text"
                id="categoryName" // Set id to match state property
                name="categoryName" // Set name to match state property
                placeholder="Enter category name"
                value={formData.categoryName} // Ensure value binds to categoryName state
                onChange={handleInputChange} // Bind to handleInputChange
                style={{
                  backgroundColor: "#333", // Darker background for input
                  color: "#fff", // White text for input
                  borderColor: "#444", // Lighter border color
                  borderRadius: "8px",
                  padding: "10px",
                  fontSize: "16px",
                }}
              />
            </FormGroup>
            <Button
              type="submit"
              style={{
                backgroundColor: "#E91E63", // Vibrant pink button
                color: "#fff", // White text on button
                border: "none",
                borderRadius: "8px",
                padding: "10px 20px",
                fontSize: "16px",
                width: "100%", // Full-width button
                boxShadow: "0 4px 8px rgba(233, 30, 99, 0.2)", // Light shadow for button
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

export default CreateFoodCategoryForm;
