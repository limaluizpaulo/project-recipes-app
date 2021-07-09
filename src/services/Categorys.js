export const FOOD_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINK_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export default function fetchCategory(endpoint) {
  return fetch(endpoint)
    .then((res) => res.json())
    .then((data) => data);
}
