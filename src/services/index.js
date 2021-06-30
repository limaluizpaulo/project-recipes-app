const API_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export async function fetchByIngredient(type, query) {
  let API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
    : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

  if (query === '' && type === 'drinks') {
    API_URL = API_DRINKS;
  }

  const data = await fetch(`${API_URL}${query}`);
  console.log(data);
  const result = await data.json();
  console.log(result);
  return result[type];
}

export async function fetchByName(type, query) {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : API_DRINKS;
  const data = await fetch(`${API_URL}${query}`);
  console.log(data);
  const result = await data.json();
  console.log(result);
  return result[type];
}

export async function fetchByFirstLetter(type, query) {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?f='
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
  const data = await fetch(`${API_URL}${query}`);
  console.log(data);
  const result = await data.json();
  console.log(result);
  return result[type];
}
export async function fetchInit(type) {
  const API_URL = type === 'meals'
    ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
    : API_DRINKS;
  const data = await fetch(API_URL);
  const result = await data.json();
  return result[type];
}
