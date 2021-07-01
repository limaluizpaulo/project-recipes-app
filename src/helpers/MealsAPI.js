import getAPI from './api';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/';
// https://www.themealdb.com/api/json/v1/1/filter.php?i={ingrediente}

export const getMealsRecipes = () => getAPI(MEALS_API, 'search.php?s=', 'meals');
export const getMealsCategories = () => getAPI(MEALS_API, 'list.php?c=list', 'meals');
export const getMealsAreas = () => getAPI(MEALS_API, 'list.php?a=list', 'meals');
export const getMealsIngredients = () => getAPI(MEALS_API, 'list.php?i=list', 'meals');
export const getMealsIngredientsFilter = (filter) => getAPI(MEALS_API,
  'filter.php?i=', 'meals', filter);
