import { ALL_FOOD_CATEGORIES, IS_LOADING } from '../action';

const INITIAL_STATE = {
  allFoodCategories: [],
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
  default:
    return state;
  }
};

export default foodCategories;
