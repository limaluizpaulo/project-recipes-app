import getAPI from './api';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/';

export const getMealsRecipes = () => getAPI(MEALS_API, 'search.php?s=', 'meals');
export const getMealsCategories = () => getAPI(MEALS_API, 'list.php?c=list', 'meals');
export const getMealsAreas = () => getAPI(MEALS_API, 'list.php?a=list', 'meals');
export const getMealsIngredients = () => getAPI(MEALS_API, 'list.php?i=list', 'meals');
