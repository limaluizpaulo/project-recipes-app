import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { getFromLocalStorage } from '../services/helpers/localStorage';

const useCheckFoodStatus = () => {
  const [isDone, setIsDone] = useState(false);
  const [isInProgress, setIsInProgress] = useState(false);

  const history = useHistory();
  const splittedLocation = history.location.pathname.split('/');
  const location = splittedLocation[1];

  const { recipeId } = useParams();

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

    const inProgressStatus = progressmeals && progressmeals.find((id) => id === recipeId);
    if (inProgressStatus) setIsInProgress(true);
  }, [doneRecipes, inProgressRecipes, recipeId, type]);

  return {
    isDone,
    isInProgress,
  };
};

export default useCheckFoodStatus;
