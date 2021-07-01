export async function fetchByIngredient(type, query) {
  let API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
    : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

  if (query === '' && type === 'drinks') {
    API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  }

  const data = await fetch(`${API_URL}${query}`);
  const result = await data.json();
  return result[type];
}

export async function fetchByName(type, query = '') {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
  const data = await fetch(`${API_URL}${query}`);
  const result = await data.json();
  console.log(result);
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

export async function fetchCategories(type) {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
    : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
  const data = await fetch(API_URL);
  const result = await data.json();
  return result[type];
}

export async function fetchByCategory(type, category) {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
    : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
  const data = await fetch(`${API_URL}${category}`);
  const result = await data.json();
  console.log(result);
  return result[type];
}
