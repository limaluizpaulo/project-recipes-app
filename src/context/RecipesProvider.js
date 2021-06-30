import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  // const [state, newState] = useState();
  const [email, setEmail] = useState('email@email.com');
  const [password, setPassowd] = useState('');

  const successLogin = (emailText, passwordText) => {
    setEmail(emailText);
    setPassowd(passwordText);

    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
  };

  const context = { email, password, successLogin };

  return (
    <RecipesContext.Provider
      value={ context }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
