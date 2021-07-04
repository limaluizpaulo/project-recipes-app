export const FOOD_BY_NAME = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
export const FOOD_BY_ID = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const FOOD_BY_LETTER = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
export const FOOD_BY_INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
export const FOOD_BY_RANDOM = 'https://www.themealdb.com/api/json/v1/1/random.php';
export const FOOD_BY_AREA = 'https://www.themealdb.com/api/json/v1/1/filter.php?a=';

function fetchFood(endpoint, query) {
  return fetch(`${endpoint}${query}`)
    .then((res) => res.json())
    .then((res) => res.meals);
}

export default fetchFood;