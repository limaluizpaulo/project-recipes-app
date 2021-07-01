import { REQUEST_INGREDIENT_FOOD, REQUEST_FOOD_BY_ID } from '../actions';

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
  case REQUEST_FOOD_BY_ID:
    return {
      ...state,
      foodById: action.payload.response.meals,
    };
  default:
    return state;
  }
};

export default foodReducer;
