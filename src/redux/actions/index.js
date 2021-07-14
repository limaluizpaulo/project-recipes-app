import fetchComidasEBebidas from '../../Services/Fetch';
import { fetchRandomRecipe } from '../../Services/FetchRandom';

export const recipeProgress = (recipe) => ({
  type: 'progress',
  payload: recipe,
});

export const clearRecipes = () => ({
  type: 'reset-recipes',
});

export const isFetching = () => ({
  type: 'is-fetching',
});

export const requestRecipesSuccess = (recipes, fetchType) => ({
  type: `${fetchType}-success`,
  payload: {
    [fetchType]: recipes,
    isFetching: false,
    fetchType,
  },
});

export const requestCategoriesSuccess = (categories) => ({
  type: 'categories-success',
  payload: {
    categories,
    isFetching: false,
  },
});

export const requestRandomRecipeSuccess = (randomRecipe) => ({
  type: 'request-random-success',
  payload: {
    randomRecipe,
  },
});

export const requestFetchError = (error) => ({
  type: 'request-error',
  payload: { error },
});

export const requestRandomRecipeError = (error) => ({
  type: 'request-random-error',
  payload: { error },
});

export const fetchComidasOnComponentDidMount = (
  recipeType, fetchType, ingredient,
) => (dispatch) => {
  dispatch(isFetching());
  return fetchComidasEBebidas(recipeType, fetchType, ingredient)
    .then((response) => {
      dispatch(requestRecipesSuccess(response, fetchType));
    })
    .catch((error) => dispatch(requestFetchError(error)));
};

export const resetSelectedCategory = () => ({
  type: 'reset-category',
});

export const saveCategory = (category) => ({
  type: 'set-category',
  payload: category,
});

export const setRecipeType = (recipeType) => ({
  type: 'set-recipeType',
  payload: recipeType,
});

export const fetchReceitaRandom = (type) => (dispatch) => fetchRandomRecipe(type)
  .then((response) => {
    dispatch(requestRandomRecipeSuccess(response));
  })
  .catch((error) => dispatch(requestRandomRecipeError(error)));
