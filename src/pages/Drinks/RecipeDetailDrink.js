import React from 'react';
import PropTypes from 'prop-types';
import RecipeDetail from '../../components/RecipeDetail';

function RecipeDetailDrink({ match: { params: { id },
} }) {
  console.log(id);
  return (
    <RecipeDetail idRecipe={ id } typeRecipe="drink" />
  );
}

RecipeDetailDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeDetailDrink;
