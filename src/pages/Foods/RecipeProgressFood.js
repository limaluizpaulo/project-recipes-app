import React from 'react';
import PropTypes from 'prop-types';
import RecipeProgress from '../../components/RecipeProgress';

function RecipeProgressFood({ match: { params: { id },
} }) {
  // console.log(id);
  return (
    <div>
      <RecipeProgress idRecipe={ id } typeRecipe="food" />
    </div>
  );
}

RecipeProgressFood.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default RecipeProgressFood;
