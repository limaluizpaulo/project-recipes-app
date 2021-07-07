import React, { useContext, useEffect } from 'react';
import RecipesContext from '../context/RecipesContext';
import Recipes from './Recipes';

function MealsRecipes() {
  const { getInitialRecipes } = useContext(RecipesContext);

  useEffect(() => {
    getInitialRecipes('meals');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Recipes type="comidas" />
    </div>
  );
}
export default MealsRecipes;
