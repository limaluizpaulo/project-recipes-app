export const MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const CATEG_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const CATEG_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export const fetchAPI = async (url) => {
  const response = await fetch(url);
  return response.json();
};
