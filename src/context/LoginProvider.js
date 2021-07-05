import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import LoginContext from './LoginContext';

function LoginProvider({ children }) {
  const [login, setLogin] = useState('');
  const [DoneRecipes, setDoneRecipes] = useState([]);
  const [idsInProgress, setIdsInProgress] = useState([]);

  function successLogin(email) {
    setLogin(email);
  }

  const getDoneRecipes = useCallback(() => {
    const getLocalStorage = JSON.parse(localStorage.getItem('doneRecipes'));
    if (getLocalStorage !== null) {
      setDoneRecipes(getLocalStorage);
    }
  }, []);

  const getInProgressRecipes = useCallback(() => {
    const getLocalStorage = localStorage.getItem('inProgressRecipes');
    if (getLocalStorage !== null) {
      let idsRecipesInProgress = [];
      const keysMeals = Object.keys(getLocalStorage.meals);
      const keysCocktails = Object.keys(getLocalStorage.cocktails);
      if (typeof Object.keys(keysMeals) !== 'undefined'
      && Object.keys(keysMeals).length > 0) {
        idsRecipesInProgress = [...idsRecipesInProgress, ...keysMeals];
      }
      if (typeof Object.keys(keysCocktails) !== 'undefined'
      && Object.keys(keysCocktails).length > 0) {
        idsRecipesInProgress = [...idsRecipesInProgress, ...keysCocktails];
      }
      setIdsInProgress(idsRecipesInProgress);
      console.log(idsRecipesInProgress);
    } else {
      setIdsInProgress(['xablau']);
    }
  }, []);

  useEffect(() => {
    getDoneRecipes();
    getInProgressRecipes();
  }, [getDoneRecipes, getInProgressRecipes]);

  return (
    <LoginContext.Provider
      value={ {
        successLogin,
        login,
        DoneRecipes,
        getDoneRecipes,
        idsInProgress,
        getInProgressRecipes,
      } }
    >
      { children }
    </LoginContext.Provider>
  );
}

LoginProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default LoginProvider;
