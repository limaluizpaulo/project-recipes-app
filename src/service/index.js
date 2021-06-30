export function fetchFoodByIngredient(query) {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}

export function fetchFoodByName(query) {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}

export function fetchFoodByFirstLetter(query) {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}

export function fetchDrinksByIngredient(query) {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}

export function fetchDrinksByName(query) {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}

export function fetchDrinksByFirstLetter(query) {
  const API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}
