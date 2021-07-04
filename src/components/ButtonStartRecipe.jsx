import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

export default function ButtonStartRecipe() {
  const [buttonVisible, setButtonVisible] = useState(true);
  const { idsDoneRecipes } = useContext(LoginContext);

  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const NUMBER_TO_VERIFICATION = -1;
  const style = {
    position: 'fixed',
    bottom: 0,
  };

  const verifyId = useCallback(() => {
    const search = idsDoneRecipes.find((item) => item === id);
    if (typeof search === 'string') {
      setButtonVisible(false);
    }
  }, [id, idsDoneRecipes]);

  useEffect(() => {
    verifyId();
  }, [verifyId]);
  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;
  return getDrinksDetails ? (

    buttonVisible && (
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ style }
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        <span>Iniciar Receita</span>
      </button>
    )

  ) : (

    buttonVisible && (
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ style }
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
      >
        <span>Iniciar Receita</span>
      </button>
    )

  );
}
