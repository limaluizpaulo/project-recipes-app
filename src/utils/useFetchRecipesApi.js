import { useState, useEffect, useContext } from 'react';
import RecipeContext from '../context';

const MAX_NUMBER_OF_ITEMS = 12;

const useFetchRecipesApi = (maxResults = MAX_NUMBER_OF_ITEMS, suggestions = false) => {
  const [recipeUrl, setRecipeUrl] = useState('');
  const [suggestionsUrl, setSuggestionsUrl] = useState('');
  const { setRecipes, setSuggestions } = useContext(RecipeContext);

  useEffect(() => {
    const getRecipes = async () => {
      if (recipeUrl) {
        const response = await fetch(recipeUrl)
          .then((data) => data.json());
        const result = recipeUrl.includes('meal')
          ? response.meals.slice(0, maxResults)
          : response.drinks.slice(0, maxResults);
        if (suggestions) {
          setSuggestions(result);
        } else {
          setRecipes(result);
        }
      }
    };
    getRecipes();
  }, [recipeUrl]);

  return [setRecipeUrl, suggestionsUrl, setSuggestionsUrl];
};

export default useFetchRecipesApi;
