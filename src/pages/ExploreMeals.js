/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

import RecipesContext from '../context/RecipesContext';

import './style/ExploreMeals.css';

function ExploreMeals() {
  const {
    redirectToRecipeDetails,
    recipeDetails,
    getRandomRecipe,
  } = useContext(RecipesContext);

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
