import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import useCheckFoodStatus from '../hooks/useCheckFoodStatus';
import RecipeContext from '../context/Context';
import { setRecipeInProgressLocalStorage } from '../services/helpers/localStorage';

const FoodDetailsButton = ({ urlId, history }) => {
  const { selectedFood } = useContext(RecipeContext);
  const { idMeal, idDrink } = selectedFood;
  const params = history.location.pathname.split('/');
  params.shift();
  const [location] = params;
  const { isDone, isInProgress } = useCheckFoodStatus(urlId, location);
  const Redirect = () => {
    history.push(`${urlId}/in-progress`);
  };
  const setRecipeToProgress = () => {
    const CurrentId = idMeal || idDrink;
    const mainKey = idMeal ? 'meals' : 'cocktails';
    setRecipeInProgressLocalStorage(mainKey, CurrentId);
  };
  const handleSubmit = () => {
    setRecipeToProgress();
    Redirect();
  };
  if (isDone) return '';
  return (
    <button
      className="foodDetails__startBtn"
      type="button"
      data-testid="start-recipe-btn"
      onClick={ handleSubmit }
    >
      {isInProgress ? 'Continuar Receita' : 'Iniciar Receita'}
    </button>
  );
};

export default FoodDetailsButton;

FoodDetailsButton.propTypes = {
  history: PropTypes.shape().isRequired,
  urlId: PropTypes.string.isRequired,

};
