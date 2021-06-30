import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import DrinksContext from '../context/DrinksContext';

import { fetchAllDrinks, fetchCatDrinks } from '../services/api';

function Drinks() {
  const { drinks, setDrinks, categories, setCategories } = useContext(DrinksContext);

  useEffect(() => {
    async function fetchData() {
      const TWELVE_DRINKS = 12;
      const drinksFromApi = await fetchAllDrinks();
      setDrinks(drinksFromApi.drinks.slice(0, TWELVE_DRINKS));
    }
    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const FIVE_CATEGORIES = 5;
      const categoriesFromApi = await fetchCatDrinks();
      setCategories(categoriesFromApi.drinks.slice(0, FIVE_CATEGORIES));
    }
    fetchData();
  }, []);

  return (
    <section>
      <Button>All</Button>
      {categories.map(({ strCategory }, index) => (<CategoryCard
        key={ index }
        name={ strCategory }
      />))}
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
