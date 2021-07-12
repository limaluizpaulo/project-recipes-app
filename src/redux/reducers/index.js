import { combineReducers } from 'redux';

import recipes from './recipes';
import fetch from './fetch';
import randomRecipe from './randomRecipe';

const rootReducer = combineReducers({
  recipes,
  fetch,
  randomRecipe,
});

export default rootReducer;
