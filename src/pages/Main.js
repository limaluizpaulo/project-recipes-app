import React, { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

import DrinksContext from '../context/drinks.context';
import MealsContext from '../context/meals.context';
import { getRecipes, setConstants } from '../helpers';
import Header from '../components/Header';
import CategoryButtons from '../components/CategoryButtons';
import RecipesList from '../components/RecipesList';
import Footer from '../components/Footer';

function Main() {
  const { drinks, setDrinks } = useContext(DrinksContext);
  const { meals, setMeals } = useContext(MealsContext);
  const { location: { pathname } } = useHistory();

  const isDrinks = pathname.includes('bebidas');
  const { title, type } = setConstants(isDrinks);
  const recipes = isDrinks ? [...drinks] : [...meals];
  const setFn = isDrinks ? setDrinks : setMeals;

  useEffect(() => {
    if (recipes.length === 0) getRecipes({ type, setFn });
  }, [type, setFn, recipes.length]);

  return (
    <main>
      <Header title={ title } />
      <CategoryButtons />
      <RecipesList />
      <Footer />
    </main>
  );
}

export default Main;
