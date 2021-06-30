import React, { useContext, useEffect, useState } from 'react';
import store, { addRecipes } from '../../context/store';
import { CATEG_DRINKS, CATEG_MEALS, DRINKS, fetchAPI, MEALS } from '../../services';
import RecipeCard from '../components/RecipeCard';

export default function Recipes() {
  const [loading, setLoading] = useState(true);
  const { setRecipes } = useContext(store);

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => {
    const getRecipes = async () => {
      const meals = await fetchAPI(MEALS);
      const catMeals = await fetchAPI(CATEG_MEALS);
      const drinks = await fetchAPI(DRINKS);
      const catDrinks = await fetchAPI(CATEG_DRINKS);
      setRecipes(
        addRecipes(meals.meals, drinks.drinks, catMeals.meals, catDrinks.drinks),
      );
      setLoading(false);
    };
    getRecipes();
  }, [setRecipes]);

  // ---------------------------------------------------------------------------------------------

  if (loading) {
    return (
      <h5>Loading...</h5>
    );
  }
  return (
    <main className="Cards">
      <RecipeCard />

    </main>
  );
}
