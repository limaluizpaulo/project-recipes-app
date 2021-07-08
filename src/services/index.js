export async function fetchCategories(type) {
  try {
    const API_URL = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?c=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    const data = await fetch(API_URL);
    const result = await data.json();
    // console.log(result);
    return result[type];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchIngredients(type) {
  try {
    const API_URL = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/list.php?i=list'
      : 'https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list';
    const data = await fetch(API_URL);
    const result = await data.json();
    // console.log(result);
    return result[type];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchByIngredient(type, query) {
  try {
    let API_URL = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/filter.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';

    if (!query && type === 'drinks') {
      API_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    }

    const data = await fetch(`${API_URL}${query}`);
    const result = await data.json();
    // console.log(result);
    return result[type];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchByName(type, query = '') {
  try {
    const API_URL = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?s='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const data = await fetch(`${API_URL}${query}`);
    const result = await data.json();
    // console.log(result);
    return result[type];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchByFirstLetter(type, query) {
  try {
    const API_URL = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/search.php?f='
      : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';
    const data = await fetch(`${API_URL}${query}`);
    const result = await data.json();
    // console.log(result);
    return result[type];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchByCategory(type, category) {
  try {
    const API_URL = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/filter.php?c='
      : 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=';
    const data = await fetch(`${API_URL}${category}`);
    const result = await data.json();
    // console.log(result);
    return result[type];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchDetails(type, id) {
  try {
    const API_URL = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/lookup.php?i='
      : 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    const data = await fetch(`${API_URL}${id}`);
    const result = await data.json();
    // console.log(result);
    return result[type][0];
  } catch (error) {
    console.log(error);
  }
}

export async function fetchRandom(type) {
  try {
    const API_URL = type === 'meals'
      ? 'https://www.themealdb.com/api/json/v1/1/random.php'
      : 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const data = await fetch(API_URL);
    const result = await data.json();
    // console.log(result);
    return result[type][0];
  } catch (error) {
    console.log(error);
  }
}
