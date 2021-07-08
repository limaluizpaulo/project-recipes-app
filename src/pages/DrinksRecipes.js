import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Recipes from './Recipes';

function DrinksRecipes() {
  const { getInitialRecipes, recipes, filtredByIngredients } = useContext(RecipesContext);

  useEffect(() => {
    if (recipes.length === 0 && !filtredByIngredients) {
      getInitialRecipes('drinks');
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Recipes type="bebidas" />
    </div>
  );
}
export default DrinksRecipes;
