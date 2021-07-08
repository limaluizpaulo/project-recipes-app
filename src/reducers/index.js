import { combineReducers } from 'redux';
import userLogin from './userLogin';
import foodCategories from './foodCategories';
import drinkCategories from './drinkCategories';
import isSearchBar from './isSearchBar';
import exploreIngredient from './exploreScreen';
import recipeDetails from './recipeDetails';
import foodArea from './foodArea';

const rootReducers = combineReducers({
  userLogin,
  foodCategories,
  drinkCategories,
  isSearchBar,
  exploreIngredient,
  recipeDetails,
  foodArea,
});

export default rootReducers;
