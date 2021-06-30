export const DRINK_BY_NAME = 'www.themealdb.com/api/json/v1/1/search.php?s=';
export const DRINK_BY_ID = 'www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const DRINK_BY_LETTER = 'www.themealdb.com/api/json/v1/1/search.php?f=';

function fetchDrink(endpoint, query) {
  return fetch(`${endpoint}${query}`)
    .then((res) => res.json());
}

export default fetchDrink;
