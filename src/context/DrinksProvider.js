import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const DrinksContext = createContext();

const DrinksProvider = ({ children }) => (
  <DrinksContext.Provider value={ {} }>
    { children }
  </DrinksContext.Provider>
);

DrinksProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { DrinksContext, DrinksProvider };
