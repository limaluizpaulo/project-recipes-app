import { combineReducers } from 'redux';

import recipes from './recipes';
import randomRecipe from './randomRecipe';

const rootReducer = combineReducers({
  recipes,
  randomRecipe,
});

export default rootReducer;
