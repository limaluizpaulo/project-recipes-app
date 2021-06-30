import getAPI from './api';

const MEALS_API = 'https://www.themealdb.com/api/json/v1/1/list.php?';

export const getMealsCategories = () => getAPI(MEALS_API, 'c', 'meals');
export const getMealsAreas = () => getAPI(MEALS_API, 'a', 'meals');
export const getMealsIngredients = () => getAPI(MEALS_API, 'i', 'meals');
