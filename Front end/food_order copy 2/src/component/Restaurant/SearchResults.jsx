import React, { useEffect, useState, useContext } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import RestaurantCardSearch from "./RestaurantCardSearch";

import { API_URI } from "../Config/api";
import { useAuth } from '../Auth/AuthContext';
const SearchResults = () => {
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
//   const { jwt,auth } = useAuth();
  const [results, setResults] = useState([]);
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    const fetchSearchResults = async () => {

      try {
      
        const response = await axios.get(`${API_URI}/api/restaurants/search?keyword=${query}`, {
          headers: { Authorization: `Bearer ${jwt}` },
        });
        setResults(response.data);
       
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    if (query) fetchSearchResults();
  }, [query, jwt]);

  return (
    <div className="p-5 row">
      {results.length === 0 ? (
        <p>No restaurants found for "{query}"</p>
      ) : (
        results.map((restaurant) => (
          <div key={restaurant.id} className="col-md-4 mb-4">
            <RestaurantCardSearch restaurant={restaurant} />
            
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;
