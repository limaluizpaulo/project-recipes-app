import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Recipes from './Recipes';

function DrinksRecipes() {
  const { getInitialRecipes } = useContext(RecipesContext);

  useEffect(() => {
    getInitialRecipes('drinks');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Recipes type="bebidas" />
    </div>
  );
}
export default DrinksRecipes;
