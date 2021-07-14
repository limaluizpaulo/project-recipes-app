const BASE_URL_MEAL = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const BASE_URL_DRINKS = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';

export async function apiCategoriesFoods() {
  const fetchFood = await fetch(BASE_URL_MEAL);
  try {
    const response = await fetchFood.json();
    return response;
  } catch (erro) {
    console.log(erro);
  }
}

export async function apiCategoriesDrinks() {
  const fetchDrink = await fetch(BASE_URL_DRINKS);

  try {
    const response = await fetchDrink.json();
    return response;
  } catch (erro) {
    console.log(erro);
  }
}
