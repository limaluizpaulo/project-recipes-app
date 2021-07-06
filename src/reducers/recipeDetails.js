import {
  RECIPE_DETAILS_FOOD,
  RECIPE_DETAILS_DRINK,
} from '../action';

const INITIAL_STATE = {
  details: [],
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
  default:
    return state;
  }
};

export default recipeDetails;
