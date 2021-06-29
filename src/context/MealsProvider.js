import React, { createContext } from 'react';
import PropTypes from 'prop-types';

const MealsContext = createContext();

const MealsProvider = ({ children }) => (
  <MealsContext.Provider value={ {} }>
    { children }
  </MealsContext.Provider>
);

MealsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { MealsContext, MealsProvider };
