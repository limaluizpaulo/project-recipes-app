import React, { useCallback, useContext, useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { useHistory, useParams } from 'react-router-dom';
import LoginContext from '../context/LoginContext';

import { BtnRecipes } from '../styles/Details';

export default function ButtonStartRecipe() {
  const [buttonVisible, setButtonVisible] = useState(true);
  const [text, setText] = useState('Iniciar Receita');
  const {
    DoneRecipes,
  } = useContext(LoginContext);

  const { pathname } = useLocation();
  const { id } = useParams();
  const history = useHistory();

  const NUMBER_TO_VERIFICATION = -1;

  const getDrinksDetails = pathname.indexOf('bebidas') > NUMBER_TO_VERIFICATION;

  const verifyId = useCallback(() => {
    const searchDone = DoneRecipes.find((item) => item.id === id);
    if (searchDone) {
      setButtonVisible(false);
    }
    if (localStorage.inProgressRecipes) {
      const getRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const inProgres = Object.keys(getRecipes)
        .map((key) => Object.keys(getRecipes[key]).includes(id));
      if (inProgres.includes(true)) {
        setText('Continuar Receita');
      }
    }
  }, [DoneRecipes, id]);

  useEffect(() => {
    verifyId();
  }, [buttonVisible, verifyId]);

  return getDrinksDetails ? (

    buttonVisible && (
      <BtnRecipes
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/bebidas/${id}/in-progress`) }
      >
        <span>{text}</span>
      </BtnRecipes>
    )

  ) : (

    buttonVisible && (
      <BtnRecipes
        type="button"
        data-testid="start-recipe-btn"
        onClick={ () => history.push(`/comidas/${id}/in-progress`) }
      >
        <span>{text}</span>
      </BtnRecipes>
    )

  );
}
