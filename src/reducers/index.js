import { combineReducers } from 'redux';
import userLogin from './userLogin';
import foodCategories from './foodCategories';
import drinkCategories from './drinkCategories';
import isSearchBar from './isSearchBar';
import exploreScreen from './exploreScreen';

const rootReducers = combineReducers({
  userLogin,
  foodCategories,
  drinkCategories,
  isSearchBar,
  exploreScreen,
});

export default rootReducers;
