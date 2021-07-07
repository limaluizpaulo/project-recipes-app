import { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context';

const MAX_NUMBER_OF_ITEMS = 12;

const useFetchRecipesApi = (maxResults = MAX_NUMBER_OF_ITEMS) => {
  const [recipeUrl, setRecipeUrl] = useState('');
  const { setRecipes } = useContext(RecipeContext);
  // const { recipes, setRecipes } = useContext(RecipeContext);

  useEffect(() => {
    const getRecipes = async () => {
      // console.log(recipeUrl + '-hook');
      // console.log(recipes.length + 'antes');
      if (recipeUrl) {
        const response = await fetch(recipeUrl)
          .then((data) => data.json());
        // console.log(response);
        const result = recipeUrl.includes('meal')
          ? response.meals.slice(0, maxResults)
          : response.drinks.slice(0, maxResults);
        // console.log(result);
        setRecipes(result);
        // console.log(recipes.length + 'depois');
      }
    };
    getRecipes();
  }, [recipeUrl]);

  return [setRecipeUrl];
};

export default useFetchRecipesApi;
