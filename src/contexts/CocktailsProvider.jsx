import React from 'react';
import PropTypes from 'prop-types';
import CocktailsContext from './CocktailsContext';

function CocktailsProvider({ children }) {
  const context = {};

  return (
    <CocktailsContext.Provider value={ context }>
      {children}
    </CocktailsContext.Provider>
  );
}

CocktailsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default CocktailsProvider;
