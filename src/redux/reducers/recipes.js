const INITIAL_STATE = {
  isFetching: false,
  selectedCategory: 'All',
};

const recipes = (state = INITIAL_STATE, { payload, type }) => {
  switch (type) {
  case 'categories-success':
    return {
      ...state,
      categories: payload.categories,
      isFetching: payload.isFetching,
    };
  case 'ingredient-success':
    return {
      ...state,
      ingredients: payload.ingredient,
      isFetching: payload.isFetching,
    };
  case 'recipes-success':
    return {
      ...state,
      recipes: payload.recipes,
      isFetching: payload.isFetching,
    };
  case 'request-error':
    return {
      ...state,
      error: payload.error,
    };
  case 'is-fetching':
    return {
      ...state,
      isFetching: true,
    };
  case 'set-recipeType':
    return {
      ...state,
      recipeType: payload,
    };
  case 'reset-category':
    return {
      ...state,
      selectedCategory: 'All',
    };
  case 'set-category':
    return {
      ...state,
      selectedCategory: payload === state.selectedCategory ? 'All' : payload,
    };
  default:
    return state;
  }
};

export default recipes;
