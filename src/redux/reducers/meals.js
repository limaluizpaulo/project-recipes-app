const INITIAL_STATE = {
};

const meals = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'request-success':
    return {
      ...state,
      meals: action.payload,
    };
  case 'request-error':
    return {
      ...state,
      error: action.payload.error,
    };
  case 'is-fetching':
    return {
      ...state,
      isFetching: action.payload.isFetching,
    };
  default:
    return state;
  }
};

export default meals;
