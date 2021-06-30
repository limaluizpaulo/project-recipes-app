import { combineReducers } from 'redux';
import userLogin from './userLogin';
import foodCategories from './foodCategories';
import drinkCategories from './drinkCategories';

const rootReducers = combineReducers({
  userLogin,
  foodCategories,
  drinkCategories,
});

export default rootReducers;
