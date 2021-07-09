import { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context';

const useInProgressRecipes = (key) => {
  // const [id, setId] = useState('');
  const [countChecked, setCountChecked] = useState(0);
  const { idProgress, setIdProgress, setCheckedIngredients } = useContext(RecipeContext);

  useEffect(() => {
    console.log('IN_PROGRESS_HOOK');
    const recipesInProgress = JSON.parse(localStorage
      .getItem('inProgressRecipes')) || { cocktails: {}, meals: {} };
    const storedRecipe = Object.entries(recipesInProgress[key])
      .find((recipeId) => recipeId[0] === idProgress);
    if (storedRecipe) {
      setIdProgress(storedRecipe[0]);
      setCheckedIngredients(storedRecipe[1]);
      console.log(storedRecipe[1].length);
      setCountChecked(storedRecipe[1].length);
    }
  }, [idProgress]);

  return [countChecked, setCountChecked];
};

export default useInProgressRecipes;
