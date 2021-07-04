import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import fetchFood, { BY_INGREDIENT } from '../services/FoodAPI';
import fetchDrink from '../services/DrinkAPI';
import Footer from './Footer';

export default function MealsByIngredients() {
  const history = useHistory();
  const path = history.location.pathname;
  const [ingredients, setIngredients] = useState(null);
  // const [drink, setDrink] = useState(null);

  useEffect(() => {
    if (path === '/explorar/comidas/ingredientes') {
      fetchFood(BY_INGREDIENT)
        .then((res) => setIngredients(res));
    } if (path === '/explorar/bebidas/ingredientes') {
      fetchDrink(BY_INGREDIENT)
        .then((res) => setIngredients(res));
    }
  }, [path]);

  return (
    <div>
      {console.log(ingredients)}
      <Footer />
    </div>
  );
}
