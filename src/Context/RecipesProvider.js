import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [login, setLogin] = useState([]);
  const [responseApiLupaMeal, setResponseApiLupaMeal] = useState([]);
  const [resposeApiLupaDrink, setResponseApiLupaDrink] = useState([]);

  const context = {
    login,
    setLogin,
    responseApiLupaMeal,
    setResponseApiLupaMeal,
    resposeApiLupaDrink,
    setResponseApiLupaDrink,
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
