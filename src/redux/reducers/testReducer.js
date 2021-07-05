const INITAL_STATE = {
  test: true,
};

const testReducer = (state = INITAL_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_TEST':
    return {
      ...state,
      test: action.payload.test,
    };
  default:
    return state;
  }
};

export default testReducer;
