import { combineReducers } from 'redux';
import user from './user';
import foods from './foods';
import drinks from './drinks';
import ingredients from './ingredients';
import mealsArea from './mealsArea';

const rootReducer = combineReducers({
  mealsArea, user, foods, drinks, ingredients,
});

export default rootReducer;
