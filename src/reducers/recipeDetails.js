import {
  RECIPE_DETAILS_FOOD,
  RECIPE_DETAILS_DRINK,
  START_RECIPE,
  CHECK_PAGE,
} from '../action';

const INITIAL_STATE = {
  details: {},
  isStart: false,
  isDrink: false,
};

const recipeDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPE_DETAILS_FOOD:
    return {
      ...state,
      details: action.mealsDetails,
    };
  case RECIPE_DETAILS_DRINK:
    return {
      ...state,
      details: action.drinksDetails,
    };
  case START_RECIPE:
    return {
      ...state,
      isStart: action.isStart,
    };
  case CHECK_PAGE:
    return {
      ...state,
      isDrink: action.isDrink,
    };
  default:
    return state;
  }
};

export default recipeDetails;
