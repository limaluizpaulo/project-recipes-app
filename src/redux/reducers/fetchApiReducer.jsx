import { FETCH_API, FOOD_INGREDIENT, DRINK_INGREDIENT } from '../actions/actionTypes';

const INITIAL_STATE = {
  resultAPI: {
    drinks: [],
    meals: [],
    foodIngredient: null,
    drinkIngredient: null,
  },
};

function fetchApiReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case FETCH_API:
    return {
      ...state,
      resultAPI: {
        ...state.resultAPI,
        ...action.payload,
      },
    };
  case FOOD_INGREDIENT:
    return {
      ...state,
      resultAPI: {
        ...state.resultAPI,
        foodIngredient: action.payload,
      },
    };
  case DRINK_INGREDIENT:
    return {
      ...state,
      resultAPI: {
        ...state.resultAPI,
        drinkIngredient: action.payload,
      },
    };
  default:
    return state;
  }
}

export default fetchApiReducer;
