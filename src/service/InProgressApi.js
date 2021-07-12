const BASE_URL_DETAIL_MEAL = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const BASE_URL_DETAIL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export async function detailProgressDrinks(id) {
  const fetchSearch = await fetch(`${BASE_URL_DETAIL_DRINKS}${id}`);
  const response = await fetchSearch.json();
  return response.drinks;
}

export async function detailProgressMeal(id) {
  const fetchSearch = await fetch(`${BASE_URL_DETAIL_MEAL}${id}`);
  const response = await fetchSearch.json();
  return response.meals;
}
