export function fetchByIngredient(query) {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}

export function fetchByName(query) {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}

export function fetchByFirstLetter(query) {
  const API_URL = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
  return fetch(`${API_URL}${query}`)
    .then((res) => res.json());
}
