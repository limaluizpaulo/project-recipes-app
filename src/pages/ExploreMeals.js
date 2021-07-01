/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import RecipesContext from '../context/RecipesContext';

function ExploreMeals() {
  const {
    redirectToRecipeDetails,
    recipeDetails,
    getRandomRecipe,
    setRedirectToRecipeDetails,
  } = useContext(RecipesContext);

  useEffect(() => () => setRedirectToRecipeDetails(false), []);

  return (
    <main>
      { redirectToRecipeDetails
        && <Redirect to={ `/comidas/${recipeDetails.idMeal}` } /> }
      ExploreFood
      <Link
        to="/explorar/comidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <Link
        to="/explorar/comidas/area"
        data-testid="explore-by-area"
      >
        Por Local de Origem
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getRandomRecipe }
      >
        Me Surpreenda!
      </button>
    </main>
  );
}

export default ExploreMeals;
