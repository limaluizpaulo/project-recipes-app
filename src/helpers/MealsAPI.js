import getAPI from './api';

const MEALS_API = {
  meals: 'https://www.themealdb.com/api/json/v1/1/',
  drinks: 'https://www.thecocktaildb.com/api/json/v1/1/',
};
// https://www.themealdb.com/api/json/v1/1/search.php?f={primeira-letra}

export const getMealsRecipes = (type = 'meals') => getAPI(
  MEALS_API[type], 'search.php?s=', type,
);
export const getMealsCategories = (type = 'meals') => getAPI(
  MEALS_API[type], 'list.php?c=list', type,
);
export const getMealsAreas = (type = 'meals') => getAPI(
  MEALS_API[type], 'list.php?a=list', type,
);
export const getMealsIngredients = (type = 'meals') => getAPI(
  MEALS_API[type], 'list.php?i=list', type,
);
export const getMealsIngredientsFilter = (filter, type = 'meals') => getAPI(
  MEALS_API[type],
  'filter.php?i=', type, filter,
);
export const getMealsNameFilter = (filter, type = 'meals') => getAPI(MEALS_API[type],
  'search.php?s=', type, filter);
export const getMealsFirstLetterFilter = (filter, type = 'meals') => getAPI(
  MEALS_API[type],
  'search.php?f=', type, filter,
);
export const getMealsByCategory = (category, type = 'meals') => getAPI(MEALS_API[type],
  'filter.php?c=', type, category);

export const getMealsByArea = (area, type = 'meals') => getAPI(MEALS_API[type],
  'filter.php?a=', type, area);

export const getMealById = (id, type = 'meals') => getAPI(MEALS_API[type],
  'lookup.php?i=',
  type, id);

export const getMealRandom = (type = 'meals') => getAPI(
  MEALS_API[type], 'random.php', type,
);

export const getRecipesByIng = (ingredient, type = 'meals') => getAPI(MEALS_API[type],
  'filter.php?i=', type, ingredient);

export const getRandomRecipe = (type = 'meals') => getAPI(MEALS_API[type],
  'random.php', type);
