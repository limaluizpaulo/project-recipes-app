import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import DrinksContext from '../context/DrinksContext';

import { fetchAllDrinks } from '../services/api';

function Drinks() {
  const { drinks, setDrinks } = useContext(DrinksContext);

  useEffect(() => {
    async function fetchData() {
      const TWELVE_DRINKS = 12;
      const drinksFromApi = await fetchAllDrinks();
      setDrinks(drinksFromApi.drinks.slice(0, TWELVE_DRINKS));
    }
    fetchData();
  }, []);

  return (
    <section>
      <h1>Drinks</h1>
      {drinks.map((recipe, index) => (<FoodCard
        index={ index }
        key={ recipe.idDrink }
        food={ recipe.strDrink }
        thumb={ recipe.strDrinkThumb }
      />))}
    </section>

  );
}

export default Drinks;
