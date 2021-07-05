import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';
import random from './random';

const rootReducer = combineReducers({
  user, foods, drinks, random,
});

export default rootReducer;
