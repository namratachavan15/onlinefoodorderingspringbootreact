import React, { createContext, useContext, useState } from 'react';
//import { api } from "../../Config/api"; // Assuming this is the API setup
import { api } from '../../Config/api';
// Create IngredientsContext
const IngredientsContext = createContext();

// Create IngredientsProvider
export const IngredientsProvider = ({ children }) => {
  const [ingredients, setIngredients] = useState([]);
  const [category, setCategory] = useState([]);
  const [update, setUpdate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get all ingredients of a restaurant
  const getIngredientsOfRestaurant = async ({ id, jwt }) => {
  
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/ingredients/restaurant/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setIngredients(response.data);
      console.log("get ingredients",response.data)
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Create an ingredient
  const createIngredient = async ({ data, jwt }) => {
   
    setLoading(true);
    try {
      const response = await api.post(`/api/admin/ingredients`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setIngredients((prev) => [...prev, response.data]);
    
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Create an ingredient category
  const createIngredientCategory = async ({ data, jwt }) => {
    setLoading(true);
    try {
      const response = await api.post(`/api/admin/ingredients/category`, data, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setCategory((prev) => [...prev, response.data]);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Get ingredient categories for a restaurant
  const getIngredientsCategory = async ({ id, jwt }) => {
    setLoading(true);
    try {
      const response = await api.get(`/api/admin/ingredients/restaurant/${id}/category`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setCategory(response.data);
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  // Update the stock of an ingredient
  const updateStockOfIngredient = async ({ id, jwt }) => {
   
    setLoading(true);
    try {
      const { data } = await api.put(`/api/admin/ingredients/${id}/stock`, {}, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      setUpdate(data);
      setIngredients((prev) =>
        prev.map((ing) => (ing.id === data.id ? data : ing))
      );
      setLoading(false);
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <IngredientsContext.Provider
      value={{
        ingredients,
        category,
        update,
        loading,
        error,
        getIngredientsOfRestaurant,
        createIngredient,
        createIngredientCategory,
        getIngredientsCategory,
        updateStockOfIngredient,
      }}
    >
      {children}
    </IngredientsContext.Provider>
  );
};

// Custom hook to use the IngredientsContext
export const useIngredients = () => {
  return useContext(IngredientsContext);
};
