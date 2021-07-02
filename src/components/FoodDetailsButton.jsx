import React from 'react';
import PropTypes from 'prop-types';
import useCheckFoodStatus from '../hooks/useCheckFoodStatus';

const FoodDetailsButton = ({ recipeId, history }) => {
  const params = history.location.pathname.split('/');
  params.shift();
  const [location] = params;
  const { isDone, isInProgress } = useCheckFoodStatus(recipeId, location);
  const handleRedirect = () => {
    history.push(`${recipeId}/in-progress`);
  };
  if (isDone) return '';
  return (
    <button
      className="foodDetails__startBtn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleRedirect }
    >
      {isInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
};

export default FoodDetailsButton;

FoodDetailsButton.propTypes = {
  history: PropTypes.shape().isRequired,
  recipeId: PropTypes.string.isRequired,

};
