import { combineReducers } from 'redux';
import userLogin from './userLogin';
import foodCategories from './foodCategories';
import drinkCategories from './drinkCategories';
import isSearchBar from './isSearchBar';
import exploreScreen from './exploreScreen';
import recipeDetails from './recipeDetails';

const rootReducers = combineReducers({
  userLogin,
  foodCategories,
  drinkCategories,
  isSearchBar,
  exploreScreen,
  recipeDetails,
});

export default rootReducers;
