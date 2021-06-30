export async function fetchByIngredient(type, query) {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
    : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
  const data = await fetch(`${API_URL}${query}`);
  const result = await data.json();
  return result[type];
}

export async function fetchByName(type, query) {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const data = await fetch(`${API_URL}${query}`);
  const result = await data.json();
  return result[type];
}

export async function fetchByFirstLetter(type, query) {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?f='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
  const data = await fetch(`${API_URL}${query}`);
  const result = await data.json();
  return result[type];
}
