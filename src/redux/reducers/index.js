import { combineReducers } from 'redux';

import recipes from './recipes';
import fetch from './fetch';
import randomRecipe from './randomRecipe';
import progressRecipe from './progressRecipe';

const rootReducer = combineReducers({
  recipes,
  fetch,
  randomRecipe,
  progressRecipe,
});

export default rootReducer;
