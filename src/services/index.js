export const MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const CATEG_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const CATEG_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const FETCH_CATEG_M = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
export const FETCH_CATEG_D = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
export const FETCH_ID_M = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const FETCH_ID_D = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
export const INGREDIENT_MEALS = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
export const NAME_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const FIRSTLETTER_MEALS = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
export const INGREDIENT_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
export const NAME_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const FIRSTLETTER_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
export const SUPRISE_ME_MEALS = 'https://www.themealdb.com/api/json/v1/1/random.php';
export const SUPRISE_ME_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
export const AREA_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
export const AREA_SELECTED = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';
export const EXPLORER_ING_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
export const IMG_INGR_DRINKS = 'https://www.thecocktaildb.com/images/ingredients/';
export const EXPLORER_ING_MEALS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export const fetchAPI = async (url) => {
  try {
    const response = await fetch(url);
    return response.json();
  } catch (error) {
    console.log(error);
  }
};
