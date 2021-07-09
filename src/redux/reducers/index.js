import { combineReducers } from 'redux';

import recipes from './recipes';
import testReducer from './testReducer';
import fetch from './fetch';
import randomRecipe from './randomRecipe';

const rootReducer = combineReducers({
  recipes,
  testReducer,
  fetch,
  randomRecipe,
});

export default rootReducer;
