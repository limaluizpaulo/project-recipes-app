import { useEffect, useState } from 'react';
import { fetchRecipesById } from '../services/recipesAPI';

function useRecipeByID(type) {
  const [recipe, setRecipe] = useState({});

  const getRecipe = async () => {
    const { [type]: [gotRecipe] } = await fetchRecipesById(type, id);

    setRecipe(gotRecipe);
  };

  useEffect(() => {
    getRecipe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return recipe;
}

export default useRecipeByID;
