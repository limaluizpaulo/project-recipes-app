import { RAMDOM_RECIPE } from '../action';

const INITIAL_STATE = {
  recipe: [],
};
const exploreScreen = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case RAMDOM_RECIPE:
    return {
      ...state,
      recipe: action.RandomRecipe,
    };
  default:
    return state;
  }
};
export default exploreScreen;
