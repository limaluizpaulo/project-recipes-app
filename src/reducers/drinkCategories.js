import { ALL_DRINK_CATEGORIES, IS_LOADING } from '../action';

const INITIAL_STATE = {
  allDrinkCategories: [],
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
  default:
    return state;
  }
};

export default drinkCategories;
