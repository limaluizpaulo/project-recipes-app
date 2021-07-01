import React, { useEffect, useState } from 'react';
import { getDrinkRecipes } from '../services';

const SIX = 6;

function RecDrinks() {
  const [recDrinks, setRecDrinks] = useState([]);

  useEffect(() => {
    const fetchRecDrinks = async () => {
      const drink = await getDrinkRecipes();
      setRecDrinks(drink.slice(0, SIX));
    };
    fetchRecDrinks();
  }, []);

  console.log(recDrinks);

  return (
    <div>BEBIDAS</div>
  );
}

export default RecDrinks;
