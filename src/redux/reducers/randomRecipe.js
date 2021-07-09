const INITIAL_STATE = {};

const randomRecipe = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'request-random-success':
    return {
      ...state,
      randomRecipe: action.payload.randomRecipe,
    };
  case 'request-random-error':
    return {
      ...state,
      error: action.payload.error,
    };
  default:
    return state;
  }
};

export default randomRecipe;
