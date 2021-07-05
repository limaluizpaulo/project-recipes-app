import fetchComidasOuBebidas from '../../Services/index';

export const clearRecipes = () => ({
  type: 'reset-recipes',
});

export const requestRecipes = () => ({
  type: 'is-loading',
});

export const requestFetchSuccess = (resolve) => ({
  type: 'request-success',
  payload: {
    resolve,
  },
});

export const requestFetchError = (error) => ({
  type: 'request-error',
  payload: { error },
});

export const fetchComidasOnComponentDidMount = () => (dispatch) => {
  dispatch(requestRecipes());
  fetchComidasOuBebidas()
    .then((response) => dispatch(requestFetchSuccess(response)))
    .catch((error) => dispatch(requestFetchError(error)))
    .then(() => dispatch(requestRecipes()));
};
