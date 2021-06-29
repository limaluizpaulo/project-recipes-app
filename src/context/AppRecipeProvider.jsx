import React from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppRecipeContext';

function AppRecipeProvider({ children }) {
  const toConsume = {};

  return (
    <AppContext.Provider value={ toConsume }>
      {children}
    </AppContext.Provider>
  );
}

AppRecipeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AppRecipeProvider;
