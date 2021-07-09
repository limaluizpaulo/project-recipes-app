const INITIAL_STATE = {
};

const fetchRecipes = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'searchBarName-success':
    return {
      ...state,
      searchBarName: payload.searchBarName,
      isFetching: payload.isFetching,
    };
  case 'searchBarFirstLetter-success':
    return {
      ...state,
      searchBarFirstLetter: payload.searchBarFirstLetter,
      isFetching: payload.isFetching,
    };
  case 'searchBarIngredient-success':
    return {
      ...state,
      searchBarIngredient: payload.searchBarIngredient,
      isFetching: payload.isFetching,
    };
  default:
    return state;
  }
};

export default fetchRecipes;
