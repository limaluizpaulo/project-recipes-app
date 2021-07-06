export const DRINK_BY_NAME = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
export const DRINK_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const DRINK_BY_LETTER = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
export const DRINK_BY_INGREDIENT = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

function fetchDrink(endpoint, query) {
  return fetch(`${endpoint}${query}`)
    .then((res) => res.json())
    .then((res) => res.drinks);
}

export default fetchDrink;
