import React from 'react';
import PropTypes from 'prop-types';
import Context from './Context';

const RecipeProvider = ({ children }) => {
  const context = { teste: 'teste' };
  return (
    <Context.Provider value={ context }>
      {children}
    </Context.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeProvider;
