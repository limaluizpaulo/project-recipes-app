import fetchComidasEBebidas from '../../Services/index';

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

export const requestFetchError = (error) => ({
  type: 'request-error',
  payload: { error },
});

export const fetchComidasOnComponentDidMount = (recipeType) => (dispatch) => {
  dispatch(isFetching());
  fetchComidasEBebidas(recipeType)
    .then((response) => {
      dispatch(requestFetchSuccess(response));
    })
    .catch((error) => dispatch(requestFetchError(error)));
};
