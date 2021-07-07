import { combineReducers } from 'redux';

import recipes from './recipes';
import testReducer from './testReducer';

const rootReducer = combineReducers({
  recipes,
  testReducer,
});

export default rootReducer;
