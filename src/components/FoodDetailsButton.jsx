import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getFromLocalStorage } from '../services/helpers/localStorage';
import useCheckFoodStatus from '../hooks/useCheckFoodStatus';

const FoodDetailsButton = ({ recipeId, location }) => {
  const doneRecipes = getFromLocalStorage('doneRecipes');
  const inProgressRecipes = getFromLocalStorage('inProgressRecipes');
  const { isDone, isInProgress } = useCheckFoodStatus({ doneRecipes, inProgressRecipes }, recipeId, location);
  console.log(isDone, isInProgress);
  if (isDone) return '';
  return (
    <button
      className="foodDetails__startBtn"
      type="button"
      data-testid="start-recipe-btn"
    >
      {isInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
};

export default FoodDetailsButton;

FoodDetailsButton.propTypes = {
  recipeId: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,

};
