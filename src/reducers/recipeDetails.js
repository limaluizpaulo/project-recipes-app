import {
  RECIPE_DETAILS_FOOD,
  RECIPE_DETAILS_DRINK,
} from '../action';

const INITIAL_STATE = {
  details: [],
  foodDatails: {},
  drinkDatails: {},
};

const recipeDetails = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RECIPE_DETAILS_FOOD:
    return {
      ...state,
      foodDatails: action.mealsDetails,
    };
  case RECIPE_DETAILS_DRINK:
    return {
      ...state,
      drinkDatails: action.drinksDetails,
    };
  default:
    return state;
  }
};

export default recipeDetails;
