import { combineReducers } from 'redux';
import userLogin from './userLogin';
import foodCategories from './foodCategories';
import drinkCategories from './drinkCategories';
import isSearchBar from './isSearchBar';

const rootReducers = combineReducers({
  userLogin,
  foodCategories,
  drinkCategories,
  isSearchBar,
});

export default rootReducers;
