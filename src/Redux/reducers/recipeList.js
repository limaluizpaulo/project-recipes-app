import { ID_RECIPE_START, SHOW_RECIPE_CATEGORY, SHOW_RECIPE_LIST } from '../actions';

const INITIAL_STATE = {
  list: {},
  filterList: {},
  arrayStart: [],
};

const recipeList = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SHOW_RECIPE_LIST:
    return {
      ...state,
      list: action.payload.list,
    };
  case SHOW_RECIPE_CATEGORY:
    return {
      ...state,
      filterList: action.payload.filterList,
    };
  case ID_RECIPE_START:
    return {
      ...state,
      arrayStart: [...state.arrayStart, action.payload.idRecipeStart],
    };
  default:
    return state;
  }
};

export default recipeList;
