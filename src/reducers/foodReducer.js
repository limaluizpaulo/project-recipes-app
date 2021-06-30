import { REQUEST_INGREDIENT } from '../actions';

const INITIAL_STATE = {
  recipes: [],
};

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENT:
    return {
      ...state,
      recipes: action.payload.result,
    };
  default:
    return state;
  }
};

export default foodReducer;
