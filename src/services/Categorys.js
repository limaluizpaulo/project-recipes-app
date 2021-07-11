export const FOOD_CATEGORY = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
export const DRINK_CATEGORY = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
export const CATEGORY_FILTER_FOOD = 'https://www.themealdb.com/api/json/v1/1/filter.php?c=';
export const CATEGORY_FILTER_DRINK = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';

export function fetchByCategory(endpoint, category, type) {
  return fetch(`${endpoint}${category}`)
    .then((res) => res.json())
    .then((res) => res[type]);
}

export default function fetchCategory(endpoint, type) {
  return fetch(endpoint)
    .then((res) => res.json())
    .then((res) => res[type]);
}
