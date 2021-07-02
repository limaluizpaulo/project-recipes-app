import { useState } from "react";

const useCheckFoodStatus = ({ doneRecipes, inProgressRecipes }, recipeId, location) => {
  const [isDone, setIsDone] = useState(false)
  const [isInProgress, setIsDone] = useState(false)
  let type = 'meals';
  if (location === 'bebidas') type = 'cocktails';
  const progressmeals = inProgressRecipes && inProgressRecipes[type] && Object.keys(inProgressRecipes[type]);
  const status = {
    isDone: false,
    isInProgress: false,
  };
  const doneStatus = doneRecipes && doneRecipes.find((recipe) => recipe.id === recipeId);
  if (doneStatus) status.isDone = true;
  const inProgressStatus = progressmeals && progressmeals.find((id) => id === recipeId);
  if (inProgressStatus) status.isInProgress = true;
  return status;
};

export default useCheckFoodStatus;
