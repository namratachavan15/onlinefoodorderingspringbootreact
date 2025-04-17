import React, { useEffect } from "react";
import { IoMdCreate } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import {
  Card,
  CardHeader,
  Table,
  Modal,
  ModalHeader,
  ModalBody,
  Button,
} from "reactstrap";
import CreateFoodCategoryForm from "../FoodCategory/CreateFoodCategoryForm";
import { useState } from "react";
import CreateIngredientForm from "./CreateIngredientForm";
import { useRestaurantContext } from "../../component/State/Restaurant/RestaurantContext";
import { useIngredients } from "../../component/State/Ingredient/IngredientsContext";
const menus = [1, 1, 1, 1, 1, 1];
const IngredientTable = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);
  const jwt = localStorage.getItem("jwt");
  const { getIngredientsOfRestaurant, updateStockOfIngredient, ingredients } =
    useIngredients();
  const { usersRestaurant } = useRestaurantContext();
  useEffect(() => {
    getIngredientsOfRestaurant({ jwt, id: usersRestaurant.id });
  }, [usersRestaurant.id, jwt]);

  const handleUpdateStock = (id) => {
    if (!id || !jwt) {
      console.error("Missing id or jwt");
      return; // Prevent API call if either id or jwt is missing
    }

    // Call the updateStockOfIngredient function with valid id and jwt
    updateStockOfIngredient({ id, jwt });
  };
  return (
    <div style={{ backgroundColor: "#191919", color: "white" }}>
      <Card
        className="mt-3 w-100"
        style={{ backgroundColor: "#191919", color: "white" }}
      >
        <CardHeader className="d-flex">
          <h5>Ingredient</h5>
          <IoMdCreate
            onClick={toggle}
            className="ml-auto"
            style={{ cursor: "pointer" }}
          />
        </CardHeader>
        <Table className="table-dark mb-0" responsive>
          <thead style={{ backgroundColor: "#191919", color: "white" }}>
            <tr style={{ backgroundColor: "#191919", color: "white" }}>
              <th>Id</th>
              <th>name</th>
              <th align="right">Category</th>
              <th align="right">Availability</th>
              <th align="right" style={{ marginLeft: "20px" }}>
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {ingredients.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.name}</td>

                <td>{item.category.name}</td>
                <td>
                  <Button
                    outline
                    color="secondary" // You can choose any color here
                    onClick={() => handleUpdateStock(item.id)}
                    style={{
                      backgroundColor: "transparent", // Remove background color
                      border: "none", // Remove border
                      color: "white", // Text color (white in this case)
                      padding: "0", // Optional: Remove padding for a "text-only" look
                      fontWeight: "normal", // Optional: Adjust font weight to make it look more like plain text
                    }}
                  >
                    {item.inStock ? "In Stock" : "Out of Stock"}
                  </Button>
                </td>
                <td>
                  <MdDelete />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>
      <Modal isOpen={modal} toggle={toggle} centered>
        {/* <ModalHeader toggle={toggle} style={{ backgroundColor:'#0D0D0D' }}>Create Food Category</ModalHeader> */}
        <ModalBody style={{ backgroundColor: "#191919", color: "white" }}>
          <CreateIngredientForm />
        </ModalBody>
      </Modal>
    </div>
  );
};

export default IngredientTable;
