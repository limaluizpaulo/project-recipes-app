export const MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const CATEG_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const CATEG_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const FETCH_CATEG_M = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
export const FETCH_CATEG_D = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
export const FETCH_ID_M = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const FETCH_ID_D = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const fetchAPI = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
