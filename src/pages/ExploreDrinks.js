import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function ExploreDrinks() {
  const { getRandomRacipes, recipeDetail, goDetail } = useContext(RecipesContext);
  return (
    <div>
      { goDetail && <Redirect to={ `/bebidas/${recipeDetail.idDrink}` } /> }
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
        onClick={ () => getRandomRacipes('drinks') }
      >
        Me Surpreenda!
      </button>
    </div>
  );
}

export default ExploreDrinks;
