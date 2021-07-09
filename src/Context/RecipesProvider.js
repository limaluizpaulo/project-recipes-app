import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [login, setLogin] = useState([]);
  const [responseApiLupaMeal, setResponseApiLupaMeal] = useState([]);
  const [resposeApiLupaDrink, setResponseApiLupaDrink] = useState([]);
  const [categoryMeals, setCategoryMeals] = useState([]);
  const [categoryDrink, setCategoryDrink] = useState([]);
  const [redirect, setRedirect] = useState(true);
  const [toogle, setToogle] = useState(false);
  const [stateDrink, setStateDrink] = useState([{}]);
  const [stateMeals, setStateMeals] = useState([{}]);
  const [favoriteFilters, setFavoriteFilters] = useState([]);

  const context = {
    login,
    setLogin,
    responseApiLupaMeal,
    setResponseApiLupaMeal,
    resposeApiLupaDrink,
    setResponseApiLupaDrink,
    categoryMeals,
    setCategoryMeals,
    categoryDrink,
    setCategoryDrink,
    redirect,
    setRedirect,
    toogle,
    setToogle,
    stateDrink,
    setStateDrink,
    stateMeals,
    setStateMeals,
    favoriteFilters,
    setFavoriteFilters,
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
