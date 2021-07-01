import { REQUEST_INGREDIENT_DRINK } from '../actions';

const INITIAL_STATE = {
  recipes: [],
};

const drinkReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_INGREDIENT_DRINK:
    return {
      ...state,
      recipes: action.payload.result.drinks,
    };
  default:
    return state;
  }
};

export default drinkReducer;
