const INITIAL_STATE = {
  isFetching: false,
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'request-success':
    return {
      ...state,
      recipes: action.payload.recipes,
      isFetching: action.payload.isFetching,
    };
  case 'request-error':
    return {
      ...state,
      error: action.payload.error,
    };
  case 'is-fetching':
    return {
      ...state,
      isFetching: true,
    };
  case 'request-route':
    return {
      ...state,
      currentRoute: action.payload,
    };
  case 'reset-recipes':
    return {
      ...state,
      recipes: [],
    };
  default:
    return state;
  }
};

export default recipes;
