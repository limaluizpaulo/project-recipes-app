import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFromLocalStorage } from '../services/helpers/localStorage';

const FoodDetailsButton = ({ match }) => {
  const [done, setDone] = useState(false);
  const { params: { recipeId } } = match;
  useEffect(() => {
    const checkIfIsDone = () => {
      const doneRecipes = getFromLocalStorage('doneRecipes');
      if (doneRecipes) {
        doneRecipes.forEach((recipe) => {
          const { id } = recipe;
          console.log(recipe, recipeId);
          if (id === recipeId) setDone(true);
        });
      }
    };
    checkIfIsDone();
  });

  if (done) {
    return '';
  }

  return (
    <button
      className="foodDetails__startBtn"
      type="button"
      data-testid="start-recipe-btn"
    >
      Iniciar Receita

    </button>
  );
};

export default FoodDetailsButton;

FoodDetailsButton.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      recipeId: PropTypes.string,
    }),
  }).isRequired,
};
