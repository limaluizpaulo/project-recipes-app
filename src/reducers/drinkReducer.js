import { REQUEST_INGREDIENT_DRINK } from '../actions';

const INITIAL_STATE = {
  recipes: [],
  // drinks: [],
};

const drinkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENT_DRINK:
    return {
      ...state,
      recipes: action.payload.result.drinks,
    };
  // case REQUEST_DRINK:
  //   return {
  //     ...state,
  //     drinks: action.payload.result.drinks,
  //   };
  default:
    return state;
  }
};

export default drinkReducer;
