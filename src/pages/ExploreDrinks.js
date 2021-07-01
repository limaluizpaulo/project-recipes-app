import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function ExploreDrinks() {
  const { getRandomRecipe, recipeDetails,
    redirectToRecipeDetails, setRedirectToRecipeDetails } = useContext(RecipesContext);

  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => () => setRedirectToRecipeDetails(false), []);

  return (
    <div>
      { redirectToRecipeDetails
        && <Redirect to={ `/bebidas/${recipeDetails.idDrink}` } /> }
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ getRandomRecipe }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExploreDrinks;
