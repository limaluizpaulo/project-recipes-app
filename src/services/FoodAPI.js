export const FOOD_BY_NAME = 'www.themealdb.com/api/json/v1/1/search.php?s=';
export const FOOD_BY_ID = 'www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const FOOD_BY_LETTER = 'www.themealdb.com/api/json/v1/1/search.php?f=';

function fetchFood(endpoint, query) {
  return fetch(`${endpoint}${query}`)
    .then((res) => res.json());
}

export default fetchFood;
