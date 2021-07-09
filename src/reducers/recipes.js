import { RENDER_FILTERED, UPDATE_RECIPES } from '../actions';

const INITIAL_STATE = {
  inProgressRecipes: [],
  recipesDefault: [],
  filteredRecipes: [],
  showFiltered: true,
};

function recipes(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
  case UPDATE_RECIPES:
    return { ...state, filteredRecipes: payload, showFiltered: true };
  case RENDER_FILTERED:
    return { ...state, showFiltered: payload };
  default:
    return state;
  }
}

export default recipes;
