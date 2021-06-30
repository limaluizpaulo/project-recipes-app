const BASE_URL_SEARCH_MEAL = 'https://www.themealdb.com/api/json/v1/1/';
const BASE_URL_SEARCH_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/';

export async function searchByIngredientsApi(inputValue, pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_MEAL}filter.php?i=${inputValue}`);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_DRINKS}filter.php?i=${inputValue}`);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}

export async function searchByNameApi(inputValue, pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_MEAL}search.php?s=${inputValue}`);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_DRINKS}search.php?s=${inputValue}`);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}

export async function searchByFirstLetterApi(inputValue, pathname) {
  let fetchSearch;
  if (pathname === '/comidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_MEAL}search.php?f=${inputValue}`);
    const response = await fetchSearch.json();
    return response.meals;
  }
  if (pathname === '/bebidas') {
    fetchSearch = await fetch(`${BASE_URL_SEARCH_DRINKS}search.php?f=${inputValue}`);
    const response = await fetchSearch.json();
    return response.drinks;
  }
}
