import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [login, setLogin] = useState([]);
  const [responseApiLupa, setResponseApiLupa] = useState([]);
  const [resposeApiLupaDrink, setResponseApiLupaDrink] = useState([]);

  const context = {
    login,
    setLogin,
    responseApiLupa,
    setResponseApiLupa,
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
