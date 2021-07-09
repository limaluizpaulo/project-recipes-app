import { REQUEST_INGREDIENT_DRINK, REQUEST_DRINK_BY_ID } from '../actions';
import { REQUEST_DRINK_INGREDIENTS } from '../actions/ingredientsActions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  drinkById: [],
  ingredients: [],
};

const drinkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENT_DRINK:
    return {
      ...state,
      recipes: action.payload.result.drinks,
    };
  case REQUEST_DRINK_BY_ID:
    return {
      ...state,
      drinkById: action.payload.response.drinks,
    };
  case REQUEST_DRINK_INGREDIENTS:
    return {
      ...state,
      ingredients: action.payload.result.drinks,
    };
  default:
    return state;
  }
};

export default drinkReducer;
