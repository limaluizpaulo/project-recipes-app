import { REQUEST_INGREDIENT_FOOD, REQUEST_FOOD_BY_ID } from '../actions';
import { REQUEST_FOOD_INGREDIENTS } from '../actions/ingredientsActions';

const INITIAL_STATE = {
  recipes: [],
  categories: [],
  // food: [],
  foodById: [],
  ingredients: [],
};

// const magic = 5;

const foodReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENT_FOOD:
    return {
      ...state,
      recipes: action.payload.result.meals,
    };
  // case REQUEST_CATEGORIE_FOOD:
  //   return {
  //     ...state,
  //     categories: action.payload.result.meals
  //       .filter(({ strCategory }, index) => index < magic
  //     && ({ active: false, strCategory })),
  //   };
  // case REQUEST_FOOD:
  //   return {
  //     ...state,
  //     recipes: action.payload.result.meals,
  //   };
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
  default:
    return state;
  }
};

export default foodReducer;
