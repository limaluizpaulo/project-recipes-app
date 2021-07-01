import { ALL_DRINK_CATEGORIES, IS_LOADING, ALL_DRINKS_RECIPES } from '../action';

const INITIAL_STATE = {
  allDrinkCategories: [],
  drinks: [],
};

const drinkCategories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING:
    return {
      ...state,
    };
  case ALL_DRINK_CATEGORIES:
    return {
      ...state,
      allDrinkCategories: action.allDrinkCategories,
    };
  case ALL_DRINKS_RECIPES:
    return {
      ...state,
      drinks: action.recipes,
    };
  default:
    return state;
  }
};

export default drinkCategories;
