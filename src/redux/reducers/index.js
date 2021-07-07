import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';
import ingredients from './ingredients';

const rootReducer = combineReducers({
  user, foods, drinks, ingredients,
});

export default rootReducer;
