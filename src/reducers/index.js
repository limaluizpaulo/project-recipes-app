import { combineReducers } from 'redux';
import userLogin from './userLogin';
import foodCategories from './foodCategories';
import drinkCategories from './drinkCategories';
import isSearchBar from './isSearchBar';
import exploreIngredient from './exploreScreen';
// import exploreScreen from './exploreScreen';
import recipeDetails from './recipeDetails';

const rootReducers = combineReducers({
  userLogin,
  foodCategories,
  drinkCategories,
  isSearchBar,
  exploreIngredient,
  // exploreScreen,
  recipeDetails,
});

export default rootReducers;
