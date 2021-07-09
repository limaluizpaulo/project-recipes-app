import { fetchComidasEBebidas, fetchRandomRecipe } from '../../Services/index';

export const clearRecipes = () => ({
  type: 'reset-recipes',
});

export const requestCurrentRoute = (route) => ({
  type: 'request-route',
  payload: route,
});

export const isFetching = () => ({
  type: 'is-fetching',
});

export const requestFetchSuccess = (recipes) => ({
  type: 'request-success',
  payload: {
    recipes,
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

export const fetchComidasOnComponentDidMount = (recipeType) => (dispatch) => {
  dispatch(isFetching());
  return fetchComidasEBebidas(recipeType)
    .then((response) => {
      dispatch(requestFetchSuccess(response));
    })
    .catch((error) => dispatch(requestFetchError(error)));
};

export const fetchReceitaRandom = (type) => (dispatch) => fetchRandomRecipe(type)
  .then((response) => {
    dispatch(requestRandomRecipeSuccess(response));
  })
  .catch((error) => dispatch(requestRandomRecipeError(error)));
