import React, { useContext } from 'react';
import { useHistory, useParams } from 'react-router';
import useCheckFoodStatus from '../hooks/useCheckFoodStatus';
import RecipeContext from '../context/Context';
import { setRecipeInProgressLocalStorage } from '../services/helpers/localStorage';

const FoodDetailsButton = () => {
  const { selectedFood } = useContext(RecipeContext);
  const history = useHistory();
  const { recipeId } = useParams();
  const { idMeal, idDrink } = selectedFood;
  const { isDone, isInProgress, location } = useCheckFoodStatus();

  const Redirect = () => {
    history.push(`/${location}/${recipeId}/in-progress`);
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
