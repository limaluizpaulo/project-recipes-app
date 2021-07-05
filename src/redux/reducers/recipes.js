const INITIAL_STATE = {
  isFetching: false,
};

const recipes = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'request-success':
    return {
      ...state,
      recipes: Object.values(action.payload)[0],
    };
  case 'request-error':
    return {
      ...state,
      error: action.payload.error,
    };
  case 'is-loading':
    return {
      ...state,
      isFetching: !state.isFetching,
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
