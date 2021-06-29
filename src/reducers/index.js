import { combineReducers } from 'redux';
import drinks from './drink';
import recipes from './recipes';
import user from './user';

const rootReducer = combineReducers({
  drinks,
  recipes,
  user,
});

export default rootReducer;
