import getAPI from './api';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/';
// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}

export const getMealsRecipes = () => getAPI(MEALS_API, 'search.php?s=', 'meals');
export const getMealsCategories = () => getAPI(MEALS_API, 'list.php?c=list', 'meals');
export const getMealsAreas = () => getAPI(MEALS_API, 'list.php?a=list', 'meals');
export const getMealsIngredients = () => getAPI(MEALS_API, 'list.php?i=list', 'meals');
export const getMealsIngredientsFilter = (filter) => getAPI(MEALS_API,
  'filter.php?i=', 'meals', filter);
export const getMealsNameFilter = (filter) => getAPI(MEALS_API,
  'search.php?s=', 'meals', filter);
export const getMealsFirstLetterFilter = (filter) => getAPI(MEALS_API,
  'search.php?f=', 'meals', filter);
export const getMealsByCategory = (category) => getAPI(MEALS_API,
  'filter.php?c=', 'meals', category);
