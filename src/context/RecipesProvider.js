import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipesContext from './RecipesContext';

function RecipesProvider({ children }) {
  const [user, setUser] = useState({ user: '', password: '' });

  const login = ({ email, password }) => {
    setUser({ user: email, password });
  };

  return (
    <RecipesContext.Provider
      value={ {
        user,
        login,
      } }
    >
      { children }
    </RecipesContext.Provider>
  );
}

RecipesProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default RecipesProvider;
