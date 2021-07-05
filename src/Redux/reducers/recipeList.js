import { SHOW_RECIPE_LIST } from '../actions';

const INITIAL_STATE = {
  status: false,
  list: [],
};

const recipeList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SHOW_RECIPE_LIST:
    return {
      ...state,
      status: action.payload.status,
      list: action.payload.list,
    };
  default:
    return state;
  }
};

export default recipeList;
