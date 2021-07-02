import { useEffect, useState } from 'react';
import { getFromLocalStorage } from '../services/helpers/localStorage';

const useCheckFoodStatus = (recipeId, location) => {
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  const doneRecipes = getFromLocalStorage('doneRecipes');
  const inProgressRecipes = getFromLocalStorage('inProgressRecipes');

  let type = 'meals';
  if (location === 'bebidas') type = 'cocktails';

  useEffect(() => {
    const doneStatus = doneRecipes
    && doneRecipes.find((recipe) => recipe.id === recipeId);
    if (doneStatus) setIsDone(true);

    const progressmeals = inProgressRecipes
     && inProgressRecipes[type] && Object.keys(inProgressRecipes[type]);
    console.log(Object.keys(inProgressRecipes[type]));
    const inProgressStatus = progressmeals && progressmeals.find((id) => id === recipeId);
    if (inProgressStatus) setIsInProgress(true);
  }, []);

  return {
    isDone,
    isInProgress,
  };
};

export default useCheckFoodStatus;
