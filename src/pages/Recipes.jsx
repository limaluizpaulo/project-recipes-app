import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import RecipesContext from '../context/RecipesContext';

import { fetchAllRecipes } from '../services/api';

function Recipes() {
  const { recipes, setRecipes } = useContext(RecipesContext);

  useEffect(() => {
    async function fetchData() {
      const TWELVE_RECIPES = 12;
      const recipesFromApi = await fetchAllRecipes();
      setRecipes(recipesFromApi.meals.slice(0, TWELVE_RECIPES));
    }
    fetchData();
  }, []);

  return (
    <section>
      {recipes.map((recipe, index) => (<FoodCard
        index={ index }
        key={ recipe.idMeal }
        food={ recipe.strMeal }
        thumb={ recipe.strMealThumb }
      />))}
    </section>
  );
}

export default Recipes;
