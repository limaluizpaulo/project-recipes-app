/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function ExploreDrinks() {
  const { getRandomRecipe,
    recipeDetails, redirectToRecipeDetails, setGoDetail } = useContext(RecipesContext);

  useEffect(() => () => setGoDetail(false), []);

  return (
    <div>
      { redirectToRecipeDetails
        && <Redirect to={ `/bebidas/${recipeDetails.idDrink}` } /> }
      ExploreDrinks
      <br />
      <Link
        to="/explorar/bebidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <br />
      <button
        type="button"
        data-testid="explore-surprise"
        onClick={ () => getRandomRecipe('cocktail') }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExploreDrinks;
