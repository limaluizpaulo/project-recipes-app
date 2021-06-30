import { ALL_FOOD_CATEGORIES, IS_LOADING, ALL_FOOD_RECIPES } from '../action';

const INITIAL_STATE = {
  allFoodCategories: [],
  meals: [],
};

const foodCategories = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case IS_LOADING:
    return {
      ...state,
    };
  case ALL_FOOD_CATEGORIES:
    return {
      ...state,
      allFoodCategories: action.allFoodCategories,
    };
  case ALL_FOOD_RECIPES:
    return {
      ...state,
      meals: action.recipes,
    };
  default:
    return state;
  }
};

export default foodCategories;
