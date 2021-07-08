import fetchComidasEBebidas from '../../Services/Fetch';

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
  },
});

export const requestCategoriesSuccess = (categories) => ({
  type: 'categories-success',
  payload: {
    categories,
    isFetching: false,
  },
});

export const requestFetchError = (error) => ({
  type: 'request-error',
  payload: { error },
});

export const fetchComidasOnComponentDidMount = (
  recipeType, fetchType, ingredient,
) => (dispatch) => {
  dispatch(isFetching());
  fetchComidasEBebidas(recipeType, fetchType, ingredient)
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
