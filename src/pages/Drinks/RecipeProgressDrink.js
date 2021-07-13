import React from 'react';
import PropTypes from 'prop-types';
import RecipeProgress from '../../components/RecipeProgress';

function RecipeProgressDrink({ match: { params: { id },
} }) {
  console.log(id);
  return (
    <div>
      <RecipeProgress idRecipe={ id } typeRecipe="drink" />
    </div>
  );
}

RecipeProgressDrink.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeProgressDrink;
