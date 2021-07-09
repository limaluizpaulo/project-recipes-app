import { combineReducers } from 'redux';

import recipes from './recipes';
import testReducer from './testReducer';
import fetch from './fetch';

const rootReducer = combineReducers({
  recipes,
  testReducer,
  fetch,
});

export default rootReducer;
