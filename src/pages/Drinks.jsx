import React, { useContext, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import CategoryCard from '../components/CategoryCard';
import FoodCard from '../components/FoodCard';
import DrinksContext from '../context/DrinksContext';

import { fetchAllDrinks, fetchCatDrinks, fetchDrinksByCategory } from '../services/api';

function Drinks() {
  const {
    drinks,
    setDrinks,
    categories,
    setCategories,
    drinkCategory,
    setDrinkCategory,
  } = useContext(DrinksContext);

  useEffect(() => {
    const TWELVE_DRINKS = 12;
    async function fetchData() {
      if (drinkCategory === 'All') {
        const drinksFromApi = await fetchAllDrinks();
        setDrinks(drinksFromApi.drinks.slice(0, TWELVE_DRINKS));
      } else {
        const drinksFromApi = await fetchDrinksByCategory(drinkCategory);
        setDrinks(drinksFromApi.drinks.slice(0, TWELVE_DRINKS));
      }
    }
    fetchData();
  }, [drinkCategory]);

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
      <Button
        data-testid="All-category-filter"
        onClick={ (ev) => { setDrinkCategory(ev.target.innerText); } }
      >
        All
      </Button>
      {categories.map((category, index) => (<CategoryCard
        key={ index }
        food={ false }
        name={ category.strCategory }
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
