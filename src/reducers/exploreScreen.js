import { INGREDIENTS } from '../action/index';

const INITIAL_STATE = {
  recipe: [],
};
const exploreIngredient = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INGREDIENTS:
    return {
      ...state,
      recipe: action.ingrediente,
    };

  default:
    return state;
  }
};
export default exploreIngredient;
