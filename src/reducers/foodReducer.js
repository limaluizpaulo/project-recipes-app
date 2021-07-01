import { REQUEST_INGREDIENT_FOOD } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  // food: [],
};

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENT_FOOD:
    return {
      ...state,
      recipes: action.payload.result.meals,
    };
  // case REQUEST_FOOD:
  //   return {
  //     ...state,
  //     recipes: action.payload.result.meals,
  //   };
  default:
    return state;
  }
};

export default foodReducer;
