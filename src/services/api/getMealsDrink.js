const BASE_URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const BASE_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

export async function apiRequestFoods() {
  const fetchFood = await fetch(BASE_URL_MEAL);

  try {
    const response = await fetchFood.json();
    return response;
  } catch (erro) {
    console.log(erro);
  }
}

export async function apiRequestDrinks() {
  const fetchDrink = await fetch(BASE_URL_DRINKS);

  try {
    const response = await fetchDrink.json();
    return response;
  } catch (erro) {
    console.log(erro);
  }
}
