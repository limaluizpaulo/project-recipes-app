import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

export default function ButtonStartRecipe() {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [text, setText] = useState('Iniciar Receita');
  const {
    DoneRecipes,
    idsInProgress,
  } = useContext(LoginContext);

  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const NUMBER_TO_VERIFICATION = -1;
  const style = {
    position: 'fixed',
    bottom: 0,
  };

  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;
  const sizeInPro = idsInProgress.length;

  const verifyId = useCallback(() => {
    const searchDone = DoneRecipes.find((item) => item.id === id);
    if (searchDone) {
      setButtonVisible(false);
    }
  }, [DoneRecipes, id]);

  const teste123 = useCallback(() => {
    if (sizeInPro > 0) {
      const searchInProgress = idsInProgress.find((item) => item === id);
      if (searchInProgress) {
        setText('Continuar Receita');
      }
    }
  }, [id, idsInProgress, sizeInPro]);

  useEffect(() => {
    teste123();
    verifyId();
  }, [buttonVisible, teste123, verifyId]);

  return getDrinksDetails ? (

    buttonVisible && (
      <button
        type="button"
        data-testid="start-recipe-btn"
        style={ style }
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        <span>{text}</span>
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
        <span>{text}</span>
      </button>
    )

  );
}
