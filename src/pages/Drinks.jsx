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
  }, [drinkCategory, setDrinks]);

  useEffect(() => {
    async function fetchData() {
      const FIVE_CATEGORIES = 5;
      const categoriesFromApi = await fetchCatDrinks();
      setCategories(categoriesFromApi.drinks.slice(0, FIVE_CATEGORIES));
    }
    fetchData();
  }, [setCategories]);

  return (
    <>
      <Button
        data-testid="All-category-filter"
        onClick={ (ev) => { setDrinkCategory(ev.target.innerText); } }
      >
        All
      </Button>
      {categories.map((category, index) => (<CategoryCard
        key={ index }
        comida={ false }
        name={ category.strCategory }
      />))}
      {drinks.map(({ idDrink, strDrink, strDrinkThumb }, index) => (<FoodCard
        index={ index }
        key={ idDrink }
        id={ idDrink }
        food={ strDrink }
        thumb={ strDrinkThumb }
        comida={ false }
      />))}
    </>

  );
}

export default Drinks;
