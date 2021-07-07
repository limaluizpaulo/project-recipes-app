import { SHOW_RECIPE_CATEGORY, SHOW_RECIPE_LIST } from '../actions';

const INITIAL_STATE = {
  status: false,
  list: {},
  filterList: {},
};

const recipeList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SHOW_RECIPE_LIST:
    return {
      ...state,
      status: action.payload.status,
      list: action.payload.list,
    };
  case SHOW_RECIPE_CATEGORY:
    return {
      ...state,
      filterList: action.payload.filterList,
    };
  default:
    return state;
  }
};

export default recipeList;
