import React, { useContext, useEffect, useState } from 'react';
import store, { addRecipes } from '../../context/store';
import { DRINKS, fetchAPI, MEALS } from '../../services';
import RecipeCard from '../components/RecipeCard';
import Header from '../components/Header/Header';

export default function Recipes() {
  const [loading, setLoading] = useState(true);
  const { setRecipes } = useContext(store);

  // ---------------------------------------------------------------------------------------------
  // CICLOS DE VIDA

  useEffect(() => {
    const getRecipes = async () => {
      const meals = await fetchAPI(MEALS);
      const drinks = await fetchAPI(DRINKS);
      setRecipes(addRecipes(meals.meals, drinks.drinks));
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
      <Header />
      <RecipeCard />

    </main>
  );
}
