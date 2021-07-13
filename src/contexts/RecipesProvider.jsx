import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import RecipesContext from './RecipesContext';
// import { getMealsRecipes } from '../helpers/MealsAPI';
// import {
//   getCocktailsRecipes,
// } from '../helpers/CocktailsAPI';
import { setInitialItem } from '../helpers/HelperFunctions';

function RecipesProvider({ children }) {
  const [data, setData] = useState([]);
  const [type, setType] = useState('meals');
  const [ingredient, setIngredient] = useState('');

  setInitialItem('inProgressRecipes', {
    cocktails: {},
    meals: {},
  });

  setInitialItem('doneRecipes', []);
  setInitialItem('favoriteRecipes', []);

  const mustUpdateType = (strType, strPath, pathname) => (
    type !== strType && pathname.includes(strPath)
  );

  const { pathname } = useLocation();
  if (mustUpdateType('meals', 'comidas', pathname)) {
    setType('meals');
  }
  if (mustUpdateType('drinks', 'bebidas', pathname)) {
    setType('drinks');
  }

  const context = {
    data,
    type,
    setType,
    setData,
    setIngredient,
    ingredient,
  };

  return (
    <RecipesContext.Provider value={ context }>
      {children}
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
