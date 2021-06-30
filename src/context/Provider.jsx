import React from 'react';
import PropTypes from 'prop-types';
import RecipeContext from './Context';
import firstMeal from '../mocks/mockOneMeal';

const RecipeProvider = ({ children }) => {
  const context = { selectedFood: firstMeal };
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
