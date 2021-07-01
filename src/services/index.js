export const MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const INGREDIENT_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
export const NAME_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const FIRSTLETTER_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

export const fetchAPI = async (url) => {
  const response = await fetch(url);
  return response.json();
};
