import { REQUEST_INGREDIENT_FOOD, REQUEST_FOOD_BY_ID } from '../actions';
import { REQUEST_FOOD_INGREDIENTS,
  REQUEST_FOOD_AREA } from '../actions/ingredientsActions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  area: [],
  foodById: [],
  ingredients: [],
};

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENT_FOOD:
    return {
      ...state,
      recipes: action.payload.result.meals,
    };
  case REQUEST_FOOD_BY_ID:
    return {
      ...state,
      foodById: action.payload.response.meals,
    };
  case REQUEST_FOOD_INGREDIENTS:
    return {
      ...state,
      ingredients: action.payload.result.meals,
    };
  case REQUEST_FOOD_AREA:
    return {
      ...state,
      area: action.payload.meals,
    };
  default:
    return state;
  }
};

export default foodReducer;
