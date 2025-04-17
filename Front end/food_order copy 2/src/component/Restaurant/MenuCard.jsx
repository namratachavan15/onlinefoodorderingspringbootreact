import React, { useState } from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Button } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { FormGroup, FormControlLabel, Checkbox } from '@mui/material';
import { categorizeIngredients } from '../../util/CategorizeIngredients';
import { useCart } from '../State/Cart/CartContext'; // Import the useCart hook

const MenuCard = ({ item }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { addItemToCart } = useCart(); // Get the addItemToCart method from context

  const handleCheckBoxChange = (itemName) => {
    if (selectedIngredients.includes(itemName)) {
      setSelectedIngredients(selectedIngredients.filter((item) => item !== itemName));
    } else {
      setSelectedIngredients([...selectedIngredients, itemName]);
    }
  };

  const handleAddItemToCart = (e) => {
    e.preventDefault();
    
    const reqData = {
      token: localStorage.getItem("jwt"),
      foodId: item.id,
      quantity: 1,
      ingredients: selectedIngredients,
    };
    
    addItemToCart(reqData); // Use the addItemToCart method from the context
   
  };

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <div className="lg:flex items-center justify-between">
          <div className="lg:flex items-center lg:gap-5">
            <img
              className="w-[7rem] h-[7rem] object-cover"
              src={item.images[0]}
              alt="food item"
            />
            <div className="space-y-1 lg:space-y-5 lg:max-w-2xl">
              <p className="font-semibold text-xl">{item.name}</p>
              <p>₹{item.price}</p>
              <p className="text-gray-400">{item.description}</p>
            </div>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails>
        <form onSubmit={handleAddItemToCart}>
          <div className="flex gap-5 flex-wrap">
            {Object.keys(categorizeIngredients(item.ingredients)).map((categoryName, index) => (
              <div key={index}>
                <p>{categoryName}</p>
                <FormGroup>
                  {categorizeIngredients(item.ingredients)[categoryName].map((ingredient, idx) => (
                    <FormControlLabel
                      key={idx}
                      control={<Checkbox onChange={() => handleCheckBoxChange(ingredient.name)} />}
                      label={typeof ingredient === 'string' ? ingredient : ingredient.name} 
                    />
                  ))}
                </FormGroup>
              </div>
            ))}
          </div>
          <div className="pt-5">
            <Button variant="contained" disabled={false} type="submit">
              {true ? "Add to Cart" : "Out Of Stock"}
            </Button>
          </div>
        </form>
      </AccordionDetails>
    </Accordion>
  );
};

export default MenuCard;
