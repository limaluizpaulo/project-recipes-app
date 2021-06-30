import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';
import RecipesContext from '../context/RecipesContext';

function ExploreFood() {
  const { getRandomRacipes, recipeDetail, goDetail } = useContext(RecipesContext);
  return (
    <div>
      { goDetail && <Redirect to={ `/comidas/${recipeDetail.idDrink}` } /> }
      ExploreFood
      <br />
      <Link
        to="/explorar/comidas/ingredientes"
        data-testid="explore-by-ingredient"
      >
        Por Ingredientes
      </Link>
      <br />
      <Link
        to="/explorar/comidas/area"
        data-testid="explore-by-area"
      >
        Por Local de Origem
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

export default ExploreFood;
