export const FOOD_BY_NAME = 'www.themealdb.com/api/json/v1/1/search.php?s=';
export const FOOD_BY_ID = 'www.themealdb.com/api/json/v1/1/lookup.php?i=';
export const FOOD_BY_LETTER = 'www.themealdb.com/api/json/v1/1/search.php?f=';
export const FOOD_BY_INGREDIENT = 'www.themealdb.com/api/json/v1/1/filter.php?i=';
export const FOOD_BY_RANDOM = 'www.themealdb.com/api/json/v1/1/random.php';
export const FOOD_BY_AREA = 'www.themealdb.com/api/json/v1/1/filter.php?a=';

function fetchFood(endpoint, query) {
  return fetch(`${endpoint}${query}`)
    .then((res) => res.json())
    .then((res) => res.meals);
}

export default fetchFood;
