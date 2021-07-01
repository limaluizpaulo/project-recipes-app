import fetchComidasOuBebidas from '../../Services/index';

export const REQUEST_FOODS = 'REQUEST_FOODS';

export const REQUEST_DRINKS = 'REQUEST_DRINKS';

export const requestmeals = () => ({
  type: 'is-loading',
  payload: {
    isFetching: true,
  },
});

export const requestFetchSuccess = (resolve) => ({
  type: 'request-success',
  payload: {
    meals: resolve,
    isFetching: false,
  },
});

export const requestFetchError = (error) => ({
  type: 'request-error',
  payload: { error },
});

export const fetchComidasOnComponentDidMount = () => async (dispatch) => {
  dispatch(requestmeals());
  fetchComidasOuBebidas()
    .then((response) => dispatch(requestFetchSuccess(response)))
    .catch((error) => dispatch(requestFetchError(error)));
};
