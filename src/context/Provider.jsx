import React, { useState } from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';

const RecipeProvider = ({ children }) => {
  const [selectedFood, setSelectedFood] = useState();
  const context = { selectedFood, setSelectedFood };
  return (
    <RecipeContext.Provider value={ context }>
      {children}
    </RecipeContext.Provider>
  );
};

RecipeProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

export default RecipeProvider;
