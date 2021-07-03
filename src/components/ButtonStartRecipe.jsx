import React from 'react';
import { useLocation } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';

export default function ButtonStartRecipe() {
  const style = {
    position: 'fixed',
    bottom: 0,
  };

  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const NUMBER_TO_VERIFICATION = -1;

  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;
  return getDrinksDetails ? (

    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ style }
      onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
    >
      <span>Iniciar Receita</span>
    </button>
  ) : (
    <button
      type="button"
      data-testid="start-recipe-btn"
      style={ style }
      onClick={ () => history.push(`/comidas/${id}/in-progress`) }
    >
      <span>Iniciar Receita</span>
    </button>
  );
}
