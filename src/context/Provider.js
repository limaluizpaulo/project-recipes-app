import React, { useEffect, useReducer } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import store, { directPage, RECIPES, USER } from './store';
import userReducer from './reducers/user';
import recipesReducer from './reducers/recipes';

export default function Provider({ children }) {
  const { pathname } = useLocation();
  const [user, setUser] = useReducer(userReducer, USER);
  const [recipes, setRecipes] = useReducer(recipesReducer, RECIPES);

  // RECIPES --------------------------------------------------------------------------------------------------------------
  const findLocation = () => {
    if (pathname.includes('/bebidas')) { setRecipes(directPage(false)); }
    if (pathname.includes('/comidas')) { setRecipes(directPage(true)); }
  };
  // -----------------------------------------------------------------------------------------------------------------------
  // CICLOS DE VIDA
  useEffect(findLocation, [pathname]);

  // CONTEXT
  const contextValue = {
    user,
    recipes,
    setUser,
    setRecipes,
  };

  // ----------------------------------------------------------------------------------------------------------------------
  return (
    <store.Provider value={ contextValue }>
      { children }
    </store.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
