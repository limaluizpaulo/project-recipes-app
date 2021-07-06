import {
  RECIPE_DETAILS_FOOD,
  RECIPE_DETAILS_DRINK,
  FAV_ICON,
} from '../action';

import whiteHeartIcon from '../images/whiteHeartIcon.svg';

const INITIAL_STATE = {
  details: [],
  foodDatails: {},
  drinkDatails: {},
  favIcon: false,
  favIconColor: whiteHeartIcon,
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
  case FAV_ICON:
    return {
      ...state,
      favIconColor: action.favIcon,
    };
  default:
    return state;
  }
};

export default recipeDetails;
