import React, { useState, useEffect } from 'react';
import { getFoodRecipes } from '../services';

const SIX = 6;

function RecFoods() {
  const [recFoods, setRecFoods] = useState([]);

  useEffect(() => {
    const fetchRecFoods = async () => {
      const meal = await getFoodRecipes();
      setRecFoods(meal.slice(0, SIX));
    };
    fetchRecFoods();
  }, []);

  console.log(recFoods);
  return (
    <div>COMIDAS</div>
  );
}

export default RecFoods;
