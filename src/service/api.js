const BASE_URL_SEARCH = 'https://www.themealdb.com/api/json/v1/1/filter.php?';

export async function searchByIngredientsApi(inputValue) {
  const fetchMeal = await fetch(`${BASE_URL_SEARCH}i=${inputValue}`);
  const response = await fetchMeal.json();
  return response;
}

export async function searchByNameApi(inputValue) {
  const fetchMeal = await fetch(`${BASE_URL_SEARCH}s=${inputValue}`);
  const response = await fetchMeal.json();
  return response;
}

export async function searchByFirstLetterApi(inputValue) {
  const fetchMeal = await fetch(`${BASE_URL_SEARCH}f=${inputValue}`);
  const response = await fetchMeal.json();
  return response;
}
