import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetail from '../../components/RecipeDetail';

function RecipeDetailFood({ match: { params: { id },
} }) {
  console.log(id);
  return (
    <RecipeDetail idRecipe={ id } typeRecipe="food" />
  );
}

RecipeDetailFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetailFood;
